<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod'
import Icon from '@iconify/vue';
import { useToast } from 'primevue';
import { aboutApi } from '@/api/about_api';
import { FormField } from '@primevue/forms';

const visible = defineModel<boolean>('visible', {default: false})
const isSubmitting = ref(false)

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

const onSubmit = async ({ valid, values }: {valid: boolean, values: any}) => {
    if (!valid) return 

    isSubmitting.value = true

    try {
        const response = await aboutApi.sendEmailAbout(values.email, values.findMethod)

        if (response.status === "success") {
            toast.add({ severity: 'success', summary: 'Email recieved!', detail: response.msg, life: 2000})
            visible.value = false
        }
        else {
            toast.add({ severity: 'error', summary: 'Error', detail: response.msg, life: 2000}) 
        }
    } catch (error) {
        console.log(error);
        toast.add({ severity: 'error', summary: 'Error', detail: "Error saving email", life: 2000}) 
    } finally {
        isSubmitting.value = false
    }

}

//select
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
        header="Get latest news!"
        class="email-dialog"
    >
           
        <div class="dialog-content">
            <span>
                Enter your email, and get updates about development and product availibility.
            </span>

            <div class="separator"></div>
            <Form v-slot="$form" :resolver="resolver" class="dialog-form" @submit="onSubmit">

                <FormField initialValue="">
                    <label class="email-label" for="email-select">Email</label>
                    <InputText name="email" type="email" placeholder="Email" id="email-select" fluid class="email-input"/>

                    
                    <i v-if="!$form.email?.invalid && $form.email?.value"  class="pi pi-check input-icon" style="color: var(--green-bright);"/>
                    <i v-else class="pi pi-times input-icon" style="color: var(--red-dark);"/>

                    <Message  v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{  $form.email.error.message }}</Message>
                </FormField>
                
                <FormField class="select-cont" initialValue="">
                    <label for="find-method-select">How did you find Quickey?</label>
                    <Select
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
/* 
.separator{
    margin-top: 20px;
    border-top: 1px solid var(--gray-bright);
    width: 90%;
    justify-self: center;
} */

.email-label{
    display: block;
    margin-bottom: 10px;
}
</style>