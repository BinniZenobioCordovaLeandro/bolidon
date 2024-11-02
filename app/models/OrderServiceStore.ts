import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { OrderService, OrderServiceModel } from "./OrderService"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const OrderServiceStoreModel = types
  .model("OrderServiceStore")
  .props({
    selectedOrderService: types.safeReference(OrderServiceModel),
    orderServices: types.array(OrderServiceModel),
    favorites: types.array(types.reference(OrderServiceModel)),
    favoritesOnly: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchOrderServices(vehicleGuid?: string) {
      const response = await api.getOrderServices(vehicleGuid)
      if (response.kind === "ok") {
        store.setProp("orderServices", response.orderServices)
      } else {
        console.error(`Error fetching orderServices: ${JSON.stringify(response)}`)
      }
    },
    addFavorite(orderService: OrderService) {
      store.favorites.push(orderService)
    },
    removeFavorite(orderService: OrderService) {
      store.favorites.remove(orderService)
    },
    fetchOrderService(orderService: OrderService) {
      store.selectedOrderService = orderService
    }
  }))
  .views((store) => ({
    get orderServicesForList() {
      return store.favoritesOnly ? store.favorites : store.orderServices
    },

    hasFavorite(orderService: OrderService) {
      return store.favorites.includes(orderService)
    },
  }))
  .actions((store) => ({
    toggleFavorite(orderService: OrderService) {
      if (store.hasFavorite(orderService)) {
        store.removeFavorite(orderService)
      } else {
        store.addFavorite(orderService)
      }
    },
    editOrderService(orderService: OrderService) {
      store.fetchOrderService(orderService)
    }
  }))

export interface OrderServiceStore extends Instance<typeof OrderServiceStoreModel> { }
export interface OrderServiceSnapshot extends SnapshotOut<typeof OrderServiceStoreModel> { }
