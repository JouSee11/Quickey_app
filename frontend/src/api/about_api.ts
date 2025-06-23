import type { AxiosResponse } from "axios";
import {api} from "./api"

interface EmailAboutResponse{
    status: string,
    msg: string
}

export const aboutApi = {
    async checkEmailExists(email: string): Promise<Boolean>{
        try {
            const response = await api.post('/about/check-email', {email})
            console.log(response.data);
            
            return response.data.exists || false
        } catch (error) {
            console.log("Error checking email availibility:" + error);
            return false
        }
    },
    
    async sendEmailAbout(email: string, findMethod: string): Promise<EmailAboutResponse> {
        try {
            const response = await api.post('/about/save-email', {email, findMethod})
            console.log(response.data);

            return response.data
            
        } catch (error) {
            return {status: "error", msg: "Something went wrong"}
        }
    }
}