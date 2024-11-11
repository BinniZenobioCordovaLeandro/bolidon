import { api } from "@/services/api"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { OfferModel, OfferSnapshotOut } from "./Offer"

/**
 * Model description here for TypeScript hints.
 */
export const OfferStoreModel = types
  .model("OfferStore")
  .props({
    offers: types.array(OfferModel),
  })
  .actions(withSetPropAction)
  .views(() => ({}))
  .actions((store) => ({
    async fetchOffers() {
      const response = await api.getOffers()
      if (response.kind === "ok") {
        store.setProp("offers", response.offers)
      } else {
        console.error(`Error fetching offers: ${JSON.stringify(response)}`)
      }
    },
    async createOffer(data: OfferSnapshotOut) {
      const response = await api.createOffer(data)
      if (response.kind === "ok") {
        store.setProp("offers", [...store.offers, response.offer])
      } else {
        console.error(`Error creating offer: ${JSON.stringify(response)}`)
      }
    }
  }))

export interface OfferStore extends Instance<typeof OfferStoreModel> {}
export interface OfferStoreSnapshot extends SnapshotOut<typeof OfferStoreModel> {}
