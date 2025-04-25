import React from 'react'
import './MyBookings.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyBookings = () => {

    const [bookings, setBookings]=useState([])
    const [selectedReceipt, setSelectedReceipt] = useState(null);
    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID
    let token=localStorage.getItem("token")
    if (token.startsWith('"') && token.endsWith('"')) {
         token = token.slice(1, -1);  
    }
    const navigate = useNavigate()

    const handleNavigate = (serviceId) => {
      navigate(`/share/feedback/${serviceId}`);
    } 

    useEffect(() => {
       axios.get("http://127.0.0.1:8000/user/bookings/",
            {
                headers: {
                  "Authorization": `Bearer ${token}`, 
                  "Content-Type": "application/json"
                }
    })
            .then((response) => setBookings(response.data))
            .catch((error) => console.error("Error fetching services:", error));
    }, []);

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }, []);

    const handlePayment = async (booking_id,e) => {
      e.preventDefault();
      console.log("Authorization Header:", `Bearer ${token}`)
      try {
        const response = await axios.post("http://127.0.0.1:8000/service/payment/",{booking_id:booking_id},
        {
          headers: {
            "Authorization": `Bearer ${token}`, 
            "Content-Type": "application/json"
          }
      })

      console.log("Backend Response:", response.data);
        const { order_id } = response.data; 
        const {amount} = response.data;
        console.log(amount)
          
        const options = {
          key: RAZORPAY_KEY_ID, 
          amount: amount, 
          currency: "INR",
          name: "Ease and Quick",
          description: "Payment for Service Booking",
          
          order_id: order_id, 
          handler: async function (response) {
            
            const verifyResponse = await axios.post("http://127.0.0.1:8000/verify/payment/", JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            }),
            {
              headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
              }
          });
            if (verifyResponse.status===200) {
              toast.success('Payment Verification Successful')
            } else {
              toast.error("Payment Verification Failed ")
            }
          },
          
          theme: {
            color: "#3399cc"
          }
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } catch (error) {
        toast.error("Error initiating payment");
      }
    }

  return (
    <div className='mbody'>
      <h1 className='MyBookings'>My Bookings</h1>
      <hr className='mhrline1'/>
      <div className='mcontainer'>
    { bookings.length>0 ? (
      bookings.map((booking) => ( 
        
        <div className='mbox' key={booking.complaint_no}>
          <h1 className='ser_name1'>{booking.service_name}</h1>
          <p className='mcom_no'>Complaint No.: {booking.complaint_no}</p>
          <p className='mstatus'>Status: {booking.status}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Service charges:₹{booking.service_amount}</p>
          <p className='mworker'>Worker: {booking.worker_name} (Call: {booking.worker_contact})</p>
          <p className='mdate'>Booking slot: {booking.service_date}</p>
          {booking.status==="paid"&&(
          <p className='mreceipt'> Receipt: {booking.reciept?(
               <img 
              src="/receipt-icon.jpg"  
              alt="Receipt Icon"
              className="receipt-icon"
              onClick={() => {
                setSelectedReceipt(booking.reciept)} }
          />
          ) :(
             "No Receipt Available"
          )
            }
            </p>
          )}
            {booking.status==="paid"&&(  
          <p className='mfeedback'>
            <button className='fed_btn' onClick={()=>handleNavigate(booking.service)}>Click here to share your feedback</button>
            </p>  
            )}
            {booking.status==="completed" && booking.payment_method==="Online" &&( 
              <p className='mfeedback'>
                        <button className='fed_btn' onClick={(e) => handlePayment(booking.id,e)}>Click here for service Payment(₹{booking.service_amount})</button>
              </p>
            )}          
        </div>
     ))
    ) : (
        <p>No Bookings Found</p>
    )
    }
        
      </div>

      {selectedReceipt && (
     <div className="modal" onClick={() => setSelectedReceipt(null)}>
         <div className="modal-content">
             <img src={selectedReceipt} alt="Receipt" />
         </div>
     </div>
 )}  
 
    </div>
  )
}

export default MyBookings