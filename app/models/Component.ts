import { formatDate } from "app/utils/formatDate";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import * as zod from 'zod';
import { withSetPropAction } from "./helpers/withSetPropAction";

export const componentSchema = zod.object({
  service: zod.string().optional(),
  component: zod.string().min(6, "Component must be at least 6 characters"),
  frequencyMiles: zod.number().optional(),
  milesToService: zod.number().optional(),
  lastServiceMiles: zod.number().optional(),
  estimatedDueDate: zod.string().optional(),
  urgencyLevel: zod.number().min(0).max(3),
  priorityLevel: zod.string().optional(),
  costEstimate: zod.number().optional(),
  serviceLocation: zod.string().optional(),
  userRating: zod.number().optional(),
  warrantyCoverage: zod.boolean().optional(),
  recommendedServiceProviders: zod.array(zod.string()).optional(),
  nextNotification: zod.number().optional(),
  diyGuideLink: zod.string().optional(),
  notes: zod.string().optional(),
});

export const ComponentModel = types
  .model("Component")
  .props({
    service: types.maybe(types.string),
    component: types.maybe(types.string),
    frequencyMiles: types.maybe(types.number),
    milesToService: types.maybe(types.number),
    lastServiceMiles: types.maybe(types.number),
    estimatedDueDate: types.maybe(types.string),
    urgencyLevel: types.maybe(types.number),
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
