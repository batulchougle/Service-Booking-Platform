import React, { useState,useEffect } from "react";
import "./Booknow.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Booknow = () => {
    const {serviceName} =useParams()
    const { serviceId } =useParams()
    const navigate = useNavigate()
    const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID
    
    const options = ["Mumbai","Navi Mumbai","Thane","Pune"]

    const sortedOptions = [...options].sort()

    const [formData, setFormData] = useState({
        city: "",
        contact: "",
        address: "",
        service_date:"",
      })

      const handleNavigate = (complaint_number,booking_id) => {
        navigate(`/booking-confirm/${complaint_number}/${serviceName}/${booking_id}`)
      } 


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleKeyPress = (event) => {
        if (!/[0-9]/.test(event.key)) {
            event.preventDefault()
        }
    }

    const {  city, contact, address, service_date} = formData

    let token=localStorage.getItem("token")
    if (token.startsWith('"') && token.endsWith('"')) {
       token = token.slice(1, -1);  
    }   

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);
      }, []);

      const handlePayment = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            service: serviceId, 
        };

        try {
  
          const response = await axios.post("http://127.0.0.1:8000/payments/create-order/", payload,
          {
            headers: {
              "Authorization": `Bearer ${token}`, 
              "Content-Type": "application/json"
            }
        });
          const { order_id } = response.data; 
          const {complaint_number}=response.data;
          const {booking_id}=response.data;
      
          const options = {
            key: RAZORPAY_KEY_ID,
            amount: 5000, 
            currency: "INR",
            name: "Ease and Quick",
            description: "Payment for Service Booking",
            
            order_id: order_id, 
            handler: async function (response) {
              
              const verifyResponse = await axios.post("http://127.0.0.1:8000/payments/verify-payment/", JSON.stringify({
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
                handleNavigate(complaint_number,booking_id)
              } else {
                toast.error('Payment Verification Failed')
              }
            },
            
            theme: {
              color: "#3399cc"
            }
          }
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        } catch (error) {
          toast.error("Error initiating payment");
        }
      };  

    return (
        <div className='bobody'>
            <h1 className='BookNow'>Make a Booking Now for {serviceName} </h1>
            <form>
                <div className='rowm12'>
                <div className="form_groupb4">
                     <label htmlFor="" className="label4"><b>Service Slot:</b></label>
                     <input type="datetime-local" id="service_date" className="date-picker" name='service_date' value={service_date} onChange={handleChange} />
                </div>
                <div className='form_groupb5'>
    <label htmlFor='' className='label5'><b>Phone Number:</b></label>
    <input type='textb1' maxLength='10' id='contact' placeholder="Enter Customer's Phone Number" className='phone-book' onKeyPress={handleKeyPress} name='contact' value={contact} onChange={handleChange}required/>
                </div>
                </div>
                <div className='rowm22'>
                    <div className='form_groupb2'>
                        <label htmlFor="city" className="label2"><b>City:</b></label>
                        <select id="city" name="city" value={city} onChange={handleChange} className="dropbox1" required>
                            <option value=''>-- Choose an option --</option>
                            {sortedOptions.map((option, index) => (
                            <option key={index} value={option.toLowerCase()}>
                                {option}
                            </option>
                            ))}
                        </select>    
                    </div>              
                <div className='form_groupb7'>
                    <label htmlFor='' className='label7'><b>Address:</b></label>
                    <input type='textb1' id='address' placeholder="Enter Address" className='add-book' name='address' value={address} onChange={handleChange}required/>
                </div>
                </div>
                
                <div className='submit_pay'>
                <button className='pay_now' onClick={handlePayment}>Pay Now ₹50 </button> 
                
                </div>
            </form>
            <div>
              <div className="wrapb1">
                <img src='/booking_img4.png' className="booking_img1" height={500}/>
              </div>
            </div>
        </div>
    );
};

export default Booknow;