<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props{
    label: string,
    icon: string,
    actionCode: string
    requiresInput?: boolean
}

const props = defineProps<Props>()

</script>

<template>
    <div class="action-button">
        <div class="action-info">
            <Icon :icon="props.icon" class="action-icon" />
            <div class="action-text">
                <span class="action-label">{{ props.label }}</span>
                <span v-if="props.requiresInput" class="requires-input">
                    <Icon icon="pi pi-cog" />
                    Requires input
                </span>
            </div>
        </div>
        
        <!-- ✅ Visual indicator for drag capability -->
        <div class="drag-indicator">
            <Icon icon="pi pi-bars" />
        </div>
    </div>

</template>

<style scoped>
.action-option-multi {
    flex-shrink: 0;
    width: 100%;
    height: 50px;
    border: none;
    color: var(--primary-0);
    cursor: pointer;
    background-color: var(--primary-600);
    font-size: var(--normal-text);
    border-radius: var(--border-rad-smaller);
    z-index: 1;
    margin-bottom: 15px;
    text-align: left;
    padding: 0 20px;
    user-select: none;
    transition: box-shadow 0.5s ease-in-out;
}

/* .button-options i {
    font-size: var(--bigger-text);
    margin-right: 10px;
} */

/* .button-options:hover {
    filter: brightness(1.2);
} */

/* .button-options:active {
    background-color: var(--green-dark);
    box-shadow: 5px 5px 0 var(--green-bright), 0 0 20px var(--green-vivid-shadow);
} */
 .action-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background-color: var(--primary-600);
    border-radius: var(--border-rad-smaller);
    cursor: pointer;
    transition: all 0.2s ease;
    border: 1px solid transparent;
    user-select: none;
    margin-bottom: 10px; 
}

.action-button:hover {
    background-color: var(--primary-500);
    border-color: var(--green-bright);
    transform: translateX(2px);
}

.action-button:active {
    transform: translateX(1px) translateY(1px);
    box-shadow: 2px 2px 0 var(--primary-700);
}

.action-info {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
}

.action-icon {
    width: 20px;
    height: 20px;
    color: var(--green-bright);
    flex-shrink: 0;
}

.action-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.action-label {
    color: var(--primary-0);
    font-weight: 500;
    font-size: var(--normal-text);
}

.requires-input {
    display: flex;
    align-items: center;
    gap: 4px;
    color: var(--primary-300);
    font-size: var(--small-text);
    font-style: italic;
}

.drag-indicator {
    color: var(--primary-400);
    opacity: 0.6;
    transition: opacity 0.2s ease;
}

.action-button:hover .drag-indicator {
    opacity: 1;
    color: var(--primary-200);
}
</style>