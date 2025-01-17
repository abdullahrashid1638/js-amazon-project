import { cart } from "../data/cart-class.js";
import { products, loadProducts } from "../data/products.js";

loadProducts(renderProductsGrid);

function renderProductsGrid () {

  let productsHTML = "";

  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filteredProducts = products;

  if (search) {
    const lowerCaseSearch = search.toLowerCase(); // Convert search term to lowercase once
    filteredProducts = products.filter((product) => {
      const lowerCaseName = product.name.toLowerCase();
      const lowerCaseKeywords = product.keywords.map(keyword => keyword.toLowerCase());
      return (
        lowerCaseName.includes(lowerCaseSearch) ||
        lowerCaseKeywords.some(keyword => keyword.includes(lowerCaseSearch))
      );
    });
  }

  filteredProducts.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${
          product.id
        }">
          Add to Cart
        </button>
      </div>
    `;
  });


  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  function updateCartQuantity() {
    const cartQuantity = cart.calculateCartQuantity();
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
  }

  updateCartQuantity();

  function showMessage(addedMessageTimeoutId, productId) {
    document
      .querySelector(`.js-added-to-cart-${productId}`)
      .classList.add("show-added-to-cart-message");

    setTimeout(() => {
      // Check if a previous timeoutId exists. If it does,
      // we will stop it.
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        document
          .querySelector(`.js-added-to-cart-${productId}`)
          .classList.remove("show-added-to-cart-message");
      }, 2000);

      // Save the timeoutId so we can stop it later.
      addedMessageTimeoutId = timeoutId;
    });
  }

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    // This solution uses a feature of JavaScript called a
    // closure. Each time we run the loop, it will create
    // a new variable called addedMessageTimeoutId and do
    // button.addEventListener().
    //
    // Then, because of closure, the function we give to
    // button.addEventListener() will get a unique copy
    // of the addedMessageTimeoutId variable and it will
    // keep this copy of the variable forever.
    // (Reminder: closure = if a function has access to a
    // value/variable, it will always have access to that
    // value/variable).
    //
    // This allows us to create many unique copies of the
    // addedMessageTimeoutId variable (one for every time
    // we run the loop) so it lets us keep track of many
    // timeoutIds (one for each product).
    let addedMessageTimeoutId;

    button.addEventListener("click", () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);
      updateCartQuantity();
      showMessage(addedMessageTimeoutId, productId);
    });
  });
}

function handleUrl () {
  const url = `amazon.html?search=${document.querySelector(".js-search-bar").value}`;
  window.open(url);
}

document.querySelector(".js-search-button")
  .addEventListener("click", () => {
    handleUrl();
  });


document.querySelector(".js-search-bar")
  .addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleUrl();
    }
  });