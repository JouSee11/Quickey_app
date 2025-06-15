<script setup lang="ts">
import { useKnobDialogStore } from '@/stores/knobDialogStore';
import { storeToRefs } from 'pinia';

const store = useKnobDialogStore()
const {isVisible} = storeToRefs(store)

</script>

<template>
    <Dialog
        v-model:visible="store.isVisible"
        header="Knob binding"
        @hide="store.closeDialog"
    >
        <p>YOlo</p>
    </Dialog>

</template>

<style scoped>
</style>