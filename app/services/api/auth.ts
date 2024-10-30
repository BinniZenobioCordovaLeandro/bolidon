import { googleAuth } from "./auth/google";

export const Auth = {
    registerCredential: async (email: string, password: string) => {
        try {
            const credential = await (() => "registerCredential")();
            console.log("registerCredential", credential, email, password);
            return credential;
        } catch (error) {
            console.error(error);
        }
    },
    signInWithCredential: async (email: string, password: string) => {
        try {
            // const credential = auth.signInWithEmailAndPassword(email, password);
            if (email === "" || password === "") return;
            if (email === "service@gmail.com" && password === "service")
                return {
                    token: "service",
                    user: { email, isCollaborator: true },
                };
            if (email === "client@gmail.com" && password === "client")
                return {
                    token: "client",
                    user: { email, isCollaborator: false },
                };
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