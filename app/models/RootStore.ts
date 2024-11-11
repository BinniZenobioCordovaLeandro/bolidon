import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { OfferStoreModel } from "./OfferStore"
import { AuthenticationStoreModel } from "./AuthenticationStore"
import { ComponentStoreModel } from "./ComponentStore"
import { OrderServiceStoreModel } from "./OrderServiceStore"
import { VehicleStoreModel } from "./VehicleStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  offerStore: types.optional(OfferStoreModel, {} as any),
  authenticationStore: types.optional(AuthenticationStoreModel, {}),
  orderServiceStore: types.optional(OrderServiceStoreModel, {}),
  vehicleStore: types.optional(VehicleStoreModel, {}),
  componentStore: types.optional(ComponentStoreModel, {}),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> { }
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> { }
