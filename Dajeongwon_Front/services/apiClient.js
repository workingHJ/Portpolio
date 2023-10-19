import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:80",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
  },
  withCredentials: true,
});

export default apiClient;
