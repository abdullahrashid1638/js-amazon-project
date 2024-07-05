import { orders } from "../data/orders.js";
import { cart } from "../data/cart-class.js";
import { convertDate } from "./utils/convertDate.js";
import formatCurrency from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";

async function loadPage () {

  await loadProductsFetch();

  let ordersContainerHTML = "";

  orders.forEach((order) => {

    let ordersGridHTML = "";

    order.products.forEach((product) => {

      const matchingProduct = getProduct(product.productId);
      const deliveryDate = convertDate(product.estimatedDeliveryTime);
      const productQuantity = product.quantity;

      ordersGridHTML += `
        <div class="product-image-container">
          <img src=${matchingProduct.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryDate}
          </div>
          <div class="product-quantity">
            Quantity: ${productQuantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" 
          data-product-id=${product.productId}>
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
            <button class="track-package-button button-secondary js-track-package"
            data-order-id="${order.id}" data-product-id="${product.productId}">
              Track package
            </button>
        </div>
      `
    });


    const orderTime = convertDate(order.orderTime);
    const totalOrderPrice = formatCurrency(order.totalCostCents);

    ordersContainerHTML += `
      <div class="order-container">
        
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${totalOrderPrice}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-detail-grid">
          ${ordersGridHTML}
        </div>
      </div>
    `
  });

  document.querySelector(".js-order-grid").innerHTML = ordersContainerHTML;

  document.querySelectorAll(".js-buy-again-button").forEach((button) => {
    const productId = button.dataset.productId;
    button.addEventListener("click", () => {
      cart.addToCart(productId);

      button.innerHTML = 'Added';
      setTimeout(() => {
        button.innerHTML = `
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        `;
      }, 1000);
    });
  });

  document.querySelectorAll(".js-track-package").forEach((button) => {
    const orderId = button.dataset.orderId;
    const productId = button.dataset.productId;
  
    button.addEventListener("click", (event) => {
      event.preventDefault();
      // Construct the URL with parameters
      const url = `tracking.html?orderId=${orderId}&productId=${productId}`;
  
      // Open the URL in a new tab (user preference)
      window.open(url, '_blank');
  
      // Alternative (open in current window, if preferred)
      // window.location.href = url;
  
      // Optional: Prevent default link behavior (if using an anchor tag)
      // event.preventDefault();  // Uncomment if using an anchor tag
    });
  });
  
}

document.querySelector(".js-cart-quantity").innerHTML = cart.calculateCartQuantity();

loadPage();