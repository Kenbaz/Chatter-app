<script setup lang="ts">
import { userModalStore } from '~/store/modalStore';
import { signInWithGoogle } from '~/services/authServices';

const modalStore = userModalStore();

const openSignUpWithEmailModal = () => {
    modalStore.closeModals();
    modalStore.openSignUpModal();
};

const signInWithGoogleAccount = async () => {
    try {
        await signInWithGoogle();
        modalStore.closeModals();
    } catch (error) {
        // Handling error in authService
    }
};

const openSignInModal = () => {
    modalStore.closeModals();
    modalStore.openSignInModal();
}
</script>

<template>
    <div v-if="modalStore.showSignUpOptionsModal" class="modal text-white">
    <div class="modal-content">
      <span class="close-modal" @click="modalStore.closeModals">&times;</span>
      <h2 class="text-center mt-20 font-semibold text-xl">Chatter</h2>
      <div class="flex flex-col items-center mt-10">
        <button @click="openSignUpWithEmailModal" class="button border w-[300px] p-2 rounded-full outline-none">Sign up with Email</button>
        <button @click="signInWithGoogleAccount" class="button border mt-5 w-[300px] p-2 rounded-full outline-none">Sign up with Google</button>
        <p class="mt-7 text-gray-400">Already have an account? <a class="hover:underline cursor-pointer" @click="openSignInModal">Sign in</a></p>
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