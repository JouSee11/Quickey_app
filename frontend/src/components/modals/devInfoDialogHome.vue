<script setup lang="ts">
import { useTutorial } from '@/composables/useTutorialApp';
import { Icon } from '@iconify/vue';

const visible = defineModel<boolean>('visible', { default: false });
const {startTutorial} = useTutorial()

const triggerTutorial = () => {
    visible.value = false
    startTutorial()

}
</script>

<template>
    <Dialog
        v-model:visible="visible"
        modal
        style="max-width: 480px;"
        :closable="false"
        :draggable="false"
    >
        <template #header>
            <span class="header-content">
                <Icon icon="material-symbols:celebration-rounded" width="32" height="32" style="color: var(--green-bright)" />
                <span class="header-title">Welcome to Quickey Beta!</span>
                <Icon icon="material-symbols:construction" width="28" height="28" style="color: var(--primary-0)" />
            </span>
        </template>
        <div class="dialog-content">
            <p class="dialog-text">
                Thank you for trying <b>Quickey</b>!<br>
                This app is <span class="highlight">still in active development</span>.<br>
                You may encounter some bugs or unfinished features.
            </p>
            <div class="separator"></div>
            <span class="feedback">
                Your feedback is valuable, please <span class="highlight">report any issues or suggestions</span> via the contact link in the footer.
            </span>
            <Button 
                type="button"
                label="Let's go"
                icon="pi pi-check"
                class="ok-button"
                @click="triggerTutorial"
                autofocus
                outlined
                rounded
            />
        </div>
    </Dialog>
</template>

<style scoped>
.header-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.header-title {
    font-size: 1.3rem;
    font-weight: bold;
    color: var(--primary-900);
    letter-spacing: 0.5px;
}

.dialog-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0 0 0;
}

.dialog-text {
    text-align: center;
    line-height: 1.7;
    color: var(--primary-900);
    margin-bottom: 2rem;
    font-size: 1.08rem;
}

.highlight {
    color: var(--green-bright);
    font-weight: 500;
}

.feedback {
    display: block;
    margin-top: 1rem;
    color: var(--primary-700);
    font-size: 0.98rem;
    text-align: center;
    margin-bottom: 10px;
}

.ok-button {
    color: var(--green-bright);
    margin-top: 10px;
    min-width: 120px;
    font-weight: 600;
}

.separator{
    width: 100%;
    height: 1px;
    outline: none;
    border-top: 1px var(--primary-0) solid;
}

</style>