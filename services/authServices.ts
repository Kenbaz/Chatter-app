import { useFirebase } from "@/composables/firebase.ts";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import type { AuthError, User } from "firebase/auth";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { userErrorStore } from "~/store/errorStore.ts";

interface UserDetails {
  email: string | null;
  uid: string;
  createdAt: string;
}

const getFirebase = () => {
  const { auth, firestore } = useFirebase();
  return { auth, firestore };
};

export const registerUser = async (
  email: string,
  password: string
): Promise<void> => {
  const errorStore = userErrorStore();
  const { auth, firestore } = getFirebase();

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("User created:", user);

    await storeUserInDatabase(user, firestore);
    errorStore.clearError();
  } catch (error) {
    let errorMessage = "Failed to register user";

    if ((error as AuthError).code) {
      const authError = error as AuthError;
      switch (authError.code) {
        case "auth/weak-password":
          errorMessage = "The password is too weak";
          break;
        case "auth/email-already-in-use":
          errorMessage =
            "The email address is already in use by another account";
          break;
        case "auth/invalid-email":
          errorMessage = "This email address is invalid";
          break;
        default:
          errorMessage += `: ${authError.message}`;
          break;
      }
    } else if (error instanceof Error) {
      errorMessage += `: ${error.message}`;
    }
    errorStore.setError(errorMessage);
    console.error(errorMessage);
  }
};

const storeUserInDatabase = async (
  user: User,
  firestore: Firestore
): Promise<void> => {
  const userDetails: UserDetails = {
    email: user.email,
    uid: user.uid,
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(firestore, "users", user.uid), userDetails);
    console.log("User data saved successfully");
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error;
  }
};

export const signInUser = async (
  email: string,
  password: string
): Promise<User> => {
  const errorStore = userErrorStore();
  const { auth } = getFirebase();

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    errorStore.clearError();
    return userCredential.user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error signing in user:", errorMessage);
    errorStore.setError(`Failed to sign in user: ${errorMessage}`);
    throw error;
  }
};

export const signInWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  const errorStore = userErrorStore();
  const { auth, firestore } = getFirebase();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await storeUserInDatabase(user, firestore);
    errorStore.clearError();
    return user;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    errorStore.setError(`Failed to sign in with Google: ${errorMessage}`);
    console.error("Error signing in with Google:", errorMessage);
    throw error;
  }
};

export const signOutUser = async (): Promise<void> => {
  const errorStore = userErrorStore();
  const { auth } = getFirebase();

  try {
    await signOut(auth);
    errorStore.clearError();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    errorStore.setError(`Failed to sign out: ${errorMessage}`);
    console.error("Error signing out:", errorMessage);
    throw error;
  }
};
