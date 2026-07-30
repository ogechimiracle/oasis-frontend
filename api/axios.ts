import axios from "axios"


const api = axios.create({
      baseURL: "http://localhost:5000/api",
    //  baseURL: "https://api.oasisintech.com/api", 
    //  baseURL: "https://oasis-backend-hqcx.onrender.com/api"
});

// attached the jwt in every request sends from frontend
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  // Don't set Content-Type for FormData - let browser handle it
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export default api