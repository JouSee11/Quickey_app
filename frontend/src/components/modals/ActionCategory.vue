<script setup lang="ts">
import ActionButton from '@/components/modals/ActionButton.vue';
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { VueDraggable } from 'vue-draggable-plus'
// import { VueDraggable } from 'vue-draggable-plus';

//values that are passed to the single action button 
interface ActionDefinition{
    label: string,
    icon: string,
    actionCode: string,
    requiresInput?: boolean,
    inputType?: 'key' | 'text' | 'number' | 'mouse' | 'delay'
}

interface Props {
    title: string,
    actions: ActionDefinition[],
    defaultExpanded?: boolean
}

const props = withDefaults(defineProps<Props>(), {defaultExpanded: false})


// collapsable state of the category
const isExpanded = ref(props.defaultExpanded)

const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
}



// // Clone function for drag & drop
// const cloneAction = (action: ActionDefinition) => {
//     return {
//         ...action,
//         id: `${action.actionCode}-${Date.now()}`, // Unique ID for each instance
//         value: action.label
//     }
// }
</script>

<template>
    <div class="button-section">
        <!-- clickable header for expanding -->
        <div class="category-header" @click="toggleExpanded">
            <div class="category-title">
                <Icon v-if="isExpanded" icon="mingcute:up-line" width="24" height="24"  style="color: #5b4545" />
                <Icon v-else icon="mingcute:down-line" width="24" height="24"  style="color: #5b4545" />
                <h3>{{ props.title }}</h3>
            </div>
            <span class="action-count">{{ props.actions.length }}</span>
        </div>

        <!-- category action buttons -->
        <Transition name="expand">
            <div v-if="isExpanded" class="category-content">
                <VueDraggable
                    v-model="props.actions"
                    :animation="150"
                    :group="{ name: 'actions', pull: 'clone', put: false}"
                    :sort="false"
                    class="item-draggable-from"
                    :clone="(actionDef: ActionDefinition) => ({ // actionDef is of type ActionDefinition
                        id: `${actionDef.actionCode}-${Date.now()}`, // Unique ID for the new instance
                        actionCode: actionDef.actionCode,            // Preserve the original actionCode
                        label: actionDef.label,
                        value: actionDef.requiresInput ? 'Not configured' : actionDef.label, // Default value
                        icon: actionDef.icon,
                        requiresInput: actionDef.requiresInput,      // Carry over requiresInput
                        inputType: actionDef.inputType               // Carry over inputType
                    })"
                >
                    <ActionButton 
                        v-for="action in actions"
                        :key="action.actionCode"
                        :label="action.label"
                        :icon="action.icon"
                        :action-code="action.actionCode"
                        :requires-input="action.requiresInput"
                        />
                </VueDraggable>
            </div>
        </Transition>

    </div>

</template>

<style scoped>

/* .button-section {
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
} */




.button-section {
    width: 100%;
    margin-bottom: 8px;
    border-radius: var(--border-rad-smaller);
    background-color: var(--blue-dark);
    overflow: hidden;
    border: 1px solid var(--primary-600);
}

.category-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    user-select: none;
}

.category-header:hover {
    background-color: var(--primary-700);
}

.category-title {
    display: flex;
    align-items: center;
    gap: 8px;
}

.expand-icon {
    width: 16px;
    height: 16px;
    color: var(--primary-300);
    transition: transform 0.2s ease;
}

.category-title h3 {
    margin: 0;
    color: var(--primary-50);
    font-size: var(--normal-text);
    font-weight: 600;
}

.action-count {
    background-color: var(--primary-600);
    color: var(--primary-50);
    padding: 4px 8px;
    border-radius: 12px;
    font-size: var(--small-text);
    font-weight: 500;
    min-width: 24px;
    text-align: center;
}

.category-content {
    border-top: 1px solid var(--primary-600);
    background-color: var(--primary-800);
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}




/* ✅ Smooth expand/collapse transitions */
.expand-enter-active,
.expand-leave-active {
    transition: all 0.3s ease;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
    max-height: 800px; /* Adjust based on your content */
    opacity: 1;
}
</style>