import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState([]);

  // 5 - refatorando post
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(false);

  // 6 - loading
  const [loading, setLoading] = useState(false);

  // 7 - tratando erros
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // 6 - loading
      setLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setData(json);
      } catch (error) {
        setError("Houve um erro ao carregar os dados.");
      }
      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    if (method === "POST") {
      const httpRequest = async () => {
        const res = await fetch(url, config);
        const newItem = await res.json();
        setData((prevData) => [...prevData, newItem]);
      };
      httpRequest();
    }
  }, [config, method, url]);

  return { data, httpConfig, loading, error };
};
