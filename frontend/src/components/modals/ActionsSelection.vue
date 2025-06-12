<!-- filepath: c:\CODE_PROJEKTY\QUICK_KEY_controller\frontend\src\components\modals\ActionsSelection.vue -->
<script setup lang="ts">
import ActionCategory from '@/components/modals/ActionCategory.vue'
import { useActionCategories } from '@/composables/useActionCategories'

const emit = defineEmits<{
    actionClick: [actionType: string]
}>()

const { categories } = useActionCategories()

const handleActionClick = (actionType: string) => {
    emit('actionClick', actionType)
}
</script>

<template>
    <div class="actions-select-cont">
        <ActionCategory
            v-for="category in categories"
            :key="category.category"
            :title="category.title"
            :actions="category.actions"
            @action-click="handleActionClick"
        />
    </div>
</template>

<style scoped>
.actions-select-cont {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 35%;
    max-width: 350px;
    height: 90%;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: var(--primary-800);
    margin: 0;
    margin-left: 15px;
    border-radius: var(--border-rad-smaller);
    padding: 10px 10px;
}
</style>