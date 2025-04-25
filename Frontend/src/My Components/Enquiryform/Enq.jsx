
import './Enq.css'
import React, {useState} from 'react'
import axios from "axios"
import { useParams } from "react-router-dom"
import { toast } from 'react-toastify'


const Enq = () => {

const { serviceId } = useParams()  
    
const storedUser=localStorage.getItem("user")  
const userId = storedUser ? JSON.parse(storedUser).id : null;


const [formData, setFormData] = useState({
  name: "",
  contact: "",
  message: "",
  user:userId,
  service:serviceId,
})

const handleOnchange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

const [error, setError] = useState("")

const {  name, contact, message} = formData

let token=localStorage.getItem("token")
if (token.startsWith('"') && token.endsWith('"')) {
  token = token.slice(1, -1);  
}



const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const response = await axios.post('http://localhost:8000/api/v1/auth/enquire-now/enquiries/', formData,
        {
          headers: {
              Authorization: `Bearer ${token}`,  
              "Content-Type": "application/json"
          }
      }
       )
       
      if (response.status === 201) {
        toast.success('Enquiry sent successfully')
      }
    } catch (error) {
        console.log("Error Response:", error.response);
        console.log("Error Data:", error.response?.data);
        console.log("Error Status:", error.response?.status);
        console.log("Form Data Sent:", formData);
      if(!storedUser){
           toast.error('Please login to continue.')
        } 
      else {
            toast.error("Something went wrong. Please try again.");
        }
      }
}  

  return (
    <div className='body1'>
        <div className='wrape1'>
            <h1 className='cleaningservices'><u>Enquiry Form</u></h1>
            
        </div>
        <div >
            <div className='wrape2'>
                <p className='eheading'>If you have any queries kindly take a moment to fill the form. 
                    <br/>
                    
                    We will get in touch with you shortly. Or contact us on 912-2564897<u></u>
                </p>
                <form action="" onSubmit={handleSubmit}>
                    <div className='form-group-e'>
                        <label htmlFor=''><b>Your Name:</b>&nbsp;</label>
                        <input type='texte1' placeholder='Customer Name' className='email-form-e' name='name' value={name} onChange={handleOnchange} />
                    </div>
                    <div className='form-group-e2'>
                        <label htmlFor=''><b>Contact:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type='numbere1' placeholder='Customer Contact Number' className='email-form-e2' name='contact' value={contact} onChange={handleOnchange}/>
                    </div>
                    <div className='form-group-e3'>
                        <label htmlFor=''><b>Message:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                        <input type='texte2' placeholder='Customer Queries' className='email-form-e3' name='message' value={message} onChange={handleOnchange}/>
                    </div>
                    <input type='submit' value='Submit' className='btne2'/>
                </form>

            </div>
                                
            
        </div>

    </div>
  )
}

export default Enq
