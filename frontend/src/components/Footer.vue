<script setup lang="ts">
</script>

<template>
    <footer>
        <div id="icons-links">
            <a href="mailto:jotalac@seznam.cz?subject=[Quick key - question]">
                <Icon icon="mdi:envelope" width="24" height="24"  style="color: #5b4545" class="icon" />
                <spn class="icon-text">Contact</spn>
            </a>
            <a href="suc" target="_blank">
                <i class="fa-solid fa-circle-dollar-to-slot"></i>
                <spn class="icon-text">Support</spn>
            </a>
            <a href="https://instagram.com/jta_cz/" target="_blank">
                <i class="fa-brands fa-instagram"></i>>
                <spn class="icon-text">Instagram</spn>
            </a>
            <a href="https://github.com/JouSee11/QUICK_KEY_controller/" target="_blank">
                <i class="fa-brands fa-github"></i>
                <spn class="icon-text">GitHub</spn>
            </a>
            <a href="https://www.linkedin.com/in/josef-talac-827241260/" target="_blank">
                <i class="fa-brands fa-linkedin-in"></i>
                <spn class="icon-text">LinkedIn</spn>
            </a>
        </div>
        <p>Created by Josef Talač</p>
    </footer>
</template>

<style scoped>

footer{
    display: flex;
    width: 100vw;
    height: 50px;
    position: fixed;
    bottom: 0;
    padding: 0.5em;
    justify-content: space-around;
    align-items: center;
    background-color: transparent;
    background: linear-gradient(to top, var(--primary-1000), transparent);
}

footer a{
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    font-size: var(--normal-text);
    color: var(--blue-dark);
    transition: all 0.1s ease-in-out;
    margin-left: 50px;
    transition: color 0.2s ease-in-out;
}

footer a:hover, 
footer p:hover{
    color: var(--primary-0);
    text-shadow: 0 0 15px var(--primary-0-shadow);
}

#icons-links{
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
}

footer p{
    color: var(--blue-dark);
}

footer #icons-links a i {
    padding: 10px;
}

@media (max-width: 1000px) {
    .icon-text{
        font-size: 0em;
    }

    footer p{
        font-size: 0;
    }


    
}
</style>