<script setup lang="ts">
import { useSaveDialog } from '@/composables/useSaveDialog';
import {ref} from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod'
import { Icon } from '@iconify/vue';


const {isDialogVisible, hideDialog} = useSaveDialog()
const nameServerError = ref('')

const handleCancel = () => {
    hideDialog()
}

//form handler
const resolver = zodResolver(
    z.object({
        saveName: z.string().trim()
            .min(1, "Name is requiered")
            .min(3, "Minimum 3 characters are requiered")
            .max(50, "Maximum 50 characters allowed"),
        saveDescription: z.string().trim()
            .max(3000, "Maximum description length is 3000 characters")
    })
)

const checkNameBlur = async (name: string): Promise<Boolean> => {
    nameServerError.value = ''
    // const nameAvailible = await 
    // TODO - on the backend create the model and then check on the 
}

const onSubmit = async ({valid, values, reset}: {valid: boolean, values: any, reset: () => void}) => {
    if (!valid) return
}

</script>

<template>
    <Dialog
        v-model:visible="isDialogVisible"
        modal
        header="Save Binding Preset"
        :style="{width: '700px', height: '550px'}"
        @hide="handleCancel"
    >
            <Form v-slot="$form" :resolver="resolver" @submit="onSubmit" class="dialog-form">

                <label for="save-name" class="input-label">Save name*</label>
                <InputText id="save-name" name="save-name" class="form-input" placeholder="Name - must be unique within your saves" maxlength="50"/>
                <!-- <FloatLabel variant="out">
                </FloatLabel> -->

                <!-- <FloatLabel variant="out"> -->
                <label for="save-description" class="input-label">Save description</label>
                <Textarea id="save-description" name="save-description" class="form-input" placeholder="Description ... " maxlength="3000"/>
                <!-- </FloatLabel> -->

                <div class="button-area">
                    <Button
                        label="Save"
                        outlined
                        icon="pi pi-save"
                        class="save-button"
                    />
                    <Button
                        label="Cancel"
                        outlined
                        icon="pi pi-times"
                        class="cancel-button"
                        @click="hideDialog"
                    />
                </div>

            </Form>

    </Dialog>

</template>

<style scoped>
.dialog-form{
    width: 100%;
}

.form-input{
    width: 100% !important;
    margin-top: 10px;
    margin-bottom: 30px;
}

#save-description{
    height: 200px;
    resize: none !important;
}

.input-label{
    color: var(--gray-bright);
}

#save-description{ 
    font-size: var(--smaller-text) !important;
}


/* buttons */
.button-area{
    display: flex;
    justify-content: end;
}

.save-button{
    color: var(--green-dark);
    margin-right: 15px;
}


</style>