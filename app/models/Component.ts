import { formatDate } from "app/utils/formatDate";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import * as zod from 'zod';
import { withSetPropAction } from "./helpers/withSetPropAction";

export const componentSchema = zod.object({
  component: zod.string().min(6, "Component must be at least 6 characters"),
  urgency: zod.string().min(3, "Urgency must be at least 3 characters"),
  notes: zod.string().optional(),
});

export const ComponentModel = types
  .model("Component")
  .props({
    component: types.maybeNull(types.string),
    urgency: types.enumeration(["alto", "medio", "bajo"]),
    notes: types.maybeNull(types.string),
    estimatedDueDate: types.maybeNull(types.Date),
  })
  .actions(withSetPropAction)
  .views((component) => ({
    get estimatedDueDateFormatted() {
      return component.estimatedDueDate ? formatDate(component.estimatedDueDate.toString()) : ""
    },
    get priorityLevelColor() {
      if (component.urgency === "high") return "red"
      if (component.urgency === "medium") return "yellow"
      if (component.urgency === "low") return "green"
      return "grey"
    },
  }))

export interface Component extends Instance<typeof ComponentModel> { }
export interface ComponentSnapshotOut extends SnapshotOut<typeof ComponentModel> { }
export interface ComponentSnapshotIn extends SnapshotIn<typeof ComponentModel> { }

