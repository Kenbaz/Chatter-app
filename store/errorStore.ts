import { defineStore } from "pinia";

interface ErrorStore {
  errorMessage: Ref<string | null>;
  setError: (message: string) => void;
  clearError: () => void;
}

export const userErrorStore = defineStore("error", (): ErrorStore => {
  const errorMessage = ref<string | null>(null);

  const setError = (message: string) => {
    errorMessage.value = message;
  };

  const clearError = () => {
    errorMessage.value = null;
  };

  return { errorMessage, setError, clearError };
});
