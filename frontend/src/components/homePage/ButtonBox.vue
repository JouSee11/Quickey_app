<script setup lang="ts">
import type { ButtonState } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue'

interface Props {
    buttonId: Number,
    text: String,
    state: ButtonState
}

const props = defineProps<Props>()


//events - define clicks etc...
const handleClick = () => {}

const handleRightClick = () => {

}
</script>

<template>
    <button 
        class="button-bind" 
        :id="`key-${props.buttonId}`"
        :data-key-num="props.buttonId"
        @click="handleClick" 
        @contextmenu="handleRightClick"
        @dblclick="handleRightClick"
    >
        <Icon icon="mdi:keyboard-caps" class="icon" />
        {{props.text}} 
    </button>


</template>


<style scoped>
.button-bind{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 150px;
    margin: 10px;
    border: none;
    border-radius: var(--border-rad-main);
    font-size: var(--normal-text);
    font-weight: 700;
    background-color: var(--blue-dark);
    color: var(--primary-0);
    outline: none;
    cursor: pointer;
    box-shadow: 5px 5px 0 var(--primary-600);
    transition: background-color 0.3s ease,
     color 0.3s ease, 
     box-shadow 0.5s ease, 
     filter 0.5s ease, 
     scale 0.5s ease, 
     transform 0.5s ease;

    /* default it will be shrinek */
}
.button-bind:hover{
    box-shadow: 8px 8px 0 var(--primary-400);
    filter: brightness(1.1);
}
.button-bind.binded{
    background-color: var(--green-bright);
    box-shadow: 5px 5px 0 var(--green-dark) ,0 0 20px rgba(13, 198, 124, 0.221);
    color: var(--primary-0);
}
.button-bind.active{
    background-color: rgba(80, 163, 205, 0.644);
    box-shadow: 0 0 30px rgba(44, 153, 207, 0.322);
}
.button-bind.removed{
    background-color: var(--red-vivid);
    box-shadow: 0 0 30px rgba(179, 32, 39, 0.644);
}

.button-page.showed .button-bind{
    /* transform: scale(0); */

    filter: blur(3px) brightness(1.4);
}

.button-bind .icon {
    width: 50px;
    height: 40px;
}
</style>