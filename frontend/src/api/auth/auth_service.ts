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

            let cleanupCalled = false
            const cleanup = (error?: string) => {
                if (cleanupCalled) return;
                cleanupCalled = true;
                window.removeEventListener('message', messageListener);
                if (timeoutId) clearTimeout(timeoutId);
                if (popup && !popup.closed) popup.close();
                if (error) {
                    console.log('SSO login failed:', error);
                    reject(new Error(error));
                }
            };

            const timeoutId = setTimeout(() => cleanup('SSO login timed out.'), 60000); // 1 minute timeout

            //check for successfull login
            const messageListener = (event: MessageEvent) => {
                //only accept messages form smae origin - SECURITY
                // if (event.origin !== window.location.origin) return
                console.log("event recieved");
                

                if ( event.data.type === 'SSO_SUCCESS') {
                    //save the auth data
                    this.saveAuthData(event.data.authData)
                    resolve(event.data.authData.user)
                    cleanup()
                } else {
                    reject(new Error(event.data.error))
                    cleanup()
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