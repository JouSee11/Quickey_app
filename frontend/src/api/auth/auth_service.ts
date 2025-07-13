import type { IntervalHistogram } from "perf_hooks"
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

    static async initiateGoogleLogin(): Promise<AuthUser | null> {
        return this.performSSOLogin('/api/auth/sso/google')
    }

    static async initiateGitHubLogin(): Promise<AuthUser | null> {
        return this.performSSOLogin('/api/auth/sso/github')
    }

    private static async performSSOLogin(url: string): Promise<AuthUser | null> {
        return new Promise((resolve, reject) => {
            //open popup window for sso
            const popup = window.open(
                url,
                'sso-login',
                'width=400,height=600,scrollbar=yes,resizable=no'
            )

            if (!popup) {
                console.log("Popup blocked by browser");
                reject(new Error("popup rejected by browser"))
                return
            }

            let messageReceived = false
            let checkClosedInterval: number

            // Function to clean up and reject
            const cleanup = (error: string) => {
                if (messageReceived) return // Don't reject if we already got a message
                
                clearInterval(checkClosedInterval)
                window.removeEventListener('message', messageListener)
                console.log('SSO popup cleanup:', error)
                reject(new Error(error))
            }

            // Check if popup is closed - but with better logic
            checkClosedInterval = setInterval(() => {
                try {
                    // Only check if popup is truly closed and we haven't received a message
                    if (popup.closed && !messageReceived) {
                        cleanup("SSO login cancelled")
                    }
                } catch (error) {
                    // Cross-origin errors during OAuth flow are normal
                    // Don't treat them as the popup being closed
                    console.log('Cross-origin check (normal during OAuth):', error)
                }
            }, 2000) // Check less frequently

            //check for successfull login
            const messageListener = (event: MessageEvent) => {
                //only accept messages form smae origin - SECURITY
                if (event.origin !== window.location.origin) return

                if ( event.data.type === 'SSO_SUCCESS') {
                    clearInterval(checkClosedInterval)
                    window.removeEventListener('message', messageListener)
                    popup.close()
                    //save the auth data
                    this.saveAuthData(event.data.authData)
                    resolve(event.data.authData.user)
                } else {
                    clearInterval(checkClosedInterval)
                    window.removeEventListener('message', messageListener)
                    popup.close()
                    reject(new Error(event.data.error))
                }
            }

            window.addEventListener('message', messageListener)
        })
    }

    static logout() {
        localStorage.removeItem(this.STORAGE_KEYS.ACCESS_TOKEN)
        localStorage.removeItem(this.STORAGE_KEYS.REFRESH_TOKEN)
        localStorage.removeItem(this.STORAGE_KEYS.USER)
    }

    // static async refreshToken(): Promise<boolean> {
    //     try {
    //         const refreshToken = this.getRefreshToken()
    //         if (!refreshToken) return false

    //         const response = await authApi.refreshToken(refreshToken)
    //         if (response.status === 'success' && response.data) {
    //             localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, response.data.accessToken)
    //             return true
    //         }
    //         return false
    //     } catch (error) {
    //         console.error("Error refreshing access token")
    //         return false
    //     }
    // }
}