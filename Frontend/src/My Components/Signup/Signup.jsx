import React, {useState} from 'react'
import axios from "axios"
import './Signup.css'
import { useNavigate } from "react-router-dom"


const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    username: "",
    password: "",
    password2: "",
  })
  const [error, setError] = useState("")

  const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const { email, name, username, password, password2 } = formData

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/signup/', formData)
      const result =response.data
      if (response.status === 201) {
        navigate("/otp/verify")
      }
    } catch (error) {
      if(error.response && error.response.data){
      const errorData=error.response.data;
      let errorMessage =''
      if(errorData.email){
        errorMessage+= `Email: ${errorData.email[0]}`
      }
      if(errorData.username){
        errorMessage+= `username: ${errorData.username[0]}`
      }
      if(errorData.password){
        errorMessage+= `Password: ${errorData.password[0]}`
      }
      setError(errorMessage || "Signup failed. Please try again.");
        } 
      else {
            setError("Something went wrong. Please try again.");
        }
      }
  };

  
    

  return (
    <div className='wrap'>
      <div className='part12'>
        <form action="" onSubmit={handleSubmit}> 
          <div className='head3'> <h1>Sign Up</h1></div>
          <div className='head4'> <h3>Please Fill The Form</h3></div>
          {error && <p className='error-message' style={{ whiteSpace: "pre-line", color: "red" }}>{error}</p>}
          <div className='form-group3'>
            <label htmlFor=''></label>
            <input type='text' placeholder='Email' className='email-form' name='email' value={email} onChange={handleOnchange}/>
          </div>
          <div className='form-group4'>
            <label htmlFor=''></label>
            <input type='text1' placeholder='Full Name'className='email-form' name='name' value={name} onChange={handleOnchange}/>
          </div>
          <div className='form-group5'>
            <label htmlFor=''></label>
            <input type='text2' placeholder='Username' className='email-form' name='username'value={username} onChange={handleOnchange} />
          </div>
          <div className='form-group6'>
            <label htmlFor=''></label>
            <input type='password' placeholder='Password' className='email-form' name='password'value={password} onChange={handleOnchange}/>
          </div>
          <div className='form-group7'>
            <label htmlFor=''></label>
            <input type='password' placeholder='Confirm Password' className='email-form' name='password2' value={password2} onChange={handleOnchange}/>
          </div>
          <input type='submit' value='Sign Up' className='submit_btn1'/>
        </form>
      </div>
      <div className='part21'> 
        <div className='head5'> <h1>Welcome!</h1> </div>
        <div className='head6'> <h3>Already have an account?<a href='/login'><u className='blue1'>Sign In</u></a></h3> </div>
      </div>
    </div>
  )
}

export default Signup