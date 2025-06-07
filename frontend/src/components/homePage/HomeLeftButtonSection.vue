<script setup lang="ts">

import {ref} from "vue"

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
                disabled: true
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
        <div class="card flex justify-center">
            <Menu :model="items" id="binding-controlls-menu"/>


        </div>

    </div>
</template>

<style scoped>

:deep(#binding-controlls-menu .p-menuitem-link){
    color: green !important;
    background-color: black !important;
    
}

</style>