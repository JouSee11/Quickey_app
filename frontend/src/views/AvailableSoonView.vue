<script setup lang="ts">
import { Icon } from '@iconify/vue';
</script>


<template>
    <div class="container">
        <Icon icon="mingcute:time-line" class="big-icon" />
        <h1 class="title">Availible soon</h1>
        <h2 class="text-desc">This page is still being developed and will be availible soon</h2>
    </div>
</template>


<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 0 50px;
}

.title{
    font-size: 5em;
    color:  var(--primary-0);
    margin-bottom: 50px;
    text-shadow: 10px 10px 0 var(--primary-800);


    transition: text-shadow 0.5s ease-in-out;
}

.title:hover{
    text-shadow: 15px 15px 0 var(--primary-100), 20px 20px 30px rgba(21, 123, 218, 0.384);

}

.text-desc{
    color: var(--primary-50);
    text-align: center;
}

.big-icon{
    width: 100px;
    height: 100px;
    color: var(--primary-0);
}

@media (max-width: 700px) {
    .title{
        font-size: 3em;
        text-align: center;
    }

    .text-desc{
        font-size: 1em;
    }

    .big-icon{
        width: 50px;
        height: 50px;
    }
}

/* @media (max-width: 500px) {
    .title-404{
        font-size: 10em;
        margin: 20px;
    }
    .text-desc{
        font-size: var(--normal-text);
    }
} */
</style>