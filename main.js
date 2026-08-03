import { addToTransaction, removeFromTransaction } from "./transaction.js";
import { checkout } from "./transactions.js";
import {
  renderProductTable,
  renderTransaction,
  renderReceipt,
  renderCheckoutError
} from "./render.js";
import { showAllTransactions, showTotalSales, showBestSeller } from "./report.js";


window.addEventListener("DOMContentLoaded", function () {
  renderProductTable(handleAddToTransaction);
  renderTransaction(handleRemoveFromTransaction);

  document.getElementById("checkoutBtn").addEventListener("click", handleCheckout);
  document.getElementById("viewAllBtn").addEventListener("click", showAllTransactions);
  document.getElementById("totalSalesBtn").addEventListener("click", showTotalSales);
  document.getElementById("bestSellerBtn").addEventListener("click", showBestSeller);
});


function handleAddToTransaction(productId, quantity) {
  addToTransaction(productId, quantity);
  renderTransaction(handleRemoveFromTransaction);
}


function handleRemoveFromTransaction(productId) {
  removeFromTransaction(productId);
  renderTransaction(handleRemoveFromTransaction);
}

    
function handleCheckout() {
  renderCheckoutError(""); 

  const paymentInput = document.getElementById("paymentInput");
  const amountPaid = parseFloat(paymentInput.value);

  const result = checkout(amountPaid);

  if (!result.success) {
    renderCheckoutError(result.errorMessage);
    return;
  }

  renderReceipt(result.transaction);

  paymentInput.value = "";
  renderTransaction(handleRemoveFromTransaction);
}
