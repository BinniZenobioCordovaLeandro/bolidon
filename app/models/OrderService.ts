import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import * as zod from 'zod'
import { translate } from "../i18n"
import { formatDate } from "../utils/formatDate"
import { ComponentModel, componentSchema } from "./Component"
import { withSetPropAction } from "./helpers/withSetPropAction"


export const orderServiceSchema = zod.object({
  title: zod.string().min(6, "Title must be at least 6 characters"),
  subtitle: zod.string().min(6, "Subtitle must be at least 6 characters"),
  pubDate: zod.string().min(6, "Publication date must be at least 6 characters"),
  kilometers: zod.coerce.number().min(0, "Kilometers must be at least 0"),
  thumbnail: zod.string().min(6, "Thumbnail must be at least 6 characters"),
  description: zod.string().min(6, "Description must be at least 6 characters"),
  components: zod.array(componentSchema),
  photos: zod.array(zod.string().min(1, "Photos must be at least 6 characters")),
  price: zod.coerce.number().min(0, "Price must be at least 0"),
});

export const OrderServiceModel = types
  .model("OrderService")
  .props({
    guid: types.identifier,
    title: types.maybeNull(types.string),
    subtitle: types.maybeNull(types.string),
    pubDate: types.string,
    kilometers: types.integer,
    thumbnail: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    components: types.array(ComponentModel),
    photos: types.array(types.string),
    price: types.integer,
  })
  .actions(withSetPropAction)
  .views((orderService) => ({
    get parsedTitleAndSubtitle() {
      const defaultValue = { title: orderService.title?.trim() }

      if (!defaultValue.title) return defaultValue

      const titleMatches = defaultValue.title.match(/^(RNR.*\d)(?: - )(.*$)/)

      if (!titleMatches || titleMatches.length !== 3) return defaultValue

      return { title: titleMatches[1], subtitle: titleMatches[2] }
    },
    get datePublished() {
      try {
        const formatted = formatDate(orderService.pubDate)
        return {
          textLabel: formatted,
          accessibilityLabel: translate("demoPodcastListScreen.accessibility.publishLabel", {
            date: formatted,
          }),
        }
      } catch (error) {
        return { textLabel: "", accessibilityLabel: "" }
      }
    },
  }))

export interface OrderService extends Instance<typeof OrderServiceModel> { }
export interface OrderServiceSnapshotOut extends SnapshotOut<typeof OrderServiceModel> { }
export interface OrderServiceSnapshotIn extends SnapshotIn<typeof OrderServiceModel> { }
export const createOrderServiceDefaultModel = () => types.optional(OrderServiceModel, {})
