import { useEffect, useState } from "react";
import api from "../../../hooks/interceptors";
import BasicTab from "../../../components/BasicTab";

const ManageOffer = () => {
    const [allOffer, setAllOffer] = useState([])
    useEffect(()=>{
        api.get('/offer/')
        .then(res=>{
            setAllOffer(res.data)
        })
    },[])
    console.log();
    return (
        <div> 
            hello
            {/* <BasicTab></BasicTab> */}
        </div>
    );
};

export default ManageOffer;






