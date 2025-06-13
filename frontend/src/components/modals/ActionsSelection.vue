<!-- filepath: c:\CODE_PROJEKTY\QUICK_KEY_controller\frontend\src\components\modals\ActionsSelection.vue -->
<script setup lang="ts">
import ActionCategory from '@/components/modals/ActionCategory.vue'
import { useActionCategories } from '@/composables/useActionCategories'
import ActionButton from '@/components/modals/ActionButton.vue';

const { categories } = useActionCategories()


</script>

<template>
    <div class="actions-select-cont">
        <ActionCategory
            v-for="(category, index) in categories"
            :key="category.category"
            :title="category.title"
            :actions="category.actions"
            :default-expanded="index === 0" 
        />

        

    </div>
</template>

<style scoped>
.actions-select-cont {
    /* display: flex; */
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 35%;
    max-width: 350px;
    height: 90%;
    flex: 0 0 300px;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--primary-800);
    margin: 0;
    margin-left: 15px;
    border-radius: var(--border-rad-smaller);
    padding: 10px 10px;

}



</style>