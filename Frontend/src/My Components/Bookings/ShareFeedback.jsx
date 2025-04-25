import React from 'react'
import './ShareFeedback.css'
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'


const ShareFeedback = () => {
    const { serviceId } = useParams()
    const storedUser=localStorage.getItem("user")  
    const userId = storedUser ? JSON.parse(storedUser).id : null;

    const [formData, setFormData] = useState({
        feedback: "",
        user:userId,
        service:serviceId,
      })

      const handleOnchange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    
    const [error, setError] = useState("")
    
    const {feedback} = formData   
    let token=localStorage.getItem("token")
if (token.startsWith('"') && token.endsWith('"')) {
  token = token.slice(1, -1);  
}


const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    console.log("Authorization Header:", `Bearer ${token}`);
    try {
      const response = await axios.post('http://localhost:8000/accept/feedback/', formData,
        {
          headers: {
              Authorization: `Bearer ${token}`,  
              "Content-Type": "application/json"
          }
      }
       )
       
      if (response.status === 201) {
        toast.success('Feedback sent successfully')
        
      }
    } catch (error) {
        console.log("Error Response:", error.response);
        console.log("Error Data:", error.response?.data);
        console.log("Error Status:", error.response?.status);
        console.log("Form Data Sent:", formData);   
      }
}  
   
  return (
    
    
    <div className='bodyf1'>
        <div className='wrapf1'>
        </div>
        <div>
            <div className='wrapf2'>
            <form action="" onSubmit={handleSubmit}>
                <div className='form-group-fe'>
                    <input type='textf' id='feedback' placeholder='Give Feedback Here' className='feed12' name='feedback' value={feedback} onChange={handleOnchange}/>    
                </div>
                <input type='submit' value='Share My Feedback' className='btnfeed'/>
            </form>      

            </div>
        </div>
        <div>
        <div className='wrapf4'>
        </div>
        </div>
        <div>
            <div className='wrapf3'>
            <img src='/feed1.png' height={300} className='feedbackimg'/>
            </div>
        </div>
        <h1 className='feedback-form'>We value your opinion!</h1>
        <p className='feed_2'>Kindly take a moment to tell us about <br/>&nbsp;&nbsp;&nbsp;your Ease & Quick experience.</p>
    </div>
  )
}

export default ShareFeedback