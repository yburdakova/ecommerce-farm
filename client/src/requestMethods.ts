import axios from "axios";

const BASE_URL = "http://localhost:5555/server/";
const TOKEN ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzM3ZjkyYmYwMWIwNzgxMDZlOGEzNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMzgwMTYzMSwiZXhwIjoxNzA0MDYwODMxfQ.Aoke8fRpZbLdA9OqsQUmYzMZgBjhC41IouU-0meWRQI";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { 
    Authorization: `Bearer ${TOKEN}`
  },
});