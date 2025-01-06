import axios from "axios";

export const API = axios.create({
  baseURL: "https://prokarimi-blog-backend.vercel.app/",
  headers: {
    "Content-Type": "application/json",
  },
});
