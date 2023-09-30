import { useEffect, useState } from "react";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import BasicTab from "../../components/BasicTab";
import Loading from "../../components/Loading";

const GrameenPhone = () => {
    const [grameenphoneOffers, setGrameenphoneOffers] = useState([])
    const [loading, setLoading] = useState(true)
    const {user} = useAuth()
useEffect(()=>{
    api.get(`/offer/gp?email=${user?.email}`)
    .then(res=>{
        console.log(res.data);
        setGrameenphoneOffers(res.data)
        setLoading(false)
    })
},[user])
const internet = grameenphoneOffers?.filter(offer=> offer?.offerType === 'internet')
const minute = grameenphoneOffers?.filter(offer=> offer?.offerType === 'minute')
const combo = grameenphoneOffers?.filter(offer=> offer?.offerType === 'combo')
if (loading) {
    return <Loading></Loading>
}
  return (
    <BasicTab minute={minute} internet={internet} combo={combo}></BasicTab>
  )
};

export default GrameenPhone;