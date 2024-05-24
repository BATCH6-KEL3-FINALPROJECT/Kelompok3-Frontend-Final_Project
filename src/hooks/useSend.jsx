import { useState } from "react";
import axios from "axios";

const useSend = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const sendData = async (url, method, body = null, token = null) => {
    const BASE_URL = "http://airline.azkazk11.my.id";
    let data;

    try {
      setLoading(true);
      setError(null);
      setStatusCode(null);

      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data: body,
        headers,
      });
      data = await response.data;
      setStatusCode(response.status);
    } catch (error) {
      setError(error);
      setStatusCode(error.response.status);
    } finally {
      setLoading(false);
      return data;
    }
  };

  return { loading, error, statusCode, sendData };
};

export default useSend;
