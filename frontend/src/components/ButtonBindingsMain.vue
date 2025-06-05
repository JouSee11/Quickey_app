<script setup lang="ts">
import ButtonBox from "@/components/ButtonBox.vue"
import {ref, VueElement} from "vue"
import type {ButtonState, ButtonBindHome} from "@/types/buttonBindHome"



//page management
const allPages = ref<number>(3)
const currentPage = ref<number>(1)
const buttonsPerPage = 9




</script>

<template>
    
    <!-- display binding keys -->
    <ButtonBox />
</template>

<style></style>