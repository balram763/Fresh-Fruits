import axios from "axios";
import { useEffect, useState } from "react";

function useFetch(url){
    const [data,setData] = useState(null)
    const [loading,setLoading] = useState(true)
    const [isError,setIsError] = useState(null)

    async function fetchApi(url){
        try {
            setLoading(true)
            const response = await axios.get(url)
            setData(response.data)
        } catch (error) {
            setIsError(error.message)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchApi(url)
    },[url])

    return {data,loading,isError}
}

export default useFetch