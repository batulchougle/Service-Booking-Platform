import React from 'react'
import './ContactUs.css'

const ContactUs = () => {
  return (
    <div className='wrap'>
      <div className='partc'>
      <div className='cbox'>
      <div className='chead'><h1><u>Contact Us</u></h1></div>
      </div>
      <div>
        <img src='../location.png' className='loc'/>
        <p className='address'>123 Facility Lane, Suite 100Cityville,<br/> ST 12345(123) 456-7890</p>
        <img src='../telecon.png' className='tele'/>
        <p className='telec'>912-2564897</p>
        <img src='../emailcon.png' className='emailcon'/>
        <p className='emailc'>easenquick@company.com</p>
      </div>
      </div>
      <div className='parto'></div>
    </div>
  )
}

export default ContactUs