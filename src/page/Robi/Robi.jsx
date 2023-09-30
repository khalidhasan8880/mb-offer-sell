import { useEffect, useState } from "react";
import BasicTab from "../../components/BasicTab";
import api from "../../hooks/interceptors";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";

const Robi = () => {
  const [robiOffers, setRobiOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  useEffect(() => {
    api.get(`/offer/robi?email=${user?.email}`).then((res) => {
      setRobiOffers(res.data);
      setLoading(false);
    });
  }, [user]);
  const internet = robiOffers?.filter(
    (offer) => offer?.offerType === "internet"
  );
  const minute = robiOffers?.filter((offer) => offer?.offerType === "minute");
  const combo = robiOffers?.filter((offer) => offer?.offerType === "combo");
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <BasicTab minute={minute} internet={internet} combo={combo}></BasicTab>
  );
};

export default Robi;
