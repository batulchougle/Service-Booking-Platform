import { useParams } from "react-router-dom"
import LaundryDetail from "./Laundry"
import Shifting from "./Shifting";
import Cleaning from "./Cleaning";
import Painting from "./Pinting";
import PestControl from "./PestControl";
import Plumbing from "./Plumbing";


const ServiceDetail = () => {
    const { serviceName } = useParams()

    if (serviceName === "laundry") return <LaundryDetail />;
    if(serviceName==="shifting" ) return <Shifting/>
    if(serviceName==="cleaning") return <Cleaning/>
    if(serviceName==="painting") return <Painting/>
    if(serviceName==="pest control") return <PestControl/>
    if(serviceName==="plumbing") return <Plumbing/>


    return <h2>Service not found</h2>;
};

export default ServiceDetail;
