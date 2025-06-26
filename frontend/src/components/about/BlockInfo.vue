<script setup lang="ts">
import {Icon} from '@iconify/vue';

interface Props {
    icon: string,
    header: string,
    text: string
}

const props = defineProps<Props>()

</script>

<template>
    <div class="block" v-animateonscroll="{ enterClass: 'animate-fadein', leaveClass: 'animate-fadeout' }">
        <div class="header-block">
            <Icon :icon="props.icon" class="block-icon"/>
            <p class="header-text">{{ props.header }}</p>
        </div>
        <p class="block-text">{{ props.text }}</p>
    </div>
</template>

<style scoped>
.block{
    width: 400px;
    height: 200px;
    /* background-color: var(--primary-800); */
    background-color: transparent;
    backdrop-filter: blur(10px);
    border-radius: var(--border-rad-main);
    border: 1px solid var(--gray-main);
    margin: 25px 10px 10px 25px;
    padding: 10px 10px;
}

.header-block{
    display: flex;
    justify-content: start;
    align-items: center;
}

.header-text{
    margin-left: auto;
    margin-right: 30px;
    font-size: var(--bigger-text);
    font-weight: bold;
    color: var(--primary-50);
}

.block-icon{
    width: 60px;
    height: 60px;
    color: var(--primary-50);
}

.block-text{
    color: var(--gray-bright);
    margin-top: 20px;
    margin-left: 10px;
}

@media (max-width: 900px) {
    .block{
        width: 300px;
        height: 150px;
    }

    .header-text{
        font-size: var(--normal-text);
    }

    .block-icon{
    width: 40px;
    height: 40px;
    }

    .block-text{
        font-size: var(--smaller-text);
    }
}
</style>