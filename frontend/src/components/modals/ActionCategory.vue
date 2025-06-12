<script setup lang="ts">
import ActionButton from '@/components/modals/ActionButton.vue';
import { VueDraggable } from 'vue-draggable-plus';

//values that are passed to the single action button 
interface ActionDefinition{
    label: string,
    icon: string,
    actionType: string
}

interface Props {
    title: string,
    actions: ActionDefinition[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
    actionClick: [actionType: string]
}>()

const handleActionClick = (actionType: string) => {
    emit('actionClick', actionType)
}


// Clone function for drag & drop
const cloneAction = (action: ActionDefinition) => {
    return {
        ...action,
        id: `${action.actionType}-${Date.now()}`, // Unique ID for each instance
        value: action.label
    }
}
</script>

<template>
    <div class="button-section">
        <p>{{ props.title }}</p>

        <VueDraggable
            :list="props.actions"
            :group="{name: 'actions', pull: 'clone', put: false}"
            :clone="cloneAction"
            :sort="false"
            class="acton-buttons-group"
            itemKey="actionType"
        >
        <template #item="{ element }">
            <ActionButton 
                :label="element.label"
                :icon="element.icon"
                :action-type="element.actionType"
                @action-click="handleActionClick"
            />

        </template>

        </VueDraggable>
    </div>

</template>

<style scoped>

.button-section {
    width: 100%;
    margin-bottom: 10px;
    padding: 0 10px;
    border-radius: var(--border-rad-main);
    background-color: var(--blue-dark);
    transition: transform 0.3s ease-in-out;
}

.button-section:hover {
    transform: scale(0.99);
    filter: brightness(1.2);
}

.button-section p {
    color: var(--primary-50);
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: 600;
}

.action-buttons-group {
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-bottom: 15px;
}
</style>