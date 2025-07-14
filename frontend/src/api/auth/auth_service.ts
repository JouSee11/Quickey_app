import { authApi, type AuthResponse } from "./auth_token"

export interface AuthUser {
    id: string
    username: string
}

export class AuthService {
    private static readonly STORAGE_KEYS = {
        ACCESS_TOKEN: 'accessToken',
        REFRESH_TOKEN: 'refreshToken',
        USER: 'user'
    } as const

    //token management
    static saveAuthData(data: AuthResponse['data']): void {
        if (data) {
            localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, data.tokens.accessToken)
            localStorage.setItem(this.STORAGE_KEYS.REFRESH_TOKEN, data.tokens.refreshToken)
            localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(data.user))
        }
    }

    static getAccessToken(): string | null{
        return localStorage.getItem(this.STORAGE_KEYS.ACCESS_TOKEN)
    }

    static getRefreshToken(): string | null{
        return localStorage.getItem(this.STORAGE_KEYS.REFRESH_TOKEN)
    }

    static getUser(): AuthUser | null {
        const userStr = localStorage.getItem(this.STORAGE_KEYS.USER)
        return userStr ? JSON.parse(userStr) : null
    }

    static isLoggedIn(): boolean {
        return !!this.getAccessToken() && !!this.getUser()
    }

    static logout() {
        localStorage.removeItem(this.STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(this.STORAGE_KEYS.REFRESH_TOKEN)
        localStorage.removeItem(this.STORAGE_KEYS.USER)
    }

}