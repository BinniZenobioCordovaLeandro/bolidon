import { formatDate } from "app/utils/formatDate";
import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree";
import * as zod from 'zod';
import { withSetPropAction } from "./helpers/withSetPropAction";

export const componentSchema = zod.object({
  component: zod.string().min(6, "Component must be at least 6 characters"),
  estimatedDueDate: zod.string().optional(),
  urgencyLevel: zod.number().min(0).max(3),
  notes: zod.string().optional().optional(),
});

export const ComponentModel = types
  .model("Component")
  .props({
    component: types.maybeNull(types.string),
    urgencyLevel: types.enumeration(["high", "medium", "low"]),
    notes: types.maybeNull(types.string),
    estimatedDueDate: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((component) => ({
    get estimatedDueDateFormatted() {
      return component.estimatedDueDate ? formatDate(component.estimatedDueDate) : ""
    },
    get priorityLevelColor() {
      if (component.urgencyLevel === "high") return "red"
      if (component.urgencyLevel === "medium") return "yellow"
      if (component.urgencyLevel === "low") return "green"
      return "grey"
    },
  }))

export interface Component extends Instance<typeof ComponentModel> { }
export interface ComponentSnapshotOut extends SnapshotOut<typeof ComponentModel> { }
export interface ComponentSnapshotIn extends SnapshotIn<typeof ComponentModel> { }

