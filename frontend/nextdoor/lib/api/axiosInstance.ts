import axios from "axios";

const accessToken = localStorage.getItem('accessToken');

const axiosInstance2 = axios.create({
  baseURL: "http://k12e205.p.ssafy.io:8081",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  },

});

export default axiosInstance2;
