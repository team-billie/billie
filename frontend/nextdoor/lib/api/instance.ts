import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://k12e205.p.ssafy.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
