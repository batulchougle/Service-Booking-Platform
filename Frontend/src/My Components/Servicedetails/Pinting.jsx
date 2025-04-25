import React from 'react'
import './Painting.css'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Painting = () => {
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
      <h1 className='paintinghead'>Spreading the Joy of...<br/>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;...Painting
      </h1>
      <p className='paint_info'>
        Revive your walls with our world-class, quick and 
        <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;efficient renovation and painting services. 
      </p>
      <img src='/paintingserv.png' className='pain_img' />

      <h1 className='startsat_paint'>Starts From ₹3,499</h1>
      <button className='enq_now_paint'onClick={()=>handleNavigate(serviceName,serviceId)}>Enquire Now</button>
      <button className='book_now_paint' onClick={()=>handleNavigate2(serviceName,serviceId)}>Book Now</button>
      <button className='feedbacks_paint' onClick={()=>handleNavigate3(serviceName,serviceId)}> See Reviews ⭐</button>
      <div className='paintinglines'>
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
      <h1 className='safensec'>Safe And Hassle-Free Experiences with Ease & Quick Painting</h1>
      <p className='renovate'>Renovate Your Home Cleaner, Faster and Safer!</p>

      <div className='paintcontainer'>
        <div className='paintbox'>
          <img src='/inpainting.png' className='inpaint'/>
          <h1 className='type_head'> Interior Painting</h1>
          <li className='paintlist1'>Renovate your space with our expert Interior Painting Services. Quality and style guaranteed!</li><br/>
          <li className='paintlist1'>Our trained and certified painters will add more life to your interiors.</li>

        </div>
        <div className='paintbox'>
          <img src='/expainting.png' className='expaint'/>
          <h1 className='type_head'> Exterior Painting</h1>
          <li className='paintlist1'>Safeguard your exterior walls from harsh climates and damage with our custom-curated services.</li><br/>
          <li className='paintlist1'>Renew your exterior walls' strength and style with our professional painting services.</li>
        </div>
        <div className='paintbox'>
          <img src='/walltexture.png' className='walltext'/>
          <h1 className='type_head'> Wall Texture & Design</h1>
          <li className='paintlist1'>Choose our exquisite painting solutions for revamping your beloved walls.</li><br/>
          <li className='paintlist1'>Our experienced Express Painting professionals will transform a dull wall into a masterpiece using long-lasting wall textures.</li>
       </div>
      </div>
      <div className='paintcontainer2'>
        <div className='paintbox'>
          <img src='/woodpainting.png' className='woodpaint'/>
          <h1 className='type_head'> Wood Coating</h1>
          <li className='paintlist1'>Achieve perfectly textured wooden furniture through our professional wood coating services.</li><br/>
          <li className='paintlist1'>Our products will add the perfect gloss, shine, and shade to your beloved wooden furniture. </li>
        </div>
        <div className='paintbox'>
          <img src='/metalpainting.png' className='metalpaint'/>
          <h1 className='type_head'> Metal Coating</h1>
          <li className='paintlist1'>Shield your metal fixtures from corrosion, weather damage, and rust through our quality metal coating painting services. </li><br/>
          <li className='paintlist1'>Our certified team of painters will upgrade your fixtures with a new look!</li>

        </div>
        <div className='paintbox'>
          <img src='/waterproofing.png' className='waterproof'/>
          <h1 className='type_head'> Water Proofing</h1>
          <li className='paintlist1'>Our experienced professionals will prevent wall leakages by using the Berger Moisture Meter.</li><br/>
          <li className='paintlist1'>Ease & Quick Paints' Scientific Waterproofing ensures the durability of your walls. </li>

        </div>
      </div>
    </div>
  )
}

export default Painting