import { OfferModel } from "./Offer"

test("can be created", () => {
  const instance = OfferModel.create({})

  expect(instance).toBeTruthy()
})

// @mst remove-file