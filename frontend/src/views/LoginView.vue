<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { authApi } from '@/api/auth/auth_token';
import { AuthService } from '@/api/auth/auth_service';
import { useRouter } from 'vue-router';
import { useToast } from 'primevue';
import { z } from 'zod' 
import { authFormApi } from '@/api/auth/auth_form'; 
import { useGoogleLogin } from '@/composables/useGoogleLogin';

const router = useRouter()
const toast = useToast()

const isSubmitting = ref(false)


const resolver = zodResolver(
    z.object({
        username: z.string().trim().min(1, "Username is requiered"),
        password: z.string().min(1, "Password is requiered")
    })
)

const onFormSubmit = async ({valid, values, reset}: {valid: boolean, values: any, reset: () => void}) => {
    if (!valid) return 

    isSubmitting.value = true

    try {
        const result = await authFormApi.sendLoginForm(values.username, values.password)

        if (result.status === 'success') {
            AuthService.saveAuthData(result.data)

            setCurrentUser(result.data.user)
            router.push("/profile")
        } else {
            toast.add({
                severity: "error",
                summary: "Login failed",
                detail: result.msg,
                life: 3000
            })
        }
    } catch (error) {
        toast.add({
            severity: "error",
            summary: "Login failed",
            detail: "Internal server error. Try again later.",
            life: 3000
        })
    } finally {
        isSubmitting.value = false
    }
}

// loggins 
const {setCurrentUser} = useAuth()
const {handleGoogleSuccess, handleGoogleError} = useGoogleLogin()



// const handleGoogleSuccess = async (response: any) => {
//     try {
//         const result = await authApi.googleSSO(response.credential)

//         if (result.status === 'success') {
//             //save auth data
//             AuthService.saveAuthData(result.data)

//             setCurrentUser(result.data.user)
//             router.push("/profile")
//         } else {
//             toast.add({
//                 severity: 'error',
//                 summary: "Login failed",
//                 detail: "Google login failed",
//                 life: 3000
//             })
//         }
//     } catch (error: any) {
//         console.log(error.message);
        
//         toast.add({ 
//             severity: 'error', 
//             summary: 'Login error', 
//             detail: 'Please try again later', 
//             life: 3000 
//         })
//     }
// }

// const handleGoogleError = () => {
//         toast.add({ 
//             severity: 'error', 
//             summary: 'Google login failed', 
//             detail: 'Try google login later', 
//             life: 3000 
//         })
// }

</script>


<template>
    <div class="form-cont box-shadow-normal">
        <Toast/>
        <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit" class="form-element" :validateOnBlur="true">
            <div class="form-header">
                <Icon icon="mdi:user" class="icon-header" />
                <span class="header-text">Login</span>
            </div>
            
            <div class="form-inputs">

                <FloatLabel variant="out">
                    <InputText id="username" name="username" class="form-input"/>
                    <label for="username" class="input-label">Username or email</label>
                </FloatLabel>


                <FloatLabel variant="out">
                    <Password id="password" name="password" class="form-input" :feedback="false"></Password>
                    <label for="password" class="input-label">Password</label>
                </FloatLabel>
            </div>

            <div class="login-register-cont">
                <span>Don't have account? <RouterLink to="register">Register</RouterLink></span>
                <Button
                    label="Log in"
                    type="submit"
                    icon="pi pi-sign-in"
                    outlined
                    rounded
                    class="log-in-button"
                />
            </div>

            <div class="sso-buttons">
                <GoogleLogin 
                    :callback="handleGoogleSuccess"
                    :error="handleGoogleError"
                    :buttonConfig="{type: 'normal',theme: 'normal', size: 'medium', text: 'continue_with', shape: 'pill'}"

                />
                <!-- <a><Icon icon="ri:google-fill" class="sso-icon" /></a> -->
                <!-- <a><Icon icon="mdi:github" class="sso-icon"/></a> -->
            </div>
        </Form>

    </div>

</template>


<style scoped>
.form-cont{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;
    height: 450px;
    border-radius: var(--border-rad-bigger);
    background-color: var(--blue-dark);
    
}

.form-element{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 50px;
}

/* ====== header ======== */
.form-header{
    display: flex;
    align-items: center;
    justify-content: left;
    width: 100%;
}

.icon-header{
    width: 70px;
    height: 70px;
    color: var(--gray-bright);
}

.header-text{
    font-size: 3em;
    font-weight: bold;
}


/* ======= inputs ========== */
.form-inputs{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 50px;
    width: 100%;
    height: 110px;
}

.form-input{
    width: 100%;
}
:deep(input){
    width: 100% !important;
    background-color: var(--primary-800);
}

.input-label{
    color: var(--gray-bright);
}

.login-register-cont{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 20px;
}

.log-in-button{
    /* color: var(--blue-vivid); */
    color: var(--green-bright);
}

.error-msg{
    margin-right: auto;
    font-size: var(--smaller-text);
    color: var(--red-vivid);
}

.sso-buttons{
    margin-top: 10px;
    width: 100%;
}

.sso-icon{
    width: 40px;
    height: 40px;
    margin-right: 20px;
    color: var(--gray-main);
    transition: 0.2s all ease-in-out;
    cursor: pointer;
}

.sso-icon:hover{
    color: var(--primary-0);
}


</style>