<script setup lang="ts">

interface Props {
    numberDisplay: number | string,
    enabled: boolean
    icon?: string
}

const props = defineProps<Props>()

</script>

<template>
    <Button 
        :label="props.numberDisplay.toString()"
        rounded
        severity="secondary"
        :class="['page-button',{ disabled: enabled === false }]"
    />

</template>


<style scoped>
.page-button{
    width: 40px;
    height: 40px;
    margin: 10px;
    cursor: pointer;
    outline: none;
    background-color: var(--blue-dark);
    border: none;
    color: var(--gray-main);
    transition: background-color 0.3s ease, color 0.3s ease, border 0.5s ease, box-shadow 0.5s ease, 0.2s ease-in-out;
}

.page-button:hover{
    filter: brightness(1.3);
}

.page-button.active{
    width: 80px;
    background-color: var(--green-dark);
    box-shadow: 0 0 20px var(--green-vivid-shadow);
    color: var(--primary-0);
    border: 2px solid var(--green-bright);
}

.page-button.disabled{
    color: gray;
    
}

</style>