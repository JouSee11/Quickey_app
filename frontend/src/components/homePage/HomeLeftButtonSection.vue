<script setup lang="ts">

import {ref} from "vue"

const items = ref([
    {
        label: 'Controls',
        items: [
            {
                label: 'Reset',
                icon: 'pi pi-home'
            }
        ]
    }
])

</script>

<template>
    <div id="left-section">
        <div class="card flex justify-center">
            <Menu :model="items" />

        </div>

    </div>
</template>

<style></style>