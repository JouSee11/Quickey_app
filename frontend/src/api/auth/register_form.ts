import type { AxiosResponse } from "axios";
import {api} from "../api"

interface AuthFormResponse{
    status: string,
    msg: string
}

export const authFormApi = {
    async checkEmailAvailible(email: string): Promise<Boolean>{
        try {
            const response = await api.post('/auth/form/check-email', {email})
            console.log(response.data);
            
            return response.data.availible || false
        } catch (error) {
            console.log("Error checking email availibility:" + error);
            return false
        }
    },

    async checkUsernameAvailible(username: string): Promise<Boolean>{
        try {
            const response = await api.post('/auth/form/check-username', {username})
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

            return response.data.success || false
        } catch (error) {
            console.log("Error loggin in!");
            return false
        }
    }
}