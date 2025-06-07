<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import {ref} from "vue"


// TODO: check if the user is logged in, using JWT????
const isLoggedIn = ref(false)

</script>

<template>
  <Navbar :is-logged-in="isLoggedIn" :username="'jousee453'"/>



  <RouterView />

  <Footer />
</template>

<style scoped>

</style>
