<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
    state: string
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
        :class="['knob', 'box-shadow-normal', { 'binded': props.state === 'binded'}]"
        @click="handleKnobBindingDialog"
    >
        <!-- <Icon icon="mdi:knob" class="icon-knob"/> -->
    <Icon v-if="props.state === 'binded'" icon="solar:volume-knob-bold" class="icon-knob" />
    <Icon v-else icon="mdi:knob" class="icon-knob" />

    </Button>
</template>

<style scoped>
.knob {
    position: absolute !important;
    left: 50% !important;
    bottom: 50% !important;
    transform: translate(-50%, 40%);
    border-radius: 50%;
    width: 300px;
    height: 300px;
    display: flex;
    background-color: var(--blue-dark);
    outline: none;
    border: none;
}

.knob.binded{
    background-color: var(--green-bright);
    box-shadow: 5px 5px 0 var(--green-dark) ,0 0 20px rgba(13, 198, 124, 0.221);
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