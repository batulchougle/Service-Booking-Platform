import React from 'react'
import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './My Components/Navbar/Navbar'
import Home from './My Components/Navbar/Home'
import Signup from './My Components/Signup/Signup'
import Login from './My Components/Login/Login'
import VerifyEmail from './My Components/Signup/VerifyEmail'
import Services from './My Components/Navbar/Services'
import Footer from './My Components/Footer/Footer'
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ContactUs from './My Components/Navbar/ContactUs'
import ServiceDetail from './My Components/Servicedetails/ServiceDetail'
import Enq from './My Components/Enquiryform/Enq'
import MyBookings from './My Components/Bookings/MyBookings'
import Booknow from './My Components/Bookings/Booknow'
import Booking from './My Components/Bookings/Booking'
import Feedbacks from './My Components/Bookings/Feedback'
import ShareFeedback from './My Components/Bookings/ShareFeedback'



function App() {
  

  return (
    
    <div id="page-container">
       <Router>
        <Navbar/>
        
        
        <div id="content-wrap">
        <ToastContainer />
        
        <Routes>
        <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/home' element={<Home/>}/>
         
          <Route path='/otp/verify' element={<VerifyEmail/>} />
          <Route path='/services' element={<Services/>} />
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/service-details/:serviceName/:serviceId' element={<ServiceDetail/>}/>
          <Route path='/enquire-now/:serviceName/:serviceId' element={<Enq/>}/>
          <Route path='/mybookings' element={<MyBookings/>}/>
          <Route path='/booknow/:serviceName/:serviceId' element={<Booknow/>}/>
          <Route path='/booking-confirm/:complaint_number/:serviceName/:booking_id' element={<Booking/>}/>
          <Route path='/display/feedbacks/:serviceName/:serviceId' element={<Feedbacks/>}/>
          <Route path='/share/feedback/:serviceId' element={<ShareFeedback/>}/>
          
          
          

          
        
         
        </Routes>
        </div>
         <Footer />
        </Router>
        </div>
      
     

  )
}

export default App






















