import axios from "axios"

const BASE_URL = "http://localhost:5555/api"

export const publicRequest = axios.create({
  baseURL: BASE_URL
})

export const userRequest = (token: string | undefined) => axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`
  }
})