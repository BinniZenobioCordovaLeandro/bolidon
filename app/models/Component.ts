import { formatDate } from "app/utils/formatDate"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

export const ComponentModel = types
  .model("Component")
  .props({
    service: types.maybe(types.string),
    component: types.maybe(types.string),
    frequencyMiles: types.maybe(types.number),
    milesToService: types.maybe(types.number),
    lastServiceMiles: types.maybe(types.number),
    estimatedDueDate: types.maybe(types.string),
    urgencyLevel: types.maybe(types.string),
    priorityLevel: types.maybe(types.string),
    costEstimate: types.maybe(types.number),
    serviceLocation: types.maybe(types.string),
    userRating: types.maybe(types.number),
    warrantyCoverage: types.maybe(types.boolean),
    recommendedServiceProviders: types.maybe(types.array(types.string)),
    nextNotification: types.maybe(types.number),
    diyGuideLink: types.maybe(types.string),
    notes: types.maybe(types.string),
  })
  .actions(withSetPropAction)
  .views((component) => ({
    get parsedServiceComponent() {
      if (!component.service || !component.component) return ""
      return `${component.service} - ${component.component}`
    },
    get estimatedDueDateFormatted() {
      return component.estimatedDueDate ? formatDate(component.estimatedDueDate) : ""
    },
    get priorityLevelColor() {
      if (component.priorityLevel === "high") return "red"
      if (component.priorityLevel === "medium") return "yellow"
      if (component.priorityLevel === "low") return "green"
      return "grey"
    },
  }))

export interface Component extends Instance<typeof ComponentModel> { }
export interface ComponentSnapshotOut extends SnapshotOut<typeof ComponentModel> { }
export interface ComponentSnapshotIn extends SnapshotIn<typeof ComponentModel> { }
