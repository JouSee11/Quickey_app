<script setup lang="ts">
import logoBeta from "@/assets/images/icons/logo-beta.svg"
import { ref, onMounted } from "vue"
import { Icon } from '@iconify/vue'
import {RouterLink, useRoute} from 'vue-router'

//get if the user is logged in from the parrent
const props = defineProps<{
    isLoggedIn: boolean
    username?: string
}>()

//check on which page are we

const route = useRoute();
const isActiveLink = (routePath: String) => {
    return route.path === routePath;
}

</script>

<template>
    <header>
        <nav id="main-nav">
            <RouterLink to="/"><img :src="logoBeta" alt="logo" id="navigation-logo"></RouterLink>

            <div id="navigation-links">
                
                <RouterLink 
                to="/"
                :class="[isActiveLink('/') ? 'activeLink' : 'inactiveLink']"
                >Home</RouterLink>
                <RouterLink
                to="/discover"
                :class="[isActiveLink('/discover') ? 'activeLink' : 'inactiveLink']"
                >Discover</RouterLink>
                <RouterLink 
                to="/about"
                :class="[isActiveLink('/about') ? 'activeLink' : 'inactiveLink']"
                >About</RouterLink>
            </div>
            
            <Button
                variant="outlined"
                id="login-button-nav"
            >
                <RouterLink v-if="isLoggedIn" to="/profile">
                    <Icon icon="iconamoon:profile-fill" class="icon-nav" />
                    {{ username }}
                </RouterLink>
                <RouterLink v-else to="/login">
                    <Icon icon="material-symbols:login-rounded" class="icon-nav"/>
                    Login
                </RouterLink>
            </Button>
        </nav>
    </header>
</template>

<style scoped>
#main-nav{
    position: absolute;
    width: 100%;
    height: 70px;
    top: 0;
    left: 0;
    padding: 40px 40px 0 40px;
    display: flex;
    justify-content: left;
    align-items: center;
    /* background-color: var(--blue-dark); */
}

#main-nav:hover #navigation-logo{
    filter: grayscale(0) drop-shadow(0 0 20px rgba(17, 48, 121, 0.363));
}


#navigation-logo{
    width: 60px;
    height: 60px;
    cursor: pointer;
    filter: grayscale(1);
    transition: all 0.2s ease-in-out;
}

#navigation-links{
    display: flex;
    align-items: center;
    margin-left: 50px;
}

#navigation-links a {
    text-decoration: none;
    font-size: var(--normal-text);
    text-transform: uppercase;
    color: var(--gray-main);
    margin-right: 30px;
    transition: all 0.1s ease-in-out;
}

#navigation-links a:hover{
    color: var(--primary-0) !important;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.418);
}

#login-button-nav{
    color: var(--gray-main);
    margin-left: auto;
}

#login-button-nav a{
    text-decoration: none;
    color: var(--gray-main);
}
#login-button-nav:hover a{
    text-decoration: none;
    color: var(--primary-1000);
}

.activeLink{
    color: var(--primary-50) !important;
}

@media (max-width: 800px){
    #navigation-logo{
        display: none;
    }

    #navigation-links{
        width: 100%;
    }
}
</style>