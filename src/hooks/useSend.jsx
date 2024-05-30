import { useState } from "react";
import axios from "axios";

const useSend = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statusCode, setStatusCode] = useState(null);

  const sendData = async (url, method, body = null, token = null) => {
    const BASE_URL = "http://airline.azkazk11.my.id";
    let data = null;

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

      data = response.data;
      setStatusCode(response.status);
    } catch (error) {
      setError(error.response.data.message);
      setStatusCode(error.response);
    } finally {
      setLoading(false);
    }

    return data;
  };

  return { loading, error, statusCode, sendData };
};

export default useSend;
