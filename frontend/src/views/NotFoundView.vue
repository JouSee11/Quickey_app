<script setup lang="ts">
</script>


<template>
    <div class="container">
        <h1 class="title-404">404</h1>
        <h2 class="text-desc">Not found - the page you are looking for does not exist</h2>
    </div>
</template>


<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.title-404{
    font-size: 15em;
    color:  var(--primary-0);
    margin-bottom: 50px;
    text-shadow: 15px 15px 0 var(--primary-800);


    transition: text-shadow 0.5s ease-in-out;
}

.title-404:hover{
    text-shadow: 25px 25px 0 var(--red-vivid), 20px 20px 30px rgba(255, 0, 0, 0.596);

}

.text-desc{
    color: var(--primary-50);
}

@media (max-width: 500px) {
    .title-404{
        font-size: 10em;
        margin: 20px;
    }
    .text-desc{
        font-size: var(--normal-text);
    }
}
</style>