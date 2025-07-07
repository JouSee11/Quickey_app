<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { emailVerifyApi } from '@/api/auth/verify_email';
import { useRoute } from 'vue-router';

const route = useRoute();

const verified = ref(false);
const token = route.query.token as string;

onBeforeMount(async () => {
    verified.value = await emailVerifyApi.verifyEmail(token)
});

</script>

<template>
    <div class="verifyStatus">
        <p v-if="verified">Your are authorized</p>
        <p v-else="verified">Code is not valid</p>
    </div>

</template>

<style></style>