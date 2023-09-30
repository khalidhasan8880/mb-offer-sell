import { useEffect, useState } from "react";
import BasicTab from "../../components/BasicTab";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const Teletalk = () => {
    const [teletalkOffers, setTeletalkOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useAuth()
useEffect(()=>{
    api.get(`/offer/teletalk?email=${user?.email}`)
    .then(res=>{
        console.log(res.data);
        setTeletalkOffers(res.data)
        setLoading(false)
    })
},[user])
    

    const internet = teletalkOffers?.filter(offer=> offer?.offerType === 'internet')
    const minute = teletalkOffers?.filter(offer=> offer?.offerType === 'minute')
    const combo = teletalkOffers?.filter(offer=> offer?.offerType === 'combo')
    if (loading) {
        return <Loading></Loading>
    }
      return (
        <BasicTab minute={minute} internet={internet} combo={combo}></BasicTab>
      )
};

export default Teletalk;