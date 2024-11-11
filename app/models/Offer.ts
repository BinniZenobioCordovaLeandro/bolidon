import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import * as zod from 'zod'
import { withSetPropAction } from "./helpers/withSetPropAction"

export const offerSchema = zod.object({
  title: zod.string().min(2, "Title must be at least 2 characters"),
  description: zod.string().min(2, "Description must be at least 2 characters"),
  price: zod.coerce.number().min(0, "Price must be at least 0"),
})

export const OfferModel = types
  .model("Offer")
  .props({
    guid: types.identifier,
    title: types.maybe(types.string),
    description: types.maybe(types.string),
    price: types.maybe(types.number),
    pubDate: types.optional(types.Date, () => new Date()),
  })
  .actions(withSetPropAction)
  .views(() => ({}))
  .actions(() => ({}))

export interface Offer extends Instance<typeof OfferModel> {}
export interface OfferSnapshotOut extends SnapshotOut<typeof OfferModel> {}
export interface OfferSnapshotIn extends SnapshotIn<typeof OfferModel> {}
export const createOfferDefaultModel = () => types.optional(OfferModel, {})

export const createOfferModel = (data: OfferSnapshotIn): Offer => {
  return OfferModel.create({
    guid: data.guid || "",
    title: data.title || "",
    description: data.description || "",
    price: data.price || 0,
    pubDate: data.pubDate || new Date(),
  })
}