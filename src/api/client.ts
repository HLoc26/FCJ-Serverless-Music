import { fetchAuthSession } from 'aws-amplify/auth'
import axios, { type AxiosInstance } from 'axios'
const axiosInstance: AxiosInstance = axios.create({
    baseURL: "https://9hf7bqp6d8.execute-api.us-east-1.amazonaws.com/dev/",
    // baseURL: "http://localhost:3000/api/",
    headers: {
        "Content-Type": "application/json"
    },
})

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const session = await fetchAuthSession()
            const token = session.tokens?.idToken?.toString()
            config.headers.Authorization = `Bearer ${token}`
        } catch (error) {
            console.log('No valid session')
        }

        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)
export default axiosInstance