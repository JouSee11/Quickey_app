<script setup lang="ts">
import { RouterLink } from "vue-router"
import mainLogo from "@/assets/images/icons/main-logo.svg"
import { ref, onMounted } from "vue"

//get if the user is logged in from the parrent
const props = defineProps<{
    isLoggedIn: boolean
}>()

</script>

<template>
    <header>
        <nav id="main-nav">
            <RouterLink to="/"><img :src="mainLogo" alt="logo" id="navigation-logo"></RouterLink>

            <div id="navigation">
                
                <RouterLink to="/">Home</RouterLink>
                <RouterLink v-if="isLoggedIn" to="/profile">Profile</RouterLink>
                <RouterLink v-else to="/login">Login</RouterLink>
                <RouterLink to="/discover">Discover</RouterLink>
                
            </div>
        </nav>
    </header>
</template>

<style scoped>
#main-nav{
    position: absolute;
    top: 40px;
    /* right: 100px; */

    left: 50%;
    transform: translate(-50%, 0);

    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

#main-nav img{
    width: 70px;
    height: 70px;
    cursor: pointer;
}

#navigation{
    display: flex;
    width: 400px;
    height: var(--navbar-height);
    /* left: 40%; */
    justify-content: space-around;
    align-items: center;
    background-color: var(--gray-dark);
    border-radius: var(--border-rad-bigger);
}
#navigation:hover{
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.11);
    filter: brightness(1.3);
}

#navigation a {
    text-decoration: none;
    font-size: var(--normal-text);
    text-transform: uppercase;
    color: var(--gray-main);
    transition: all 0.1s ease-in-out;
}

#navigation a:hover{
    color: var(--primary-0)
}

@media (max-width: 800px){
    #navigation-logo{
        display: none;
    }

    #navigation{
        width: 100%;
    }
}
</style>