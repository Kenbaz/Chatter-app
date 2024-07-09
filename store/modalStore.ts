import { defineStore } from "pinia";
import { signInWithGoogle } from "~/services/authServices";

interface ModalStore {
  showSignUpModal: Ref<boolean>;
  showSignInModal: Ref<boolean>;
  showSignUpOptionsModal: Ref<boolean>;
  openSignUpModal: () => void;
  openSignInModal: () => void;
  openSignUpOptionsModal: () => void;
  closeModals: () => void;
  signInWithGoogleAccount: () => Promise<void>;
}

export const userModalStore = defineStore("modal", (): ModalStore => {
  const showSignUpModal = ref(false);
  const showSignInModal = ref(false);
  const showSignUpOptionsModal = ref(false);

  const openSignUpModal = () => {
    showSignUpModal.value = true;
    showSignInModal.value = false;
    showSignUpOptionsModal.value = false;
  };

  const openSignInModal = () => {
    showSignInModal.value = true;
    showSignUpModal.value = false;
    showSignUpOptionsModal.value = false;
  };

  const openSignUpOptionsModal = () => {
    showSignUpOptionsModal.value = true;
    showSignInModal.value = false;
    showSignUpModal.value = false;
  };

  const closeModals = () => {
    showSignInModal.value = false;
    showSignUpModal.value = false;
    showSignUpOptionsModal.value = false;
  };

  const signInWithGoogleAccount = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      //
    }
  };

  return {
    showSignInModal,
    showSignUpOptionsModal,
    showSignUpModal,
    openSignInModal,
    openSignUpOptionsModal,
    openSignUpModal,
    closeModals,
    signInWithGoogleAccount,
  };
});
