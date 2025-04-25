import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './services.css'

const Services = ()=>{
    const navigate=useNavigate()
    const [services, setServices]=useState([])


useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/v1/auth/services/")
        .then((response) => setServices(response.data))
        .catch((error) => console.error("Error fetching services:", error));
}, []);

const handleNavigate = (serviceName,serviceId) => {
    navigate(`/service-details/${serviceName.toLowerCase()}/${serviceId}`)
   
}

return (
    <div>
        <h2>Our Services</h2>
        <div className="services">
            {services.map((service) => (
                <div key={service.id} className="service-item">
                    <img src={service.icon} alt={service.name}/>
                    <button className="btn23" onClick={()=>handleNavigate(service.name,service.id)}>{service.name}</button>
                </div>
            ))}
        </div>
    </div>
);
}


export default Services