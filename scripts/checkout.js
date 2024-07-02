import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage () {
  try {
    // throw "error1";

    await loadProductsFetch();

    const value = await new Promise((resolve, reject) => {
      // throw "error2"; 1st way to create error
      loadCart(() => {
        // reject("error3"); // 2nd way to create an error
        resolve("value"); 
      });
    });

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