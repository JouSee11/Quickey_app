<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import {ref} from "vue"
import { getOS } from './utils'
import UnsupportedScreen from './components/UnsupportedScreen.vue'
import { useScreenSize } from './composables/useScreenSize'


// TODO: check if the user is logged in, using JWT????
// const isLoggedIn = ref(true)

</script>

<template>
  <Navbar :is-logged-in="false"/>


  <RouterView/>

  <Footer />
</template>

<style scoped>

</style>
