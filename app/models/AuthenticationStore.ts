import { Auth } from "app/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    message: types.optional(types.string, ""),
    authToken: types.maybe(types.string),
    authEmail: "",
    isCollaborator: types.optional(types.boolean, false),
  })
  .views((store) => ({
    get isCollaboratorRole() {
      return !!store.isCollaborator
    },
    get isAuthenticated() {
      return !!store.authToken
    },
    get validationError() {
      if (store.authEmail.length === 0) return "can't be blank"
      if (store.authEmail.length < 6) return "must be at least 6 characters"
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.authEmail))
        return "must be a valid email address"
      return ""
    },
  }))
  .actions((store) => ({
    async authenticate(password: string) {
      const { token, user } = await Auth.signInWithCredentials(store.authEmail, password)
      console.log("authenticate", token);
      this.setAuthToken(String(Date.now()), user.isCollaborator)
      return true;
    },
    async authenticateWithGoogle(token: string) {
      const user = await Auth.signInWithGoogle(token);
      console.log("token", token, user);
      this.setAuthToken(token);
    },
    async register(password: string) {
      const user = await Auth.registerCredential(store.authEmail, password);
      console.log("register", user);
      return !!user
    },
    async forgotPassword() {
      const mailSended = await Auth.forgotPassword(store.authEmail)
      this.setMessage(mailSended ? "linkSent" : "linkNotSent")
      return mailSended
    },
    setMessage (message: string) {
      store.message = message
    },
    setAuthToken(value?: string, isCollaborator = false) {
      store.authToken = value
      store.isCollaborator = isCollaborator
    },
    setAuthEmail(value: string) {
      store.authEmail = value.replace(/ /g, "")
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      Auth.signOut()
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }
