import { useEffect, useState } from "react";

function useFetch(api_func) {
   const [data, setData] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   useEffect(() => {
      setLoading(true);
      api_func()
         .then((response) => {
            setData(response);
         })
         .catch((err) => {
            setError(err);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);

   const refetch = () => {
      setLoading(true);
      api_func
         .then((response) => {
            setData(response);
         })
         .catch((err) => {
            setError(err);
         })
         .finally(() => {
            setLoading(false);
         });
   };

   return { data, loading, error, refetch };
}

export default useFetch;
