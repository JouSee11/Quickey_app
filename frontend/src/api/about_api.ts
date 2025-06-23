import {api} from "./api"

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
    } 
}