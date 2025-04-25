import React, {useState} from 'react'
import './Login.css'
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify'
import axios from "axios"

const Login = () => {
  const navigate=useNavigate()
  const [loginData, setLoginData]=useState({
    email:"",
    password:""
  } )

   const [error, setError] = useState("")

  const handleOnchange=(e) => {
    setLoginData({...loginData,[e.target.name]:e.target.value})
  }

  const { email, password } = loginData

  

  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await axios.post('http://localhost:8000/api/v1/auth/login/', loginData)
      const response= res.data
      const user={
        'id':response.id,
        'name':response.name,
        'email':response.email,
      }
      if (res.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.access_token))
        localStorage.setItem('refresh_token', JSON.stringify(response.refresh_token))
        localStorage.setItem('user', JSON.stringify(user))

        await navigate("/home")
        toast.success('login successful')
      }
    } catch (error) {
      if(error.response && error.response.data){
      const errorData=error.response.data;
      let errorMessage =''
      if(errorData.email){
        errorMessage+= `${errorData.email[0]}`
      }
      setError(errorMessage || "Login failed. Please try again.");
        } 
      else {
            setError("Something went wrong. Please try again.");
      }}}
        
    

  return (
    <div className='wrap'>
      <div className='part1'>
        <div className='head'><h1>Welcome back!</h1></div>
        <div className='head1'><h3> <a href='/signup'><u className='blue'>Sign up</u></a> and discover great amount of facilities</h3></div>
      </div>
      <div className='part2'>
        <form action="" onSubmit={handleSubmit}>
          <div className='head12'> <h1>Log In</h1></div>
          
          <div className='form-group1'>
          {error && <p className='error-message'>{error}</p>}
            <label htmlFor=''></label>
            <input type='text' placeholder='Email' className='email-form' name='email' value={email} onChange={handleOnchange}/>
          </div>
          <div className='form-group2'>
             <label htmlFor=''></label>
            <input type='password' placeholder='Password' className='email-form' name='password' value={password} onChange={handleOnchange}/>
          </div>
          <input type='submit' value='Login' className='submit_btn'/>
          <div className='disc'><p>By clicking on "Login" you agree to</p>
            <u className='blue'> Terms of Service | Privacy Policy </u>
          </div>
        </form>
      </div>
      
    </div>
  )
}

export default Login
