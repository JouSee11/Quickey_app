<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const router = useRouter()
const {logout} = useAuth()
const username = ref()

const logoutUser = () => {
    logout()
    router.push('/login')
}

onMounted(() => {
    username.value = JSON.parse(localStorage.getItem("user") as string).username 
})

</script>

<template>
    <h1>{{username}}</h1>
    <Button
    variant="outlined"
    severity="danger"
    label="logout"
    icon="pi pi-times"
    @click="logoutUser"
    />

</template>

<style scoped></style>