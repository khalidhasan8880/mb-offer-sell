import { useEffect, useState } from "react";
import api from "./interceptors";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        api.get(url).then((res) => {
          // if (!res.ok) {
          //     throw new Error("Network response was not ok");
          //   }
          setData(res.data);
          setIsLoading(false);
        });
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();

    // return () => {
    //     fetchData()
    // };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;
