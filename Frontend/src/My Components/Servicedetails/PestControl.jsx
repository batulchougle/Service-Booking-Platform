import React from 'react'
import './PestControl.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const PestControl = () => {
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
        <h1 className='pest_head'>Spring those Bugs off</h1>
        <h1 className='pest_head2'>&nbsp;&nbsp;&nbsp;For Good!</h1>
        <img src='/pestimg.png' className='pest_imgbg'/>
        <img src='/bug1.png' className='bug1'/>
        <img src='/bug2.png' className='bug2'/>
        <h1 className='pest_head3'>Enjoy your home totally Pests Free</h1>
        <h1 className='startsat_pest'>Starts From ₹3,499</h1>
        <button className='enq_now_pest' onClick={()=>handleNavigate(serviceName,serviceId)}>Enquire Now</button>
        <button className='book_now_pest' onClick={()=>handleNavigate2(serviceName,serviceId)}>Book Now</button>
        <button className='feedbacks_pest' onClick={()=>handleNavigate3(serviceName,serviceId)}> See Reviews ⭐</button>
        <h1 className='pest_head4'>Work Principle</h1>
        <div className='pestlines'>
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
            <div className='pest_info_img'>
                <img src='/home-11.png' className='pest_img1'/>
                <img src='/home-12.png' className='pest_img2'/>
                <img src='/home-13.png' className='pest_img3'/>
            </div>
            <p className='pest_head6'>Preparatory arrangements&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Disinfection
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Removal after disinfection
            </p>
            <p className='pest_head7'>
                We come to you to inspect the area, to <br/>prepare it for future disinfection, and 
                <br/>&nbsp;&nbsp;&nbsp;to take into concern your wishes
            </p>
            <p className='pest_head8'>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We carry out the disinfection during<br/>&nbsp;&nbsp;couple of hours depending on house size<br/> 
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;and amount of work.
            </p>
            <p className='pest_head9'>
                We do all the removal after disinfection was<br/>
                successfully done. You’ll have no worries <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;about that!
            </p>
        </div> 
        <p className='pest_head10'>
            About Us
        </p>
        <p className='pest_head11'>
            We are a company providing a wide range of maintenance and many other services needed to make <br/>your life comfortable and happy. 
            Our high-class experts fix any malfunction and install any<br/> equipment in your house.
        </p>
        <li className='pest_list1'>We Investigate</li>
        <li className='pest_list2'>We Protect</li>
        <li className='pest_list3'>We Fortify</li>
        <li className='pest_list4'>We Keep Watch</li>
        <li className='pest_list5'>We Report</li>
        <li className='pest_list6'>We Clean</li>
    </div>
  )
}

export default PestControl