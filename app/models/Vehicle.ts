import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const VehicleModel = types
  .model("Vehicle")
  .props({
    guid: types.identifier,
    plate: types.maybe(types.string),
    brand: types.maybe(types.string),
    model: types.maybe(types.string),
    year: types.maybe(types.number),
    color: types.maybe(types.string),
    kilometers: types.maybe(types.number),
    engine: types.maybe(types.string),
    transmission: types.maybe(types.string),
    photos: types.array(types.string),
  })
  .actions(withSetPropAction)
  .views((vehicle) => ({
    get parsedTitle() {
      return `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
    },
    get thumbnail() {
      return vehicle.photos[0]
    },
    get plateAccesibility() {
      return {
        textLabel: vehicle.plate,
        accessibilityLabel: vehicle.plate?.replace(/-/g, ""),
      }
    }
  }))

export interface Vehicle extends Instance<typeof VehicleModel> { }
export interface VehicleSnapshotOut extends SnapshotOut<typeof VehicleModel> { }
export interface VehicleSnapshotIn extends SnapshotIn<typeof VehicleModel> { }
export const createVehicleDefaultModel = () => types.optional(VehicleModel, {
  guid: "",
  plate: undefined,
  brand: undefined,
  model: undefined,
  year: undefined,
  color: undefined,
  kilometers: undefined,
  engine: undefined,
  transmission: undefined,
  photos: []
})
