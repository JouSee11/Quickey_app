<script setup lang="ts">
import type { ButtonState } from '@/types/buttonBindHome';
import { Icon } from '@iconify/vue'
import { ref } from 'vue';



interface Props {
    buttonId: number,
    text: string,
    state: ButtonState,
    activeContextMenu: number | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
    bindButton: [buttonId: number]
    contextMenu: [buttonId: number, event: MouseEvent]
}>()

const bindButtonClick = (e: Event) => {
    e.stopPropagation()
    if (props.state !== 'multiBinding') { // if the 
        emit('bindButton', props.buttonId)
    }
}


const openContextMenu = (event: MouseEvent) => {
    event.preventDefault()
    emit('contextMenu', props.buttonId, event)
}

</script>

<template>
    <Button 
        :class="[
            'button-bind',
            'box-shadow-normal',
            {
            listening: props.state === 'listening' || props.activeContextMenu === props.buttonId,
            binded: props.state === 'binded',
            multi: props.state === 'multiBinding',
            }
        ]"
        :id="`key-${props.buttonId}`"
        :data-key-num="props.buttonId"

        @dblclick="openContextMenu"
        @click="bindButtonClick" 
        @contextmenu="openContextMenu"
    >
        <Icon v-if="props.state === 'notBinded'" icon="mdi:keyboard-caps" class="icon" />
        <Icon v-if="props.state === 'multiBinding'" icon="material-symbols:layers-rounded" class="icon"/>
        <Icon v-if="props.state === 'listening'" icon="tabler:click" class="icon"/>
        
        {{props.text}}
    </Button>

   

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
    outline: none !important;
    cursor: pointer;
    padding: 10px;
}
.button-bind:hover .icon{
    color: var(--primary-1000);
    /* filter: brightness(1.1); */
}
.button-bind.binded{
    background-color: var(--green-bright);
    box-shadow: 5px 5px 0 var(--green-dark) ,0 0 20px rgba(13, 198, 124, 0.221);
    color: var(--primary-0);
}

.button-bind.multi{
    background-color: var(--green-dark);
    box-shadow: 5px 5px 0 var(--green-bright) ,0 0 20px rgba(13, 198, 124, 0.221);
    color: var(--primary-0);
    cursor: default;
}


.button-bind.listening{
    background-color: rgba(80, 163, 205, 0.644);
    box-shadow: 0 0 30px rgba(44, 153, 207, 0.322);
}

/* .button-bind.removed{
    background-color: var(--red-vivid);
    box-shadow: 0 0 30px rgba(179, 32, 39, 0.644);
} */

.button-page.showed .button-bind{
    /* transform: scale(0); */

    filter: blur(3px) brightness(1.4);
}

.button-bind .icon {
    width: 50px;
    height: 40px;
}

.context-active{
    background-color: rgba(80, 163, 205, 0.644);
}


</style>