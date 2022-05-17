import axios from 'axios';

export const api = axios.create({
  // baseURL: process.env.NODE_ENV !== "development" ? "https://mythy.vercel.app/api" : "http://localhost:3000/api"
  baseURL: "http://localhost:3000/api"
})