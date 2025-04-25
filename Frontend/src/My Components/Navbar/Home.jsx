import React from 'react'
import './Home.css'
import './Navbar'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user")
  return (
    <div>
    <div className='hhead'><h1>Welcome To Ease And Quick</h1></div>
    <b>
     <p className='hpara'>Simplifying Your Everyday Needs, Quickly</p>
     <p className='hpara1'>And Effortlessly</p>
     <p className='hpara2'>Mumbai | Navi Mumbai | Thane | Pune</p>
     <div className="image-wrapper">
     <img src='../public/centerimg.png' className='bgimg'/>
        {!storedUser &&(
          <div className="auth-buttons">
            <button className="auth-btn" onClick={() => navigate('/login')}>Login</button>
            <button className="auth-btn" onClick={() => navigate('/signup')}>Sign Up</button>
          </div>)}
        </div>
     <p className='aboutus'><b>About Us</b></p>
     <p className='hpara3'>Welcome to Ease & Quick, your trusted partner in facilities 
     management services.  We are dedicated to simplifying everyday challenges with our<br/> 
     comprehensive range of services, catering to individuals, housing societies, hospitals, institutions, 
     malls and commercial complexes. From cleaning and <br/>pest control to plumbing, electrical repairs, and minor 
     civil work, our skilled professionals ensure efficient and reliable solutions tailored to your needs.<br/> 
     At Ease and Quick, we prioritize customer satisfaction, transparency and prompt service delivery. Our
     mission is to make your life easier by handling <br/>essential maintenance tasks, allowing you to focus on what 
     truly matters. Choose Ease and Quick for effortless and reliable facility management.</p>
     <p className='whyus'>Why Choose Us?</p>
     <img src='../booking.png' className='booking'/>
     <img src='../platform.png' className='platform'/> 
     <img src='../facil.png' className='facil'/> 
     <img src='../prof.png' className='prof'/> 
     <p className='halt'>Streamlined and secured booking services<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;With ₹50 booking charges</p>
     <p className='halt1'>Simplify your experience with our<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;user-friendly platform</p>
     <p className='halt2'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
       Wide range of services<br/>From plumbing to pest control, we offer end-<br/>to-end facility management for your all needs.
     </p>
     <p className='halt3'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Trusted Professionals<br/>
       Our team of skilled service providers<br/>&nbsp;&nbsp;&nbsp;&nbsp; ensure high-quality and reliable<br/>&nbsp;&nbsp;
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; solutions every time
     </p>
     <img src='../sols.png' className='sols'/>
     <img src='../ecof.png' className='ecof'/>
     <p className='halt4'>&nbsp;&nbsp;&nbsp;&nbsp;Tailored Solutions for Everyone<br/>
       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Whether you're an individual,<br/> institution, or commercial complex,<br/>
       we have the perfect solution for you.
     </p>
     <p className='halt5'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Eco-Friendly Practices<br/>
     Committed to sustainable solutions,<br/> &nbsp;&nbsp;&nbsp;&nbsp;we adopt environment-friendly<br/> 
     &nbsp;&nbsp;&nbsp;&nbsp;approaches wherever possible.</p>

     <p className='whoser'>Who We Serve?</p>
     <img src='../cust.png' className='cust'/>
     <img src='../complexes.png' className='complex'/>
     <img src='../housing.png' className='housing'/>
     <img src='../hospital.png' className='hospital'/>
     <p className='halt6'>Individual Customers</p>
     <p className='halt7'>Commercial Complexes</p>
     <p className='halt8'>Housing Societies</p>
     <p className='halt9'>Hospitals</p>
     <img src='../inst.png' className='inst'/>
     <img src='../malls.png' className='mall'/>
     <p className='halt10'>Institutes</p>
     <p className='halt11'>Malls</p>
    </b>
 </div>
  )
}

export default Home
