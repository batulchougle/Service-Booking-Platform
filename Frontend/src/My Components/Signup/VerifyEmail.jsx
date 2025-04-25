import React,{useState} from 'react'
import './VerifyEmail.css'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"



const VerifyEmail = () => {
  const [otp, setOtp]=useState("")
  const navigate=useNavigate()
  const handleOtpSubmit = async(e)=>{
    e.preventDefault()
    if (otp) {
        const res = await axios.post('http://localhost:8000/api/v1/auth/verify-email/', {'otp':otp})
        const resp = res.data
        if (res.status === 200) {
            navigate('/login')
            toast.success(resp.message)
        }     
    }   
}


  return (
    <div className='wrap1'>
      <div className='box1'>
        <div className='vhead'><h1>Verify Your Email</h1></div>
      </div>
      <img src='../public/emailv.png' className='email-icon'/>
      <div className='box2'>
        <h3 className='vhead2'> A Verification Code has been sent to your email</h3>
        <p className='para1'>Please check your inbox and enter the Verification code</p>
        <p className='para2'>below to verify your email address</p>
        <form action="" onSubmit={handleOtpSubmit}>
          <div className='boxes'>
            <input type='number' maxLength='6' name='otp' value={otp}  onChange={(e)=>setOtp(e.target.value)} />
          </div>
          <input type='submit' value='Verify' className='verify_btn'/>
        </form>
        <div className='vhead4'><a href='/signup'><p><u>Change Email Address</u></p></a></div>
      </div>
    </div>
  )
}

export default VerifyEmail
