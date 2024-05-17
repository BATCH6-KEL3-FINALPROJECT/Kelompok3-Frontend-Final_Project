import { useState } from "react";
import axios from "axios";

const useSend = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sendData = async (url, method, body = null, token = null) => {
    const BASE_URL = "http://localhost:3000";
    let data;

    try {
      setLoading(true);

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
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
      return data;
    }
  };
  return { loading, error, sendData };
};

export default useSend;
