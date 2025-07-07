<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { emailVerifyApi } from '@/api/auth/verify_email';
import { useRoute } from 'vue-router';
import { Icon } from '@iconify/vue';

const route = useRoute();

const verified = ref(false);
const isLoading = ref(true); // Add loading state
const token = route.query.token as string;

onBeforeMount(async () => {
    try {
        verified.value = await emailVerifyApi.verifyEmail(token);
    } catch (error) {
        console.error('Verification error:', error);
        verified.value = false;
    } finally {
        isLoading.value = false; // Set loading to false when done
    }
});

</script>

<template>
    <div class="verify-status box-shadow-normal">
        <!-- Loading State -->
        <div v-if="isLoading" class="cont-header loading">
            <h2>Verifying email...</h2>
            <Icon icon="material-symbols:hourglass-empty" class="icon-header loading-icon"/>
        </div>

        <!-- Success State -->
        <div v-else-if="verified" class="cont-header success">
            <h2>Registration Successful</h2>
            <Icon icon="material-symbols:check" class="icon-header"/>
        </div>

        <!-- Error State -->
        <div v-else class="cont-header error">
            <h2>Registration Failed</h2>
            <Icon icon="material-symbols:error-outline" class="icon-header"/>
        </div>

        <div class="separator"></div>

        <div class="cont-content">
            <!-- Loading Content -->
            <p v-if="isLoading" class="loading-text">
                Please wait while we verify your email address...
            </p>

            <!-- Success Content -->
            <p v-else-if="verified">
                Your <span class="highlighted">email has been verified</span>, your account is now active.
            </p>
            
            <!-- Error Content -->
            <p v-else>
                <span class="highlighted">Registration link is invalid or expired</span>, please try your registration again.
            </p>
            
            <!-- Success Button -->
            <Button
                v-if="verified && !isLoading"
                outlined
                class="login-button success"
                size="large"
                rounded
            >
                <router-link to="/login">
                    Login
                </router-link>
                <i class="pi pi-sign-in"/>
            </Button>

            <!-- Error Button -->
            <Button
                v-if="!verified && !isLoading"
                outlined
                class="login-button error"
                size="large"
                rounded
            >
                <router-link to="/register">
                    Register
                </router-link>
                <i class="pi pi-user-plus"/>
            </Button>
        </div>
    </div>
</template>

<style scoped>
.highlighted{
    font-weight: bold;
    color: var(--primary-0);
}

.success{
    color: var(--green-bright);
}

.error{
    color: var(--red-vivid);
}

.loading{
    color: var(--blue-vivid);
}

.loading-icon{
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.loading-text{
    color: var(--blue-vivid);
    font-style: italic;
}

.verify-status{
    background-color: var(--blue-dark);
    border-radius: var(--border-rad-main);
    width: 600px;
    height: 300px;
    padding: 30px 20px;
}

.cont-header{
    display: flex;
    justify-content: center;
    align-items: center;
}

.cont-header h2{
    font-size: var(--big-title-text);
}

.icon-header{
    width: 50px;
    height: 50px;
    margin-left: 10px;
}

.separator{
    align-self: center;
    width: 100%;
    height: 2px;
    background-color: var(--gray-main);
    margin: 20px 0
}

.cont-content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.cont-content p{
    text-align: center;
    margin-bottom: 20px;
    font-size: var(--bigger-text);
    color: var(--gray-bright);
}

.login-button{
    width: 150px;
    margin-top: 25px;
}

.login-button a{
    text-decoration: none;
    color: inherit
}
</style>