import { VehicleModel } from "./Vehicle"

test("can be created", () => {
  const instance = VehicleModel.create({})

  expect(instance).toBeTruthy()
})

// @mst remove-file