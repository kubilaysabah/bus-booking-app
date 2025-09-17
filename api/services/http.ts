import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_API_URL || 'http://localhost:3000/api/';

const http = axios.create({
  baseURL,
  timeout: 1000,
});

export default http;
