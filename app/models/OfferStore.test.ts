import { OfferStoreModel } from "./OfferStore"

test("can be created", () => {
  const instance = OfferStoreModel.create({})

  expect(instance).toBeTruthy()
})

// @mst remove-file