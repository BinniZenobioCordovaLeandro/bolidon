import { UserSnapshotIn, UserSnapshotOut } from "@/models";
import { apiDatabase } from "./database/firestore";

export const apiAuth = {
  updateUser : async (_token: string, updateUser: UserSnapshotOut ): Promise<UserSnapshotIn> => {
    const user = await apiDatabase.updateUser(updateUser);
    return user;
    }
};