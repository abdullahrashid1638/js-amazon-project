import { cart } from "../../data/cart-class.js";

describe("test suite: addToCart", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("add an existing product to the cart", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItems[0].quantity).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
      ])
    );
  });

  it("add a new product in the cart", () => {
    cart.cartItems = [];

    cart.addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItems.length).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItems[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart-oop",
      JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ])
    );
  });
});

describe("test suite: removeFromCart()", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("removes a product from the cart", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.removeFromCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");

    expect(cart.cartItems.length).toEqual(0);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith("cart-oop", JSON.stringify([]));
  });

  it("removes the product that is not in cart", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      }
    ];
    
    cart.removeFromCart("not-in-cart");
  
    expect(cart.cartItems.length).toEqual(1);
  
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  
    expect(localStorage.setItem).toHaveBeenCalledWith("cart-oop", JSON.stringify([
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      }
    ]));
  
    expect(cart.cartItems[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
  });
});

describe("test suite: updateDeliveryOption()", () => {
  beforeEach(() => {
    spyOn(localStorage, "setItem");
  });

  it("updates the delivery option", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "3");

    expect(cart.cartItems[0].deliveryOptionId).toEqual("3");

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith("cart-oop", JSON.stringify([
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "3",
      }
    ]));
  });

  it ("updates the delivery option for a product that is not in the cart", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.updateDeliveryOption("not-in-cart", "3");

    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it ("checks the function with wrong deliveryOptionId", () => {
    cart.cartItems = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
        deliveryOptionId: "1",
      },
    ];

    cart.updateDeliveryOption("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", "wrong-id");

    expect(cart.cartItems[0].deliveryOptionId).toEqual("1");

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});
