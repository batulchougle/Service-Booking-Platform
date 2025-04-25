import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import './Laundry.css'
import React from "react"
import { useEffect } from "react"
import axios from "axios"


const LaundryDetail = () => {
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
        <img src='/bg_laun.png' className='lau_bgimg'/>
        <div className='partl1'></div>
        <h1 className='rel'>Reliable Laundry Care,</h1>
        <h1 className='rig'>Right At Your Door-Step</h1>
        <p className='infol1'>Reliable Laundry Care, delivered to your door.<br/>
            Say goodbye to laundry stress with fresh, clean clothes <br/>at your convenience,
            with our easy to use platform.
        </p>
        <div>
            <b>
                <ul type='disc' className='list_lau'>
                    <li>Pick Up & Delivery</li>
                    <li className='mode'>Modern Equipment</li>
                    <li>Spotless and Cared for</li>
                    <li className='fit'>Fit your busy schedule</li>
                </ul>
            </b>
        </div>
        <h1 className='startsat_lau'>Starts From ₹1,499</h1>
        <button className='enqnow_lau' onClick={()=>handleNavigate(serviceName,serviceId)}>Enquire Now</button>
        <button className='booknow_lau' onClick={()=>handleNavigate2(serviceName,serviceId)}>Book Now</button> 
        <button className='feedbacks_lau' onClick={()=>handleNavigate3(serviceName,serviceId)}> See Reviews ⭐</button>


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
        
        <h1 className='lau_inc'>Our Laundry Service Includes:</h1>
        <img src='/wmachine.png' className='wmachine'/>
        <p className='wnd'><b className='wandr'>Washing & Drying</b><br/>
            &nbsp;&nbsp;&nbsp;
            Professional care for <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all fabric types    
        </p>
        <img src='/iron.png' className='iron'/>
        <p className='inf'><b className='irnfo'>Ironing & Folding</b><br/>
            &nbsp;&nbsp;
            Professional care for <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;all fabric types
        </p>
        <img src='/hanger.png' className='hanger_clo'/>
        <p className='pnd'><b className='pinde'>&nbsp;&nbsp;PickUp & Delivery</b><br/>
            Convenient services at your<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;doorstep
        </p>
        <img src='/foldclothes.png' className='fold_clo'/>
        <p className='c_lau'><b className='com_lau'>Commercial Laundry</b><br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            Efficient services for<br/>
            &nbsp;&nbsp;
            businesses like hotels and <br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            restaurants
        </p>
        <hr className='yel_1'/>
        <hr className='yel_2'/>
        <p className='hithere'><u>Choose a time and place that works best for you. We'll come to your doorstep!</u></p>
        <p className='line2'><u>Our professionals handle your clothes with precision and the utmost care.</u></p>
        <p className='line3'><u>Receive neatly cleaned, folded and ironed clothes right at your door.</u></p>
        <p className='line4'>
          <h1 className='spec'>Our Speciallity:</h1>
          <li>
            The most widely used cleaning solvent in dry cleaning is perchloroethylene (“perc”), but this known carcinogen can have a hazardous impact on the environment. 
            While Perc is illegal in most of the countries, an estimated 80% of dry cleaners nationwide still use it. Illinois is no exception - in fact, less than 20 dry 
            cleaners in the entire city of Navi Mumbai without perc.
          </li>
          <li className='line5'>
            Ease&Quick is committed to providing high-quality clothing care while keeping our customers and the environment safe, so we only work with green cleaning partners who never use perc.  
          </li> 
          <li className='line6'>
            We’ll collect any clothing that you’d like to donate and make sure it is given to a charitable organization in your community, rather than ending up in a landfill.   
          </li>  
          <li className='line7'>
            Our cleaning partners’ use of commercial, high-efficiency washing machines means up to 70% less water is used when compared to traditional, at-home washing machines. Additionally, cold water washing and high-speed spin cycles significantly reduce energy costs and carbon emissions associated with cleaning. 
          </li> 
          <li className='line8'>
            Traditional Dry Cleaning and Wash & Fold practices use plastic to ensure your clean clothes stay clean when they’re delivered to you. Mycleaners does this, too, however, much of the plastic wrapping that Mycleaners uses is biodegradable, meaning it will naturally decompose without causing harm.   
          </li>    
        </p>

        <img src='/del.png' className='delman'/>
        <img src='/last_img.png' className='last_img'/>
        <img src='/process2.png' className='proc2' height={200} width={200}/>
        <img src='/detergent.png' className='detergent' height={250} width={300}/>
        <img src='/folding.png' className='drying' height={250} width={300}/>
        
    </div>
  )
}

export default LaundryDetail