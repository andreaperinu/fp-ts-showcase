import axios, { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  baseURL: 'https://dog.ceo/api/',
  headers: { 'content-type': 'application/json' },
})

export default instance
