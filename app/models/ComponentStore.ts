import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { api } from "../services/api"
import { ComponentModel } from "./Component"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ComponentStoreModel = types
  .model("ComponentStore")
  .props({
    components: types.array(ComponentModel),
  })
  .actions(withSetPropAction)
  .actions((store) => ({
    async fetchComponents() {
      const response = await api.getComponents()
      if (response.kind === "ok") {
        console.log(`Fetched components: ${response.components.length}`);
        store.setProp("components", response.components)
      } else {
        console.error(`Error fetching components: ${JSON.stringify(response)}`)
      }
    },
  }))

export interface ComponentStore extends Instance<typeof ComponentStoreModel> { }
export interface ComponentStoreSnapshot extends SnapshotOut<typeof ComponentStoreModel> { }
