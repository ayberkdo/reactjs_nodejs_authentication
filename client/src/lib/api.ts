import axios, { type AxiosError, type AxiosResponse } from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const message =
      (error.response?.data as { message?: string })?.message ||
      "An error occurred";

    // Handle unauthorized access
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
      toast.error("Session expired. Please login again.");
      return Promise.reject(error);
    }

    // Handle other errors
    if (error.response?.status === 500) {
      toast.error("Internal server error. Please try again later.");
    } else {
      toast.error(message);
    }

    return Promise.reject(error);
  }
);

export default api;
