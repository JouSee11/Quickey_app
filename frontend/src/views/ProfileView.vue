<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';
import { AuthService } from '@/api/auth/auth_service';
import ProfileMenu from '@/components/profile/ProfileMenu.vue'

const router = useRouter()
const {logout} = useAuth()
const user = AuthService.getUser()

const logoutUser = () => {
    logout()
    router.push('/login')
}

// onMounted(() => {
//     user?.username = JSON.parse(localStorage.getItem("user") as string).username 
// })

</script>

<template>
    <div class="profile-layout">
        <ProfileMenu class="left-menu"/>
        <div class="content-area">
        </div>
    </div>

</template>

<style scoped>
.profile-layout{
    display: flex;
    flex-direction: column;
    width: 95vw;
    height: 85%;
    background-color: var(--blue-dark);
    border-radius: var(--border-rad-main);
    border: 1px var(--primary-800) solid;
    overflow: hidden;
}




</style>