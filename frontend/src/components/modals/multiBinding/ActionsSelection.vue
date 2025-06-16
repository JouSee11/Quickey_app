<!-- filepath: c:\CODE_PROJEKTY\QUICK_KEY_controller\frontend\src\components\modals\ActionsSelection.vue -->
<script setup lang="ts">
import ActionCategory from '@/components/modals/multiBinding/ActionCategory.vue'
import { useActionCategories } from '@/composables/useActionCategories'
import ActionButton from '@/components/modals/multiBinding/ActionButton.vue';

const { categories } = useActionCategories()


</script>

<template>
    <div class="actions-select-cont">
        <p class="actions-select-title">Availible actions:</p>
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
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 35%;
    max-width: 350px;
    height: 90%;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: transparent;
    border: 1px solid var(--blue-dark);
    margin: 0;
    margin-left: 15px;
    border-radius: var(--border-rad-smaller);
    padding: 10px 10px;

}

.actions-select-title{
    color: var(--gray-main);
    margin-bottom: 10px;
}



</style>