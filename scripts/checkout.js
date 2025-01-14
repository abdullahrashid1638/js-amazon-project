import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCartFetch } from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage () {
  try {
    await Promise.all([
      loadProductsFetch(),
      loadCartFetch(),
    ]);

  } catch (error) {
    console.log("Unexpected error. Please try again later");
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage()

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve("value2");
    });
  }),

]).then((values) => {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve("value1");
  });

}).then((value) => {
  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

/*
const xhr = new XMLHttpRequest(); // Create the request
xhr.addEventListener("load", () => { // Add event listner to the request
  console.log(xhr.response);
});
xhr.open("GET", "https://supersimplebackend.dev/greeting"); // Open the request with request type and URL
xhr.send(); // Send the request
*/

/*
fetch("https://supersimplebackend.dev/greeting")
  .then((response) => {
    return response.text();
  })
  .then((greeting) => {
    console.log(greeting);
  });
*/

/*
async function getGreetings () {
  const response = await fetch("https://supersimplebackend.dev/greeting");
  const greetings = await response.text();
  console.log(greetings);
}

getGreetings();
*/

/*
async function sendJSON () {
  const postRequest = await fetch("https://supersimplebackend.dev/greeting", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Abdullah",
    }),
  });

  const response = await postRequest.text();
  console.log(response);
}

sendJSON();
*/

/*
async function createBadRequest () {
  try {
    const response = await fetch("https://supersimplebackend.dev/greeting", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (response.status >= 400) throw response;

    const text = await response.text();
    console.log(text);

  } catch (error) {
    if (error.status === 400) {
      const errorMessage = await error.json();
      console.log(errorMessage);
    } else {
      console.log("Network error. Please try again later")
    };
  }
}

createBadRequest();
*/