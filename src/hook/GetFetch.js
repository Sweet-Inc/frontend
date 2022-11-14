
import { useEffect, useState } from "react";

const useFectch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)

  useEffect(() => {

      fetch(url)
        .then(respone => {

          if (!respone.ok) {
            throw Error("Error " +respone.status)
          }
          return respone.json();
        })
        .then(data => {
          //do sth with data
          setData(data);
          setIsPending(false);
          setError(null);
        }).catch(err => {
            setError(err.message)
            setIsPending(false);
        })
 }, [url]);
  return { data, isPending, error };
}

export default useFectch;