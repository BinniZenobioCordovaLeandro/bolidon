import { UserModel } from "./User"

test("can be created", () => {
  const instance = UserModel.create({
    guid: "1",
    email: "",
    name: "",
    photo: "",
    isCollaborator: false,
    lastLogin: new Date(),
  })

  expect(instance).toBeTruthy()
})
