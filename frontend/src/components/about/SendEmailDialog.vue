<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod'
import Icon from '@iconify/vue';
import { useToast } from 'primevue';

const visible = defineModel<boolean>('visible', {default: false})


const resolver = ref(zodResolver(
z.object({
    email: z.string().min(1, {message: 'Please enter your email'}).email({message: 'Invalid email address'})
})
))

const toast = useToast()

const onSubmit = ({ valid }: {valid: boolean}) => {
    if (valid) {
        toast.add({ severity: 'success', summary: 'Email recieved!', detail: 'You will recieve news to your email'})
        visible.value = false
    }
}

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
                <InputText name="email" type="email" placeholder="Email" fluid class="email-input"/>
                <Message  v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{  $form.email.error.message }}</Message>
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

.email-input::placeholder{
    color: var(--gray-bright);
}

.submit-button{
    color: var(--green-bright);
    margin-top: 20px;
    max-width: 120px;
}
</style>