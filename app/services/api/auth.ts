import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { googleAuth } from "./auth/google";

const auth = getAuth();

export const Auth = {
    forgotPassword: async (email: string): Promise<boolean> => {
        try {
            await sendPasswordResetEmail(auth, email);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    registerCredential: async (email: string, password: string): Promise<boolean> => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            if (user) return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    },
    signInWithCredentials: async (email: string, password: string): Promise<{ token: string, user: { email: string, isCollaborator: boolean } }> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();

            return {
                token,
                user: { email, isCollaborator: false },
            }
        } catch (error) {
            console.error(error);
        }
    },
    signInWithGoogle: async (token: string) => {
        try {
            const user = await googleAuth.getUserInfoGoogle(token);
            const googleCredential =  GoogleAuthProvider.credential(token);
            const userCredential = signInWithCredential(auth, googleCredential);
            console.log("🎸 userCredential", userCredential);
            return {
                token,
                user,
            };
        } catch (error) {
            console.error(error);
        }
    },
    signOut: async () => {
        signOut(auth);
    }
}