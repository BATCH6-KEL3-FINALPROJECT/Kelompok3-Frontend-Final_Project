import { useState } from "react";
import axios from "axios";

const useSend = () => {
  const [loading, setLoading] = useState(false);

  const sendData = async (
    url,
    method,
    body = null,
    token = null,
    json = false,
    formData = false
  ) => {
    const BASE_URL = "https://airline.azkazk11.my.id";
    let data = null,
      message = null,
      statusCode = null;

    try {
      setLoading(true);

      const headers = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      if (json) {
        headers["Content-Type"] = "application/json";
      }

      if (formData) {
        headers["Content-Type"] = "multipart/form-data";
      }

      const response = await axios({
        method,
        url: `${BASE_URL}${url}`,
        data: body,
        headers,
      });

      data = response.data;
      statusCode = response.status;
      message = response.data.message;
    } catch (err) {
      statusCode = err.response.status || 500;
      message =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
    } finally {
      setLoading(false);
    }

    return { data, message, statusCode };
  };

  return { loading, sendData };
};

export default useSend;
