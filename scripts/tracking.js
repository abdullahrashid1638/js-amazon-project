import { findOrder } from '../data/orders.js';
import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { cart } from '../data/cart-class.js';

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  console.log(orderId);
  console.log(productId);

  const order = findOrder(orderId);
  const product = getProduct(productId);

  console.log(order);

  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;

  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  function calculateDeliveryProgress () {
    const currentTime = new Date().getTime();
    const orderTime = new Date(order.orderTime).getTime();
    const deliveryTime = new Date(productDetails.estimatedDeliveryTime).getTime();

    const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

    return deliveryProgress;
  }

  const deliveryProgress = calculateDeliveryProgress();

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      Arriving on ${
        dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
      }
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label 
      ${deliveryProgress <= 49 ? "current-status" : ""}">
        Preparing
      </div>
      <div class="progress-label 
      ${deliveryProgress > 49 && deliveryProgress <= 90 ? "current-status" : ""}">
        Shipped
      </div>
      <div class="progress-label 
      ${deliveryProgress === 100 ? "current-status" : ""}">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${deliveryProgress}%;"></div>
    </div>
  `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
}

document.querySelector(".js-cart-quantity").innerHTML = cart.calculateCartQuantity();

loadPage();