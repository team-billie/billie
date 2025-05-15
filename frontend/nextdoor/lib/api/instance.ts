"use client";

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://k12e205.p.ssafy.io:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 전에 accessToken 붙이기
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default axiosInstance;