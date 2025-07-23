import { AuthService } from "@/api/auth/auth_service";
import { authApi } from "@/api/auth/auth_token";
import { useAuth } from "./useAuth";
import { useRouter } from "vue-router";
import { useToast } from "primevue";

export function useGoogleLogin () {
    const {setCurrentUser} = useAuth()
    const router = useRouter()
    const toast = useToast()

    const handleGoogleSuccess = async (response: any): Promise<boolean> => {
        try {
            const result = await authApi.googleSSO(response.credential)

            if (result.status === 'success') {
                AuthService.saveAuthData(result.data)
                setCurrentUser(result.data.user)
                router.push("/profile")

                return true
            } else {
                toast.add({
                    severity: 'error',
                    summary: "Login failed",
                    detail: "Google login failed",
                    life: 3000
                })
                return false
            }
        } catch (error) {
            toast.add({ 
                severity: 'error', 
                summary: 'Login error', 
                detail: 'Please try again later', 
                life: 3000 
            })

            return false
        }
    }

    const handleGoogleError = () => {
        toast.add({ 
            severity: 'error', 
            summary: 'Google login failed', 
            detail: 'Try google login later', 
            life: 3000 
        })
    }

    return {handleGoogleSuccess, handleGoogleError}
}