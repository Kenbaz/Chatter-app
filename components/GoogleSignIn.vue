<script setup lang="ts">
import { signInWithGoogle } from '~/services/authServices';
import { userErrorStore } from '~/store/errorStore';

const errorStore = userErrorStore();

const SignInWithGoogleAccount = async () => {
    try {
        await signInWithGoogle();
    } catch (error) {
        // Error handling done in authServie
    }
};
</script>

<template>
    <div>
        <h1>Sign in with Google</h1>
        <button @click="SignInWithGoogleAccount">Sign in with google</button>
        <p v-if="errorStore.errorMessage">{{ errorStore.errorMessage }}</p>
    </div>
</template>