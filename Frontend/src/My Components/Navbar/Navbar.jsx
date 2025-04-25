import React , {useEffect, useState, useRef} from 'react'
import './Navbar.css' 
import { useLocation, useNavigate } from 'react-router-dom'
import AxiosInstance from '../../api/axiosInstance'
import { toast } from 'react-toastify'
import axios from 'axios'



const Navbar = () => { 
  const [userName, setUserName]=useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location=useLocation()
  const storedUser = localStorage.getItem("user")
  const user = JSON.parse(storedUser)
  const jwt=localStorage.getItem('token')
  const navigate = useNavigate()
  const dropdownRef = useRef(null)
  const [services, setServices]=useState([])
  const [query, setQuery] = useState("")
  const [filteredServices, setFilteredServices]=useState([])
  
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/auth/services/")
    .then(response => {
      
      setServices(response.data);
  })
        .catch((error) => console.error("Error fetching services:", error));
}, []);

useEffect(() => {
  if (query.trim() === "") {
      setFilteredServices(services) 
  } else {
      setFilteredServices(
          services.filter(service =>
              service.name.toLowerCase().includes(query.toLowerCase()) 
          )
      );
  }
}, [query,services]);

  useEffect(() => {
    const publicRoutes = [ "/home", "/login", "/signup", "/otp/verify", "/services", "/contactus"]
  
    if (storedUser) {
      
      setUserName(user.name) 
    }
    if (jwt === null && !publicRoutes.includes(location.pathname)) {
      toast.warn("Please login to continue");
      navigate('/login')
    }

  }, [jwt, user, navigate,location.pathname])

  const authPages = ["/login", "/signup", "/otp/verify"]
  const isAuthPage = authPages.some(page => location.pathname.startsWith(page))

  const handleLogout = async ()=>{

  try {

    const refreshToken = localStorage.getItem("refresh_token") 
    ? JSON.parse(localStorage.getItem("refresh_token")) 
    : null;

    let token=localStorage.getItem("token")
if (token.startsWith('"') && token.endsWith('"')) {
   token = token.slice(1, -1);  
}   

    console.log(refreshToken)

    if (!refreshToken) {
    throw new Error("No refresh token available");
    }

      const res = await AxiosInstance.post("/auth/logout/", { refresh_token:refreshToken } )

      if (res.status === 200){
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          navigate("/login");
          toast.warn("Logout successful");
      }
  } catch (error) {
      toast.error("Logout failed. Please try again.");
      
      
  }
}

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return ( 
    <nav className='container'>
        <img className="logo" src="/logo1.png" alt="" width={10} height={30}/>
        <div className='search-container'>
          <input type='text' placeholder='Search services...' value={query} onChange={(e) => setQuery(e.target.value)}/>
          {query && (
                <ul className="search-results">
                    {filteredServices.length > 0 ? (
                        filteredServices.map(service => (
                          <li key={service.id} onClick={() => navigate(`/service-details/${service.name.toLowerCase()}/${service.id}`)}>
                          {service.name}</li>
                        ))
                    ) : (
                        <li>No services found</li>
                    )}
                </ul>
            )}
          <img className="sicon" src="/search-icon.png" width={20} height={20}/>
        </div>
        <ul>
          <img className="hicon" src="/home1.png"/> 
          <li><button className='btn'onClick={() => navigate('/home')}> Home</button> </li>
          <img className="seicon" src="/ser.png"/>
          <li><a href='/services'><button className='btn'>Services</button></a>  </li>
          <img className="cicon" src="/call.png"/>
          <li><a href='/contactus'><button className='btn'>Contact us</button></a> </li>
          {!isAuthPage && user && (
          <li ref={dropdownRef} className="profile-dropdown">

            <button className='btn' onClick={() => setDropdownOpen(!dropdownOpen)}>
              {userName || "Profile"}</button> 
              {dropdownOpen && (
              <div className="dropdown-menu">
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
                <button className='dropdown-item' onClick={() => navigate('/mybookings')}>My Bookings</button>
              </div>
            )}
              </li>  
          )}  
          {isAuthPage &&(
             <li>< button className='btn'>Profile</button></li>)}
          {!isAuthPage && !user &&(
             <li> <button className='btn'>Profile</button></li>)}           
          </ul>
        {!isAuthPage && <img className="picon" src="/profile-icon.png"/>}
        {isAuthPage && <img className="picon" src="/profile-icon.png"/>}
    </nav>
  )
}

export default Navbar
