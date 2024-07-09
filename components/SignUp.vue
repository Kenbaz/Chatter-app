<script setup lang="ts">
import { registerUser, signInWithGoogle } from '~/services/authServices';
import { userErrorStore } from '~/store/errorStore';
import { userModalStore } from '~/store/modalStore';

const email = ref("");
const password = ref("");
const errorStore = userErrorStore();
const modalStore = userModalStore();

const signUp = async () => {
    try {
        await registerUser(email.value, password.value);
        alert("User registered successfully");
        close();
    } catch (error) {
        // Error handling done on authServices
    }
};

const signInWithGoogleAccount = async () => {
    try {
        await signInWithGoogle();
        close();
    } catch (error) {
        //
    }
};

const close = () => {
    modalStore.closeModals();
};

const switchToSignIn = () => {
    close();
    modalStore.openSignInModal();
};

const switchToSignUpOptions = () => {
  close();
  modalStore.openSignUpOptionsModal();
}
</script>

<template>
  <div v-if="modalStore.showSignUpModal" class="modal text-gray-900">
    <div class="modal-content text-white">
      <span class="close-modal" @click="close">&times;</span>
      <h2 class="text-center mt-14 text-xl">Chatter with us!</h2>
      <div class="flex flex-col items-center">
        <form @submit.prevent="signUp" class="signup-form mt-10">
          <div class="flex flex-col w-72 mb-6">
            <label class="" for="email"></label>
            <input class="h-8 rounded-full p-2 text-gray-900 outline-none text-base placeholder:text-sm" type="email" id="email" v-model="email" required placeholder="Email" />
          </div>
          <div class="flex flex-col">
            <label for="password"></label>
            <input class="h-8 rounded-full p-2 text-gray-900 outline-none text-base placeholder:text-sm" type="password" id="password" v-model="password" required placeholder="Password"/>
          </div>
          <button class="ml-[118px] mt-5 hover:underline text-lg" type="submit">Sign up</button>
        </form>
        <p v-if="errorStore.errorMessage">{{ errorStore.errorMessage }}</p>
        <button @click="signInWithGoogleAccount" class="mt-2 hover:underline" >Sign up with Google</button>
        <p class="mt-4 text-gray-400">Already have an account? <a class="hover:underline cursor-pointer" @click="switchToSignIn">Sign in</a></p>
        <p class="mt-4 text-sm"><a class="hover:underline cursor-pointer" @click="switchToSignUpOptions">All sign up options</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(1px);
}
.modal-content {
  background-color: #262626;
  padding: 20px;
  border-radius: 5px;
  width: 35%;
  height: 80%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}
.close-modal {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
</style>
