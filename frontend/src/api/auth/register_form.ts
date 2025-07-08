import type { AxiosResponse } from "axios";
import {api} from "@/api/api"

interface AuthFormResponse{
    status: string,
    msg: string
}

export const authFormApi = {
    async checkEmailAvailible(email: string): Promise<Boolean>{
        try {
            const response = await api.get(`/auth/form/check-email?email=${encodeURIComponent(email)}`)
            console.log(response.data);
            
            return response.data.availible || false
        } catch (error) {
            console.log("Error checking email availibility:" + error);
            return false
        }
    },

    async checkUsernameAvailible(username: string): Promise<Boolean>{
        try {
            const response = await api.get(`/auth/form/check-username?username=${username}`)
            console.log(response.data);
            
            return response.data.availible || false
        } catch (error) {
            console.log("Error checking email availibility:" + error);
            return false
        }
    },

    async sendRegisterForm(username: string, email: string, password: string, passwordConfirm: string) {
        try {
            const response = await api.post('/auth/register', {username, email, password, passwordConfirm})

            console.log(response.data);
            

            return response.data
        } catch (error: any) {
            console.log("Error loggin in!");
            return {msg: error.response?.data?.msg || 'Something went wrong. Try again later.'}
        }
    }
}