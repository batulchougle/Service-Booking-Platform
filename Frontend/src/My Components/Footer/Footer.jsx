import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <footer className='footer'>
        <div className='footer-container'>
            <div className='contact'>
                <h3 className='fcontact'> <u>Contact Us</u></h3>
                <b><p className='faddress'>123 Facility Lane, Suite 100Cityville,<br/> ST 12345(123) 456-7890</p></b>
            </div>
            <div className='quick-links'>
                <h3 className='flink'><u>Quick Links</u></h3>
                <b><ul className='flinks'>
                    <li><a href='/home'>Home</a></li>
                    <li><a href='/services'>Services</a></li>
                    <li><a href='/contactus'>Contact Us</a></li>
                </ul></b>
            </div>
            <div className='social-media'>
                <h3 className='fsocial'><u>Follow Us On</u></h3>
                <img src='/facebook-icon.png' className='facebook'/>
                <img src='/twitter.png' className='twitter'/>
                <img src='/instagram.png' className='instagram'/>
                <img src='/linkdin.png' className='linkdin'/>

            </div>
        </div>
      
    </footer>
  )
}

export default Footer