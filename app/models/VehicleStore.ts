import { api } from "app/services/api"
import { Instance, types } from "mobx-state-tree"
import { Vehicle, VehicleModel } from "./Vehicle"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const VehicleStoreModel = types
    .model("VehicleStore")
    .props({
        selectedVehicle: types.maybeNull(types.reference(VehicleModel)),
        vehicles: types.array(VehicleModel),
        favorites: types.array(types.reference(VehicleModel)),
        favoritesOnly: false,
    })
    .actions(withSetPropAction)
    .actions((store) => ({
        async fetchVehicles() {
            const response = await api.getVehicles()
            if (response.kind === "ok") {
                store.setProp("vehicles", response.vehicles)
            } else {
                console.error(`Error fetching vehicles: ${JSON.stringify(response)}`)
            }
        },
        addVehicle(vehicle: Vehicle) {
            store.vehicles.push(vehicle)
        },
        removeVehicle(vehicle: Vehicle) {
            store.vehicles.remove(vehicle)
        },
        addFavorite(vehicle: Vehicle) {
            store.favorites.push(vehicle)
        },
        removeFavorite(vehicle: Vehicle) {
            store.favorites.remove(vehicle)
        },
        selectVehicle(vehicle: Vehicle) {
            store.selectedVehicle = vehicle
        },
    }))
    .views((store) => ({
        get vehiclesForList() {
            return store.favoritesOnly ? store.favorites : store.vehicles
        },
        hasFavorite(vehicle: Vehicle) {
            return store.favorites.includes(vehicle)
        },
    }))
    .actions((store) => ({
        toggleFavorite(vehicle: Vehicle) {
            if (store.hasFavorite(vehicle)) {
                store.removeFavorite(vehicle)
            } else {
                store.addFavorite(vehicle)
            }
        },
        selectVehicle(vehicle: Vehicle) {
            store.selectVehicle(vehicle)
        },
    }))

export interface VehicleStore extends Instance<typeof VehicleStoreModel> { }
export interface VehicleStoreSnapshot extends Instance<typeof VehicleStoreModel> { }
