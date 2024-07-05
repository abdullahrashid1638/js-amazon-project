export class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }

  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  addToCart(productId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );

      if (quantitySelector) {
        matchingItem.quantity += Number(quantitySelector.value);
      } else {
        matchingItem.quantity += 1;
      }
    } else {
      this.cartItems.push({ productId, quantity: 1, deliveryOptionId: "1" });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });

    this.cartItems = newCart;

    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        cartItem.quantity = newQuantity;
      }
    });
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (
      !matchingItem ||
      (deliveryOptionId !== "1" &&
        deliveryOptionId !== "2" &&
        deliveryOptionId !== "3")
    ) {
      return;
    }

    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }

  findItem(productId) {
    let matchingItem;

    cart.cartItems.forEach((item) => {
      if (item.productId = productId) {
        matchingItem = item;
      }
    });

    return matchingItem;
  }

  resetCart() {
    this.cartItems = [];
    this.saveToStorage();
  }
}

export const cart = new Cart("cart-oop");
