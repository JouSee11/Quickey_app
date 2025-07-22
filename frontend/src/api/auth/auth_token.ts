import {api} from '@/api/api'
import axios from 'axios'

export interface AuthResponse{
    status: string
    msg: string
    data: {
        user: {
            id: string
            username: string
            role: string
        }
        tokens: {
            accessToken: string
            refreshToken: string
            tokenType: string
        }
    }
}

export const authApi = {
    async refreshToken(refreshToken: string) {
        //uses axios to prevert axios loop with automatic token refresh
        const response = await axios.post('/api/auth/refresh-token', {refreshToken})

        return response.data
    },

    async googleSSO(credential: string) {
        
        const response = await api.post('/auth/sso/google/verify', {credential})
        return response.data
    }

}