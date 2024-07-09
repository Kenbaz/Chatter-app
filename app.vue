<script setup lang="ts">
import { userModalStore } from './store/modalStore';

const colorMode = useColorMode();

const toggleTheme = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

const modalStore = userModalStore();
const { showSignUpModal, showSignInModal, showSignUpOptionsModal, openSignUpOptionsModal, openSignInModal } = modalStore;
</script>

<template>
  <div class="min-h-screen bg-white dark:bg-primary text-black dark:text-tinWhite">
    <header class="border border-secondary rounded-full w-2/3 m-auto h-16 p-2 flex gap-3 items-center justify-between">
      <h1>Chatter</h1>
      <nav class="mr-10 flex gap-4 w-2/5 justify-between items-center h-8 p-2">
         <button @click="openSignUpOptionsModal">Get started</button>
         <button @click="openSignInModal">Sign in</button>
      </nav>
      <button @click="toggleTheme" class="bg-gray-200 dark:bg-gray-700 p-2 rounded-full" >Toggle theme</button>
    </header>
    
    <div v-if="showSignUpOptionsModal = true">
      <SignUpOptions/>
    </div>
    <div v-if="showSignInModal = true">
      <SignIn/>
    </div>
    <div v-if="showSignUpModal = true">
      <SignUp/>
    </div>
  </div>
</template>
