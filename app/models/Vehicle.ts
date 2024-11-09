import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import * as zod from 'zod';
import { withSetPropAction } from "./helpers/withSetPropAction";

export const vehicleSchema = zod.object({
  plate: zod.string().min(6, "Plate must be at least 6 characters"),
  brand: zod.string().min(2, "Brand must be at least 2 characters"),
  model: zod.string().min(2, "Model must be at least 2 characters"),
  year: zod.coerce.number().min(1900, "Year must be at least 1900"),
  color: zod.string().min(2, "Color must be at least 2 characters"),
  kilometers: zod.coerce.number().min(0, "Kilometers must be at least 0"),
  engine: zod.string().min(2, "Engine must be at least 2 characters"),
  transmission: zod.string().min(2, "Transmission must be at least 2 characters"),
  photos: zod.array(zod.string()).min(1, "At least one photo is required").optional(),
});

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
      return vehicle.photos && vehicle.photos[0]
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

export const createVehicleModel = (data: VehicleSnapshotIn): Vehicle => VehicleModel.create(data)