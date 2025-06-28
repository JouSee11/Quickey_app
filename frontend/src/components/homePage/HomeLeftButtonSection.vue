<script setup lang="ts">
import {computed} from "vue"
import { useDeviceStore } from "@/stores/deviceStore";
import { storeToRefs } from "pinia";
import { useDeviceActions } from "@/composables/useButtonActions";

const deviceStore = useDeviceStore()
const {isConnected} = storeToRefs(deviceStore)

const {resetButtons, importData} = useDeviceActions()


//items in the menu
const items = computed(() => [
    {
        label: 'Controls',
        items: [
            {
                label: 'Reset',
                icon: 'pi pi-refresh',
                command: resetButtons
            },
            {
                label: 'Import from device',
                icon: 'pi pi-file-import',
                disabled: !isConnected.value,
                command: importData
            },
            {
                label: 'Save preset',
                icon: 'pi pi-save',
                disabled: true
            }
        ]
    }
])

</script>

<template>
    <div id="left-section">
        <div>
            <Toast />
            <ConfirmDialog/>
            <Menu :model="items" id="binding-controlls-menu" class="box-shadow-normal"/>
        </div>


    </div>
</template>

<style scoped>

:deep(#binding-controlls-menu .pi){
    color: var(--primary-50);    
}

</style>