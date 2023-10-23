import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:8081/api" + url);
        const result = await res.json();
        setError(false);
        setLoading(false);
        setData(result);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error, setData };
};

export default useFetch;
