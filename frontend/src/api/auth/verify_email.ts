import {api} from '@/api/api'

export const emailVerifyApi = {
    async verifyEmail(token: string): Promise<boolean> {
        try {
            const response = await api.post('/auth/register-verify', {token})

            return response.data.valid
        } catch (error) {
            console.log(error);
            return false
        }
    }
}