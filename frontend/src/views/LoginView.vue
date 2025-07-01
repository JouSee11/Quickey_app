<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const resolver = zodResolver

const usernameValue = ref(null)
const passValue = ref(null)

const onFormSubmit = () => {

}

</script>


<template>
    <div class="form-cont box-shadow-normal">
        <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit" class="form-element">
            <div class="form-header">
                <Icon icon="mdi:user" class="icon-header" />
                <span class="header-text">Login</span>
            </div>
            
            <div class="form-inputs">
                <FloatLabel variant="out">
                    <InputText id="username" v-model="usernameValue" class="form-input"></InputText>
                    <label for="username" class="input-label">Username or email</label>
                </FloatLabel>

                <FloatLabel variant="out">
                    <Password id="password" v-model="passValue" class="form-input" :feedback="false"></Password>
                    <label for="password" class="input-label">Password</label>
                </FloatLabel>
            </div>

            <div class="login-register-cont">
                <span>Don't have account? <RouterLink to="register">Register</RouterLink></span>
                <Button
                    label="Log in"
                    icon="pi pi-sign-in"
                    outlined
                    rounded
                    class="log-in-button"
                />
            </div>

            <div class="sso-buttons">
                <a><Icon icon="ri:google-fill" class="sso-icon" /></a>
                <a><Icon icon="mdi:github" class="sso-icon"/></a>
            </div>
        </Form>

    </div>

</template>


<style scoped>
.form-cont{
    width: 700px;
    height: 400px;
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