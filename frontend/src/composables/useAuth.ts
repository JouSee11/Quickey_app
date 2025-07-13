import { AuthService, type AuthUser } from "@/api/auth/auth_service";
import { ref, computed } from "vue";

const currentUser = ref<AuthUser | null>(null)
const isAuthLoading = ref(false)

export function useAuth() {
    const isLoggedIn = computed(() => !!currentUser.value)

    const initializeAuth = async () => {
        isAuthLoading.value = true

        try {
            const storedUser = AuthService.getUser()
            if (storedUser && AuthService.isLoggedIn()) {
                currentUser.value = storedUser
                console.log("user restored form localStorage");
            }
        } catch (error) {
            console.log("Error init auth");
        } finally {
            isAuthLoading.value = false
        }
    }

    const loginWithGoogle = async () => {
        try {
            const user = await AuthService.initiateGoogleLogin()
            if (user) {
                currentUser.value = user
                console.log('Google login successful:', user.username)
                return true
            }
            return false
        } catch (error) {
            console.error('Google login failed:', error)
            return false
        }
    }

    // const loginWithGithub = async () => {
    //     try {
    //         const user = await AuthService.initiateGitHubLogin()
    //         if (user) {
    //             currentUser.value = user
    //             console.log('GitHub login successful:', user.username)
    //             return true
    //         }
    //         return false
    //     } catch (error) {
    //         console.error('GitHub login failed:', error)
    //         return false
    //     }
    // }

    // const logout = () => {
    //     AuthService.logout()
    //     currentUser.value = null
    // }


    return {
        currentUser: computed(() => currentUser.value),
        isLoggedIn,
        isAuthLoading: computed(() => isAuthLoading.value),
        initializeAuth,
        loginWithGoogle,
        // loginWithGithub,
        // logout
    }
}