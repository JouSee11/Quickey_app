<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
    state: string
    mode?: 'edit' | 'read'
}

const emit = defineEmits<{
    bindKnob: []
    openDialog: [event: MouseEvent]
}>()

const props = defineProps<Props>()

const handleKnobBindingDialog = (event: MouseEvent) => {
    emit('openDialog', event)
}

</script>


<template>
    <!-- knob display -->
    <Button 
        :class="['knob', 'box-shadow-normal', { 'binded': props.state === 'binded', 'readOnly': props.mode === 'read'}]"
        @click="handleKnobBindingDialog"
    >
        <!-- <Icon icon="mdi:knob" class="icon-knob"/> -->
    <Icon v-if="props.state === 'binded'" icon="solar:volume-knob-bold" class="icon-knob" />
    <Icon v-else icon="mdi:knob" class="icon-knob" />

    </Button>
</template>

<style scoped>
.knob {
    grid-column: 2;
    grid-row: 2;
    align-items: center;
    justify-content: center;
    justify-self: center;
    align-self: center;     
    border-radius: 50%;
    width: 300px;
    height: 300px;
    display: flex;
    background-color: var(--blue-dark);
    outline: none;
    border: none;
    z-index: 10;
}

.knob.binded{
    background-color: var(--green-bright);
    box-shadow: 5px 5px 0 var(--green-dark) ,0 0 20px rgba(13, 198, 124, 0.221);
}

.knob.readOnly{
    cursor: default;
}
.knob.readOnly.binded{
    background-color: var(--blue-sky-dark);
    box-shadow: 5px 5px 0 var(--blue-dark) ,0 0 20px rgba(13, 124, 198, 0.221);
}

.knob:hover .icon-knob{
    color: var(--primary-1000);
}

.icon-knob{
    width: 120px;
    height: 120px;
    color: var(--primary-0);
}
</style>