<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props{
    label: string,
    icon: string,
    actionType: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
    actionClick: [actionType: string]
}>()

const handleClick = () => {
    emit('actionClick', props.actionType)
}
</script>

<template>
    <!-- <Button
        class="action-option-multi"
        :label="props.label"
        :icon="props.icon"
        @click="handleClick"
    /> -->
    <div 
        class="button-options"
        @click="handleClick"    
    >
        <Icon :icon="props.icon"></Icon>
        {{ props.label }}
    </div>

</template>

<style scoped>
.action-option-multi {
    flex-shrink: 0;
    width: 100%;
    height: 50px;
    border: none;
    color: var(--primary-0);
    cursor: pointer;
    background-color: var(--primary-600);
    font-size: var(--normal-text);
    border-radius: var(--border-rad-smaller);
    z-index: 1;
    margin-bottom: 15px;
    text-align: left;
    padding: 0 20px;
    user-select: none;
    transition: box-shadow 0.5s ease-in-out;
}

/* .button-options i {
    font-size: var(--bigger-text);
    margin-right: 10px;
} */

/* .button-options:hover {
    filter: brightness(1.2);
} */

/* .button-options:active {
    background-color: var(--green-dark);
    box-shadow: 5px 5px 0 var(--green-bright), 0 0 20px var(--green-vivid-shadow);
} */
</style>