
import React from 'react'
import './Feedback.css'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Feedbacks = () => {

    const [feedbacks, setFeedbacks]=useState([])
    const {serviceId} =useParams()
    const {serviceName}= useParams()

    useEffect(() => {
       axios.get(`http://127.0.0.1:8000/display/feedbacks/?service=${serviceId}`)
            .then((response) => setFeedbacks(response.data))
            .catch((error) => console.error("Error fetching feedbacks:", error));
    }, [serviceId]);
    

  return (
    <div className='overallpage'>
      <h1 className='fed_title'>Recent reviews for {serviceName} </h1>

      
      <div className='fed_container'>
    { feedbacks.length>0 ? (
      feedbacks.map((feedback,index) => ( 
        <div key={feedback.id} className={`fed_boxes ${index % 2 === 0 ? 'left' : 'right'}`}>
        <img src='/profile_icon.png' className='prof_icon'/>
        <p className='user_names_fed'>{feedback.user_name}</p>
        <p className='reviews_fed'>{feedback.feedback}</p>
    </div>
        
      
     ))
    ) : (
        <p>No Feedbacks Found</p>
    )
    }

       </div> 

      </div>
 
  
  )
}

export default Feedbacks