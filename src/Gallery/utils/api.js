import axios from "axios";

const api =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3001/api";

const instance = axios.create({
  baseURL: api
});

export default instance;
