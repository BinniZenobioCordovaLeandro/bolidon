import { apiAuth } from "@/services/api/apiAuth"
import { Auth } from "app/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { User, UserModel } from "./User"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
    message: types.optional(types.string, ""),
    authToken: types.maybe(types.string),
    authEmail: "",
    isCollaborator: types.optional(types.boolean, false),
    user: types.maybe(UserModel),
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
      const response = await Auth.signInWithCredentials(store.authEmail, password)
      if (!response) {
        this.setMessage("invalidCredentials")
        return false
      }
      const { token, user } = response
      console.log("authenticate", token);
      this.setAuthToken(token, user.isCollaborator)
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
    setUser(user: User | undefined) {
      store.user = user
    },
    logout() {
      store.authToken = undefined
      store.authEmail = ""
      store.isCollaborator = false
      this.setUser(undefined)
      Auth.signOut()
    },
    updateUser: (data: User) => {
      const newData = apiAuth.updateUser(store.authToken!, data)
      this.setUser(newData)
    },
  }))

export interface AuthenticationStore extends Instance<typeof AuthenticationStoreModel> { }
export interface AuthenticationStoreSnapshot extends SnapshotOut<typeof AuthenticationStoreModel> { }
