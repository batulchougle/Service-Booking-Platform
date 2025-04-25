import React from 'react'
import './Booking.css'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'


const Booking = () => {
    const {complaint_number}=useParams()
    const {serviceName} =useParams()
    const storedUser = localStorage.getItem("user")
    const user = JSON.parse(storedUser)
    const [userName, setUserName]=useState("")
    const [paymentMethod, setPaymentMethod] = useState("");
    const {booking_id}=useParams()
    

    useEffect(() => {
  
        if (storedUser) {
          
          setUserName(user.name) 
        }
      }, [user])
      const handlePaymentChange = async (event) => {
      const selectedMethod = event.target.value
      setPaymentMethod(selectedMethod)

      let token=localStorage.getItem("token")
      if (token.startsWith('"') && token.endsWith('"')) {
         token = token.slice(1, -1);  
      }   
      
      try {
        const response =  await axios.post(
          `http://localhost:8000/select/payment/method/`, 
          { payment_method: selectedMethod ,booking_id: booking_id},
         { headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
        }
        );
        if (response.status === 200) {
          toast.success('Payment method set successfully')
        }
      } catch (error) {
        console.error("Error updating payment method:", error);
      }
      }
  


  return (
    <div>
      <h1 className='b_title'>Your Service Is Booked Successfully!</h1>
      <img src='/confirmbook.png' className='confirm_book' height={150} width={150}/>
      <p className='choose'>Thank You For Choosing US!</p>
      <p className='pay_details'>[Please note: Service charges must be paid after the service is completed.]</p>
      <p className='pay_method_sel'>Kindly select your preferred payment method: </p>
      <form className='radio1'>
        <label htmlFor=''>
          <input type='radio' name='payment' value='Cash' checked={paymentMethod === "Cash"}
          onChange={handlePaymentChange}/> Cash Payment
        </label>
        <label htmlFor=''>
          <input type='radio' name='payment' value='Online' checked={paymentMethod === "Online"}
          onChange={handlePaymentChange}/> Online Payment
        </label>
      </form>
      <p className='serv_name'>Service:<br/>{serviceName}</p>
      <p className='compl_no'>Complaint Number: <br/>{complaint_number}</p>
      <p className='cust_name'>Customer Name:<br/>{userName}</p>
  
      <div className='vert_line1'></div>
      <div className='vert_line2'></div>
      
    </div>
  )
}

export default Booking