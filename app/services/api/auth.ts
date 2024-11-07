import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { googleAuth } from "./auth/google";

const auth = getAuth();

export const Auth = {
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
    signInWithCredential: async (email: string, password: string): Promise<{ token: string, user: { email: string, isCollaborator: boolean } }> => {
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
            const { user } = await googleAuth.getUserInfoGoogle(token);
            console.log("signInWithGoogle", user);
            return {
                token,
                user,
            };
        } catch (error) {
            console.error(error);
        }
    },
    signOut: async () => {
        try {
            console.log("signOut");
        } catch (error) {
            console.error(error);
        }
    }
}