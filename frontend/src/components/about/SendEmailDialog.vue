<script setup lang="ts">
import { ref } from 'vue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod'


 const isVisible = ref(true)

 const resolver = ref(zodResolver(
    z.object({
        email: z.string().min(1, {message: 'Please enter your email'}).email({message: 'Invalid email address'})
    })
 ))

</script>

<template>
    <Dialog 
        v-model:visible="isVisible" 
        modal 
        header="Keep me updated"
        class="email-dialog"
        :style="{width: '50vw'}"
        :breakpoints="{'1000px': '70vw'}"
    >
        <div class="dialog-content">
            <span>Enter your email, and get latest news!</span>
            <Form v-slot="$form" :resolver="resolver" class="dialog-form">
                <InputText name="email" type="email" placeholder="Email" fluid/>
                <Message  v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{  $form.email.error.message }}</Message>
                <Button type="submit" label="Submit" outlined />
            </Form>
        </div>
    </Dialog>

</template>

<style scoped>
:deep(div.p-dialog.p-dialog-content){
    background-color: wheat !important;
}



.p-dialog-content{
    display: flex;
    background-color: wheat !important;

}
</style>