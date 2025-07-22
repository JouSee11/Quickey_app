import axios from "axios";
import { authApi } from "./auth/auth_token";

export const api = axios.create({
    baseURL: '/api'
})


//add auth token to header with each request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

//handle token refresh automaticlly
api.interceptors.response.use(
    (response) => {
        return response // if there is not error dont do anything
    },
    async (error) => {
        const originalRequest = error.config // get the original reqest that produced the error

        //if token is expired and we havent tryed tried to refresh
        if (error.response?.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem("refreshToken")
                if (!refreshToken) {throw new Error("No refresh token")}

                // try to refresh the token
                const refreshResponse = await authApi.refreshToken(refreshToken)

                if (refreshResponse.status === 'success') {                    
                    localStorage.setItem('accessToken', refreshResponse.data.accessToken) // store new token
                    localStorage.setItem('refreshToken', refreshResponse.data.refreshToken) // store new token

                    //send the orignal requst with correct auth headers
                    originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`

                    return api(originalRequest)
                }
            } catch (error) {                
                //refresh failed
                console.log("Token refresh failed");
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                localStorage.removeItem('user')

                //go back to login
                window.location.href = '/login'
                return Promise.reject(error)

                
            }
        }
        return Promise.reject(error)
    }
)