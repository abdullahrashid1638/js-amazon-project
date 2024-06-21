import formatCurrency from "../../scripts/utils/money.js";

console.log("test suite: 'formatCurrency(priceCents)':");

console.log("convert cents into dollars:");

if (formatCurrency(2095) === "20.95") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("test the number 0:");

if (formatCurrency(0) === "0.00") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds up to the nearest cents:");

if (formatCurrency(2000.5) === "20.01") {
  console.log("passed");
} else {
  console.log("failed");
}

console.log("rounds down to nearest cents:");

if (formatCurrency(2000.4) === "20.00") {
  console.log("passed");
} else {
  console.log("failed");
}
