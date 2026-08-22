import axios from "axios";
import { getData } from "@/lib/localStorage";

const apiClient = axios.create({
  baseURL: "https://ecomapi.appbyte.net/web/",
  withCredentials: true,
  headers: {
    "X-Client-Type": "mobile",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(async (config) => {
  const token = await getData("@user_token");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: token,
    };
  }

  return config;
});

export const getApi = async (endpoint, query) => {
  try {
    const response = await apiClient.get(endpoint, { params: query });
    return response.data;
  } catch (error) {
    console.error("GET API Error:", error);
    throw error;
  }
};

export const postApi = async (endpoint, data, config = {}) => {
  try {
    const requestConfig = { ...config };
    if (data instanceof FormData) {
      requestConfig.headers = {
        ...(requestConfig.headers || {}),
        "Content-Type": "multipart/form-data",
      };
    }
    const response = await apiClient.post(endpoint, data, requestConfig);
    return response.data || {};
  } catch (error) {
    console.error("POST API Error:", error.response?.data?.error);
    throw (
      error.response?.data?.error ||
      error.message ||
      "An unknown error occurred"
    );
  }
};

export const putApi = async (endpoint, data) => {
  try {
    const config = {};
    if (data instanceof FormData) {
      config.headers = {
        "Content-Type": "multipart/form-data",
      };
    }
    const response = await apiClient.put(endpoint, data, config);
    return response.data || {};
  } catch (error) {
    console.error("PUT API Error:", error);
    throw (
      error.response?.data?.message ||
      error.message ||
      "An unknown error occurred"
    );
  }
};

export const deleteApi = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data || {};
  } catch (error) {
    console.error("DELETE API Error:", error);
    throw error;
  }
};
