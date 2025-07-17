import axios, { type AxiosInstance } from 'axios'
const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://hdijos61ub.execute-api.us-east-1.amazonaws.com/dev/",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export default axiosInstance