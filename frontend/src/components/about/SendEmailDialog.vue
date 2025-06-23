<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod'
import Icon from '@iconify/vue';
import { useToast } from 'primevue';
import { aboutApi } from '@/api/about_api';
import { FormField } from '@primevue/forms';

const visible = defineModel<boolean>('visible', {default: false})

//email input
const resolver = zodResolver(
z.object({
    email: z.string()
        .min(1, {message: 'Please enter your email'})
        .email({message: 'Invalid email address'})
        .refine(async (email) => {
            // Only check if email exists if it's a valid email format
            if (!z.string().email().safeParse(email).success) {
                return true // Skip async check if email format is invalid
            }

            const exists = await aboutApi.checkEmailExists(email)
            return !exists
        }, {
            message: "Your email is already saved"
            }
        ),
    findMethod: z.string()
      .min(1, {message: "Please select one option."})
})
)

const toast = useToast()

const onSubmit = ({ valid }: {valid: boolean}) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Email recieved!', detail: 'You will recieve news to your email', life: 2000})
        visible.value = false
    }
}

//select
const selectedValue = ref()
const selectValues = [
    "Friend",
    "Instagram",
    "Search result",
    "YouTube",
    "Reddit",
    "Other"
]

</script>

<template>
    <Dialog 
        v-model:visible="visible" 
        modal 
        header="Let latest news!"
        class="email-dialog"
    >
           
        <div class="dialog-content">
            <i class="pi pi-envelope"></i>
            <span>
                Enter your email, and get updates about development and product availibility.
            </span>
            <Form v-slot="$form" :resolver="resolver" class="dialog-form" @submit="onSubmit">

                <FormField class="input-cont" initialValue="">
                    <InputText name="email" type="email" placeholder="Email" fluid class="email-input"/>
                    
                    <i v-if="!$form.email?.invalid && $form.email?.value"  class="pi pi-check input-icon" style="color: var(--green-bright);"/>
                    <i v-else class="pi pi-times input-icon" style="color: var(--red-dark);"/>

                    <Message  v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{  $form.email.error.message }}</Message>
                </FormField>
                
                <FormField class="select-cont" initialValue="">
                    <label for="find-method-select">How did you find Quickey?</label>
                    <Select
                        v-model="selectedValue"
                        :options="selectValues"
                        placeholder="Select one option"
                        class="select-method"
                        name="findMethod"
                        id="find-method-select"
                    >
                    </Select>
                    <Message  v-if="$form.findMethod?.invalid" severity="error" size="small" variant="simple">{{  $form.findMethod.error.message }}</Message>

                </FormField>

                
                <Button type="submit" label="Submit" outlined class="submit-button" icon="pi pi-verified" rounded/>
            </Form>
        </div>
    </Dialog>

</template>

<style scoped>
:deep(div.p-dialog.p-content.email-dialog){
    border: 5px white solid !important;
}

.p-dialog-content{
    display: flex;
    background-color: wheat !important;

}

.dialog-form{
    display: flex;
    flex-direction: column;
    margin-top: 30px;
}

.email-input{
    max-width: 300px;
}

/* .email-input::placeholder{
    color: var(--gray-bright);
} */

.submit-button{
    color: var(--green-bright);
    margin-top: 20px;
    max-width: 120px;
}

.input-icon{
    margin-left: 10px;
    font-size: var(--bigger-text);
}

.select-cont{
    display: flex;
    flex-direction: column;
    margin-top: 20px;
}

.select-method{
    margin-top: 10px;
    max-width: 300px;
}

.select-method::placeholder{
    color: var(--gray-bright);
}
</style>