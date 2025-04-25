import React from 'react'
import './Shifting.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Shifting = () => {
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
      <img src='/shifting_imgbg.png' className='shifting_bgimg'/>
      <img src='/company_shifting.png' className='company_shift'/>
      <p className='shift_head2'>Ease & Quick Moverz</p>
      <p className='shift_head1'>Careful Moves<br/>&nbsp;&nbsp;&nbsp;<b className='shift_head3'>Made Easy!</b></p>
      <p className='shift_head4'>Experience hassle-free journeys with our transport <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;solutions that prioritize you comfort.</p>
      <h1 className='startsat_shift'>Starts From ₹3,499</h1>
      <button className='enq_now_shift' onClick={()=>handleNavigate(serviceName,serviceId)}>Enquire Now</button>
      <button className='book_now_shift' onClick={()=>handleNavigate2(serviceName,serviceId)}>Book Now</button>
      <button className='feedbacks_shift' onClick={()=>handleNavigate3(serviceName,serviceId)}> See Reviews ⭐</button>

      <div className='shiftlines'>
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
      <p className='shift_head5'>About Us</p>
      <p className='shift_head6'>We are the best moving company in the world.</p>
      <p className='shift_head7'>We endeavor to comprehend what they’re going through, what they need what their price<br/> tags are, and what means quite a bit to them and their clients.</p>
      <img src='/transport1.png' className='transport' height={150} width={150}/>
      <img src='/warehouse.png' className='warehouse' height={200} width={150}/>
      <p className='shift_head8'><b className='shift2'>Transport Solutions</b><br/><br/>Mover service provider <br/>company role in the global</p>
      <p className='shift_head9'><b className='shift2'>Warehousing</b><br/><br/>Mover service provider <br/>company role in the global</p>    </div>
  )
}

export default Shifting