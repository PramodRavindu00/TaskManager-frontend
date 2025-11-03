import axios from "axios";

const SERVER_URL = import.meta.env.SERVER_URL ?? "http://localhost:5000";

const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});

export default api;
