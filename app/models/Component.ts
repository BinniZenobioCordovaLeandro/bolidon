import { formatDate } from "app/utils/formatDate"
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"


// "service": "oilAndOilFilterChange",
// "component": "engine",
// "frequencyMiles": 7500.0,
// "milesToService": 500.0,
// "lastServiceMiles": 5000.0,
// "estimatedDueDate": 1728940800,
// "urgencyLevel": "high",
// "priorityLevel": "high",
// "costEstimate": 70.0,
// "serviceLocation": "Local Auto Repair Shop",
// "userRating": 4.8,
// "warrantyCoverage": false,
// "recommendedServiceProviders": [
//   "QuickLube",
//   "SpeedyOil"
// ],
// "nextNotification": 1728316800,
// "diyGuideLink": "https://www.example.com/diy-oil-change",
// "notes": "Frequency depends on oil type and driving conditions."

export const ComponentModel = types
  .model("Component")
  .props({
    service: types.maybe(types.string),
    component: types.maybe(types.string),
    frequencyMiles: types.maybe(types.number),
    milesToService: types.maybe(types.number),
    lastServiceMiles: types.maybe(types.number),
    estimatedDueDate: types.maybe(types.number),
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
      try {
        if (!component.estimatedDueDate) return ""
        return formatDate(new Date(component.estimatedDueDate * 1000).toISOString())
      } catch (error) {
        return ""
      }
    },
  }))

export interface Component extends Instance<typeof ComponentModel> { }
export interface ComponentSnapshotOut extends SnapshotOut<typeof ComponentModel> { }
export interface ComponentSnapshotIn extends SnapshotIn<typeof ComponentModel> { }
