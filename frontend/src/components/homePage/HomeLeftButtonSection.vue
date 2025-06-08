<script setup lang="ts">
import {ref} from "vue"

interface Props {
    loggedIn: Boolean,
    deviceConnected: Boolean
}

const props = defineProps<Props>()

//items in the menu
const items = ref([
    {
        label: 'Controls',
        items: [
            {
                label: 'Reset',
                icon: 'pi pi-refresh'
            },
            {
                label: 'Import from device',
                icon: 'pi pi-file-import',
                disabled: !props.deviceConnected
            },
            {
                label: 'Save preset',
                icon: 'pi pi-save',
                disabled: !props.loggedIn
            }
        ]
    }
])

</script>

<template>
    <div id="left-section">
        <div class="card flex justify-center">
            <Menu :model="items" id="binding-controlls-menu" class="box-shadow-normal"/>


        </div>

    </div>
</template>

<style scoped>

:deep(#binding-controlls-menu .pi){
    color: var(--primary-50);    
}

/* :deep(#binding-controlls-menu) {
    box-shadow: 5px 5px 0 var(--primary-800);
}
:deep(#binding-controlls-menu:hover) {
    box-shadow: 10px 10px 0 var(--primary-800);
} */



</style>