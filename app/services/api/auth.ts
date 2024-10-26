import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { auth } from 'app/config/firebase';

export const Auth = {
    registerCredential: async (email: string, password: string) => {
        try {
            const credential = auth.createUserWithEmailAndPassword(email, password);
            console.log("registerCredential", credential);
            return credential;
        } catch (error) {
            console.error(error);
        }
    },
    signInWithCredential: async (email: string, password: string) => {
        try {
            const credential = auth.signInWithEmailAndPassword(email, password);
            console.log("signInWithCredential", credential);
            return credential;
        } catch (error) {
            console.error(error);
        }
    },
    signInWithGoogle: async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            const credential = auth.signInWithCredential(googleCredential);
            console.log("signInWithGoogle", credential);
            return credential;
        } catch (error) {
            console.error(error);
        }
    },
    signOut: async () => {
        try {
            await auth.signOut();
            console.log("signOut");
        } catch (error) {
            console.error(error);
        }
    }
}