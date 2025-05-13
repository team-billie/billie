import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://k12e205.p.ssafy.io:8081",
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
