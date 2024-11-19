import axios from "axios";

export const API = axios.create({
  baseURL: "https://prokarimi-blog-backend.onrender.com/api",
});
