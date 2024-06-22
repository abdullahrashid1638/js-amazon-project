import { getProduct } from "../../data/products.js";

describe("test suite: getProduct()", () => {
  it("returns the product with the given id", () => {
    const product = getProduct("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(product.id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});