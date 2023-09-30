import { useEffect, useState } from "react";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import BasicTab from "../../components/BasicTab";
import Loading from "../../components/Loading";

const Airtel = () => {
    const [airtelOffers, setAirtelOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useAuth()
useEffect(()=>{
    api.get(`/offer/airtel?email=${user?.email}`)
    .then(res=>{
        setAirtelOffers(res.data)
        setLoading(false)
    })
},[user])
const internet = airtelOffers?.filter(offer=> offer?.offerType === 'internet')
const minute = airtelOffers?.filter(offer=> offer?.offerType === 'minute')
const combo = airtelOffers?.filter(offer=> offer?.offerType === 'combo')

if (loading) {
    return <Loading></Loading>
}
  return (
    <BasicTab minute={minute} internet={internet} combo={combo}></BasicTab>
  )
};

export default Airtel;