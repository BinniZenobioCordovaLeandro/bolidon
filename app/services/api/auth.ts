import { UserSnapshotIn } from "@/models";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendPasswordResetEmail, signInWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { googleAuth } from "./auth/google";
import { apiDatabase } from "./database/firestore";

const auth = getAuth();

type AuthResponse = {
    token: string;
    user: UserSnapshotIn; 
}

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
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        apiDatabase.createUser({
            email,
            isCollaborator: false,
            guid: "",
            name: undefined,
            photo: undefined,
            lastLogin: undefined,
        });
        if (user) return true;
        return false;
    },
    signInWithCredentials: async (email: string, password: string): Promise<AuthResponse | undefined> => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const token = await user.getIdToken();
            const getUser = await apiDatabase.user(email);
            if (!getUser) return undefined;
            return {
                token,
                user: getUser,
            }
        } catch (error) {
            console.error(error);
            return undefined;
        }
    },
    signInWithGoogle: async (token: string): Promise<AuthResponse | undefined> => {
        try {
            const user = await googleAuth.getUserInfoGoogle(token);
            const googleCredential =  GoogleAuthProvider.credential(null, token);
            const userCredential = signInWithCredential(auth, googleCredential);
            console.log("🎸 userCredential", userCredential);
            let getUser = await apiDatabase.user(user.email);
            if (!getUser) {
                getUser = await apiDatabase.createUser({
                    email: user.email,
                    isCollaborator: false,
                    guid: "",
                    name: user.name || "",
                    photo: user.photo || "",
                    lastLogin: Date.now(),
                });
                if (!getUser) return undefined;
            }
            return {
                token,
                user: getUser,
            };
        } catch (error) {
            console.error(error);
            return undefined;
        }
    },
    signOut: async () => {
        signOut(auth);
    }
}