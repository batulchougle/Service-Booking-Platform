import React from 'react'
import './Plumbing.css'
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

const Plumbing = () => {
    const navigate = useNavigate()
    const { serviceName } = useParams();
    const {serviceId}=useParams()
    const handleNavigate = (serviceName,serviceId) => {
        navigate(`/enquire-now/${serviceName.toLowerCase()}/${serviceId}/`);
    }
    const handleNavigate2 = (serviceName,serviceId) => {
      navigate(`/booknow/${serviceName.toLowerCase()}/${serviceId}`)
     
  }
    
  const handleNavigate3 = (serviceName,serviceId) => {
    navigate(`/display/feedbacks/${serviceName.toLowerCase()}/${serviceId}`)
  }
  return (
    <div>
      <img src='/plumber_img.png' className='plumber_img'/>
      <p className='plumb_head1'>Where Sewage Meets...<br/> <b className='plumb_head2'> The Simplicity!</b></p>
      <p className='plumb_head3'>Would you like a new bathroom? Or would <br/>&nbsp;&nbsp;&nbsp;you like to carry out a long-overdue <br/>modernization? In us you will find a competent 
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and reliable partner.
      </p>
      <h1 className='startsat_plumb'>Starts From ₹3,499</h1>
      <button className='enq_now_plumb' onClick={()=>handleNavigate(serviceName,serviceId)}>Enquire Now</button>
      <button className='book_now_plumb' onClick={()=>handleNavigate2(serviceName,serviceId)}>Book Now</button>
      <button className='feedbacks_plumb' onClick={()=>handleNavigate3(serviceName,serviceId)}> See Reviews ⭐</button>
      <div className='plumblines'>
        <hr className='lhor_line'/>
        <hr className='lhor_line2'/>
        <div >
          <img src='/calling.png' width={100} className='lca'/>
          <p className='lhaveaque'>Have a question?Call us now!<br/><br/>
            <b className='lno'>912-2564897</b>
          </p>
          <img src='/clock.png'width={100} className='lcl'/>
          <p className='ltime'>We are open Monday-Saturday<br/><br/>
            <b className='lti'>08:00-22:00</b>
          </p>
          <img src='/locationcall.png' width={150} height={150} className='llo'/>
          <p className='lloc_add'>Our Address:<br/><br/>
            <b className='lad1'>123 Facility Lane, 100Cityville</b>
          </p>
        </div>
      </div>

      <p className='plumb_head7'>Qualilty Assurance<br/><b className='plumb_head8'>Innovative plumbing solutions for you.</b></p>
      <p className='plumb_head9'>Our team proudly offers an on-time guarantee and a 100% customer satisfaction guarantee. <br/>It’s why we make sure that our licensed plumbers are highly trained and fully equipped to meet <br/>your home’s diverse plumbing service needs.</p>
      <br/>
      <li className='plumb_head10'>First Class Quality Service at Affordable Prices</li><br/>
      <li className='plumb_head10'>Immediate 24/ 7 Emergency Service</li><br/>
      <li className='plumb_head10'>Expert, guaranteed workmanship</li><br/>
      <li className='plumb_head10'>Core Plumbing Services like installation, repair, maintenance, gasline work, water heater and boiler,etc.</li><br/>
      <li className='plumb_head10'>Collaborate with general contractors, electricians, and other professionals during construction.</li>

      <div>
        <img src='/plumbing2.png' className='plumbing2' height={700} width={700}/>
      </div>


    </div>
  )
}

export default Plumbing