import { formatCurrency } from "../scripts/utils/money.js";

// base cases
if(formatCurrency(2045) === "20.45"){
  console.log("Test Passed: formatCurrency(20.45) returns 20.45");
}else{
console.log("Test Failed: formatCurrency(20.45) does not return 20.45");
}

// edge cases
if(formatCurrency(0) === "0.00"){
    console.log("Test Passed: formatCurrency(0) returns 0.00");
}else{
  console.log("Test Failed: formatCurrency(0) does not return 0.00");
}