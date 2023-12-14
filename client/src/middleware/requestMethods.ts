import axios from "axios"

const BASE_URL = "http://localhost:5555/api"
const ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NzM3ZjkyYmYwMWIwNzgxMDZlOGEzNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwMjUxNzA2NSwiZXhwIjoxNzAyNzc2MjY1fQ.GMXkTK52DGVril5lL-A6LsInO-iKdTybrkw-CBJ0H20"

export const publicRequest = axios.create({
  baseURL: BASE_URL
})

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${ACCESS_TOKEN}`
  }
})