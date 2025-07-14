import { api } from "@/api/api";
import { AuthService, type AuthUser } from "@/api/auth/auth_service";
import { ref, computed } from "vue";

const currentUser = ref<AuthUser | null>(null)
const isAuthLoading = ref(false)

export function useAuth() {
    const isLoggedIn = computed(() => !!currentUser.value)

    const initializeAuth = async (): Promise<boolean> => {
        isAuthLoading.value = true

        try {
            //check if there is a access token if it is valid
            if (AuthService.getAccessToken()) {
                const response = await api.get('/auth/validate-token')
                if (response.data.valid) {
                    currentUser.value = response.data.user
                } else {
                    logout()
                    return false
                }
            }
            return true
        } catch (error) {
            console.log("Error not provided");
            logout()

            return false
        } finally {
            isAuthLoading.value = false
        }
    }

    const setCurrentUser = (user: AuthUser) => {
        currentUser.value = user
    }

    const logout = () => {
        AuthService.logout()
        currentUser.value = null
    }


    return {
        currentUser: computed(() => currentUser.value),
        isLoggedIn,
        isAuthLoading: computed(() => isAuthLoading.value),
        initializeAuth,
        setCurrentUser,
        logout
    }
}