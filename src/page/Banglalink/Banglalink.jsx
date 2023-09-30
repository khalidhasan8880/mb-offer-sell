import { useEffect, useState } from "react";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import BasicTab from "../../components/BasicTab";
import Loading from "../../components/Loading";

const Banglalink = () => {
    const [banglalinkOffers, setBanglalinkOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useAuth()
useEffect(()=>{
    api.get(`/offer/bl?email=${user?.email}`)
    .then(res=>{
        setBanglalinkOffers(res.data)
        setLoading(false)
    })
},[user])

const internet = banglalinkOffers?.filter(offer=> offer?.offerType === 'internet')
const minute = banglalinkOffers?.filter(offer=> offer?.offerType === 'minute')
const combo = banglalinkOffers?.filter(offer=> offer?.offerType === 'combo')
if (loading) {
    return <Loading></Loading>
}
  return (
    <BasicTab minute={minute} internet={internet} combo={combo}></BasicTab>
  )
};

export default Banglalink;
