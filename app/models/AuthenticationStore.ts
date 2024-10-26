import { Auth } from "app/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"

export const AuthenticationStoreModel = types
  .model("AuthenticationStore")
  .props({
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
    async authenticate() {
      // const user = await Auth.signInWithCredential(store.authEmail, password)
      console.log("authenticate");
      // We'll mock this with a fake token.
      this.setAuthToken(String(Date.now()), true)
      return true;
    },
    async authenticateWithGoogle() {
      const token = await Auth.signInWithGoogle();
      console.log("token", token);
      this.setAuthToken("token");
    },
    async register(password: string) {
      const user = await Auth.registerCredential(store.authEmail, password);
      console.log("register", user);
      return !!user
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
