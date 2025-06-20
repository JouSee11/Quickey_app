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
            <Icon icon="material-symbols:layers-rounded" class="block-icon"/>
            <p class="header-text">Multi-key</p>
        </div>
        <p class="block-text">Bind multiple actions on one button click, automatize your actions</p>
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
    width: 80px;
    height: 80px;
    color: var(--primary-50);
}

.block-text{
    color: var(--gray-bright);
    margin-top: 20px;
    margin-left: 10px;
}
</style>