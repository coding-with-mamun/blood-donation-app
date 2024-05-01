import axios from "axios";

// create exios instance
const API = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 20000,
  withCredentials: true,
});

// export defult
export default API;
