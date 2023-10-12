import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFetchAdmin = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const user = useSelector(state => state.user)
    useEffect(() => {
        const fetchData = async () => {
            if(url === '') return
            try {
                const res = await fetch('http://localhost:8081/api' + url, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + user.token
                    },
                })
                const result = await res.json()
                setError(false)
                setLoading(false);
                setData(result);
                console.log(data)
            } catch (err) {
                setError(true);
                setLoading(true);
            }
        };
        fetchData();
    }, [url]);

    return { data, loading, error };
};

export default useFetchAdmin;
