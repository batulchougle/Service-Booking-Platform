import React from 'react'
import './Cleaning.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Cleaning = () => {
    const navigate = useNavigate()
    const { serviceName } = useParams()
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
       <h1 className='hi'>Let Us Make Your</h1>
       <h1 className='hi2'>House Shine And Sparkle</h1>
       <img src='/cleaning.png' className='cle-bgimg'/>
       <p className='cle-info'>Our expert house cleaning service gives your<br/>
          place a clean, professional look that will <br/>
          impress your guests. We train our staff to <br/>
          clean with a consistent attention to detail.<br/>
          That way, we can give you the same high <br/>
          quality service every time.<br/>
        </p>
        <h1 className='startsat'>Starts From ₹3,499</h1>
        <button className='enq_now_btn' onClick={()=>handleNavigate(serviceName,serviceId)}>Enquire Now</button>
        <button className='book_now_btn' onClick={()=>handleNavigate2(serviceName,serviceId)}>Book Now</button>
        <button className='feedbacks_btn' onClick={()=>handleNavigate3(serviceName,serviceId)}> See Reviews ⭐</button>
        <hr className='hor_line'/>
        <hr className='hor_line2'/>
        <div>
          <img src='/calling.png' width={100} className='ca'/>
          <p className='haveaque'>Have a question?Call us now!<br/><br/>
            <b className='no'>912-2564897</b>
          </p>
          <img src='/clock.png'width={100} className='cl'/>
          <p className='time'>We are open Monday-Saturday<br/><br/>
            <b className='ti'>08:00-22:00</b>
          </p>
          <img src='/locationcall.png' width={150} height={150} className='lo'/>
          <p className='loc_add'>Our Address:<br/><br/>
            <b className='ad1'>123 Facility Lane, 100Cityville</b>
          </p>
        </div>
        <p className='hs2'>Your preferred cleaning service company</p>
        <p className='hs3'>Offering high quality cleaning services<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          at affordable prices
        </p>

        <div className='cle_container'>
        <div className='clebox'>
          <img src='/window_cle.png' className='window_cle'/>
          <h1 className='cle_head1'>Window Cleaning</h1>  
          <p className='cle_head2'>
            The exterior cleaning of architectural glass used for structural, 
            lighting, or decorative purposes. It can be done manually, using 
            a variety of tools for cleaning and access. Technology is also employed and increasingly, automation.
          </p>
        </div>
        <div className='clebox'>
          <img src='/maid_cle.png' className='maid_cle'/>
          <h1 className='cle_head1'>Maid Service</h1>  
          <p className='cle_head2'>
            Maid services typically offer general cleaning, 
            including dusting, vacuuming, mopping, and cleaning bathrooms 
            and kitchens, with some services also including laundry, ironing, 
            and other tasks at domestic level. 
          </p>
        </div>
        <div className='clebox'>
          <img src='/office_cle.png' className='window_cle'/>
          <h1 className='cle_head1'>Office Cleaning</h1>  
          <p className='cle_head2'>
            Responsible for all basic cleaning in and around the 
            facility or office building. This can entail dusting, mopping, 
            sweeping, vacuuming, and cleaning smudges off windows and doors. 
            Ensuring restrooms are cleaned, sanitized, and restocked is 
            another important responsibility of a cleaner.
          </p>
       </div>
      </div>
      <div className='cle_container2'>
        <div className='clebox'>
          <img src='/domestic_cle.png' className='window_cle'/>
          <h1 className='cle_head1'>Domestic Cleaning</h1>  
          <p className='cle_head2'>
            The undertaking of cleaning duties around a private 
            residential home. Domestic cleaning generally includes the 
            carrying out of cleaning tasks such as dusting, vacuuming, 
            mopping and cleaning of bathrooms and kitchens.
          </p>
        </div>
        <div className='clebox'>
          <img src='/carpet_cle.png' className='window_cle'/>
          <h1 className='cle_head1'>Carpet Cleaning</h1>  
          <p className='cle_head2'>
            Technician's work focuses on the cleaning of carpets. 
            They use a variety of cleaning products, tools, and techniques
            to do this. Carpet cleaning technicians also move furniture so 
            that they can complete their tasks and are sometimes encouraged 
            to upsell customers on higher-end services.
          </p>
        </div>
        <div className='clebox'>
          <img src='/event_cleaning.png' className='window_cle'/>
          <h1 className='cle_head1'>Event Cleaning</h1>  
          <p className='cle_head2'>
            Ensure all areas of the event are clean and debris-free. 
            Standard tasks include ensuring trash containers are emptied 
            promptly, floors are clear at all times, and spills are immediately 
            dealt with. Experienced and uniformed crew should be available for 
            help when needed.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Cleaning