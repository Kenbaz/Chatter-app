// plugins/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.public.FIREBASE_API_KEY as string,
    authDomain: config.public.FIREBASE_AUTH_DOMAIN as string,
    projectId: config.public.FIREBASE_PROJECT_ID as string,
    storageBucket: config.public.FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: config.public.FIREBASE_MESSAGING_SENDER_ID as string,
    appId: config.public.FIREBASE_APP_ID as string,
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firebase services
  const auth = getAuth(app);
  const firestore = getFirestore(app);

  // Provide Firebase services globally
  return {
    provide: {
      firebase: {
        app, auth, firestore
      }
    }
  }
});
