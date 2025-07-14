<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { useAuth } from './composables/useAuth'
import { onMounted } from 'vue'
import { Toast, useToast } from 'primevue'

const {currentUser, isLoggedIn, initializeAuth} = useAuth()

// TODO: check if the user is logged in, using JWT????
// const isLoggedIn = ref(true)
const toast = useToast()

onMounted(async () => {
  const result = await initializeAuth()

  if (!result) {
    toast.add({severity: 'warn', summary: "Session expired", detail: "Your have been logged out for security reasons", life: 3000})    
  }
})

</script>

<template>
  <Toast/>
  <Navbar :is-logged-in="isLoggedIn" :username="currentUser?.username"/>


  <RouterView/>

  <Footer />
</template>

<style scoped>

</style>
