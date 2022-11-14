
import { useEffect, useState } from "react";
import React, { Component } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const useFectch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null)

   useEffect(() => {
    const abortCont = new AbortController();

      fetch(url, { signal: abortCont.signal })
        .then(respone => {

          if (!respone.ok) {
            throw Error("Error " +respone.status )
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
        });
        return () => abortCont.abort();
 }, [url]);
  return { data, isPending, error };
}

export default useFectch;