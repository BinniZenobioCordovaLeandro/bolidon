import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { formatDate } from "../utils/formatDate"
import { translate } from "../i18n"
import { ComponentModel } from "./Component"


/**
 * This represents an episode of React Native Radio.
 */
export const OrderServiceModel = types
  .model("OrderService")
  .props({
    guid: types.identifier,
    title: types.maybeNull(types.string),
    subtitle: types.maybeNull(types.string),
    pubDate: types.string,
    kilometers: types.integer,
    author: types.maybeNull(types.string),
    thumbnail: types.maybeNull(types.string),
    description: types.maybeNull(types.string),
    components: types.array(ComponentModel),
    photos: types.array(types.string),
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

export interface OrderService extends Instance<typeof OrderServiceModel> {}
export interface OrderServiceSnapshotOut extends SnapshotOut<typeof OrderServiceModel> {}
export interface OrderServiceSnapshotIn extends SnapshotIn<typeof OrderServiceModel> {}
