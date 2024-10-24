import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { Episode, OrderServiceModel } from "./Episode"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const OrderServiceStoreModel = types
  .model("EpisodeStore")
  .props({
    episodes: types.array(OrderServiceModel),
    favorites: types.array(types.reference(OrderServiceModel)),
    favoritesOnly: false,
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchOrderServices() {
      const response = await api.getOrderServices()
      if (response.kind === "ok") {
        store.setProp("episodes", response.episodes)
      } else {
        console.error(`Error fetching episodes: ${JSON.stringify(response)}`)
      }
    },
    addFavorite(episode: Episode) {
      store.favorites.push(episode)
    },
    removeFavorite(episode: Episode) {
      store.favorites.remove(episode)
    },
  }))
  .views((store) => ({
    get orderServicesForList() {
      return store.favoritesOnly ? store.favorites : store.episodes
    },

    hasFavorite(episode: Episode) {
      return store.favorites.includes(episode)
    },
  }))
  .actions((store) => ({
    toggleFavorite(episode: Episode) {
      if (store.hasFavorite(episode)) {
        store.removeFavorite(episode)
      } else {
        store.addFavorite(episode)
      }
    },
  }))

export interface OrderServiceStore extends Instance<typeof OrderServiceStoreModel> {}
export interface OrderServiceSnapshot extends SnapshotOut<typeof OrderServiceStoreModel> {}
