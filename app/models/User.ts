import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import * as zod from 'zod';
import { withSetPropAction } from "./helpers/withSetPropAction";

export const userSchema = zod.object({
  name: zod.string().min(2, "Name must be at least 2 characters"),
  photos: zod.array(zod.string()).min(1, "At least one photo is required").optional(),
});

export const UserModel = types
  .model("User")
  .props({
    guid: types.identifier,
    email: types.maybe(types.string),
    name: types.maybe(types.string),
    photos: types.array(types.string),
    isCollaborator: types.maybe(types.boolean),
    lastLogin: types.maybe(types.Date),
  })
  .actions(withSetPropAction)
  .views(() => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(() => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface User extends Instance<typeof UserModel> {}
export interface UserSnapshotOut extends SnapshotOut<typeof UserModel> {}
export interface UserSnapshotIn extends SnapshotIn<typeof UserModel> {}
export const createUserDefaultModel = () => types.optional(UserModel, {
  guid: "",
  email: undefined,
  name: undefined,
  photos: [],
  isCollaborator: undefined,
  lastLogin: undefined,
})

export const createUserModel = (data: UserSnapshotIn): User => UserModel.create(data)
