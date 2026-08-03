// render.js
// All functions that build/update the DOM live here.

import { groceryItems } from "./products.js";
import { currentTransaction, calculateTransactionTotal } from "./transaction.js";

// Draws the product catalog table.
// "onAddClick" is a function passed in from main.js, called when a row's
// Add button is clicked. This keeps render.js from needing to know about
// currentTransaction logic directly.
export function renderProductTable(onAddClick) {
  const tbody = document.getElementById("productTableBody");
  tbody.innerHTML = "";

  for (let i = 0; i < groceryItems.length; i++) {
    const item = groceryItems[i];

    const row = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContent = item.product_id;

    const nameCell = document.createElement("td");
    nameCell.textContent = item.product_name;

    const priceCell = document.createElement("td");
    priceCell.textContent = "PHP " + item.product_price.toFixed(2);

    const qtyCell = document.createElement("td");
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.value = "1";
    qtyInput.className = "qtyInput";
    qtyInput.id = "qty-" + item.product_id;
    qtyCell.appendChild(qtyInput);

    const actionCell = document.createElement("td");
    const addButton = document.createElement("button");
    addButton.textContent = "Add";
    addButton.className = "addBtn";
    addButton.addEventListener("click", function () {
      const quantity = parseInt(qtyInput.value);
      onAddClick(item.product_id, quantity);
    });
    actionCell.appendChild(addButton);

    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(qtyCell);
    row.appendChild(actionCell);

    tbody.appendChild(row);
  }
}

// Draws the current currentTransaction list + total.
// "onRemoveClick" is called with the product_id when Remove is clicked.
export function renderTransaction(onRemoveClick) {
  const transactionList = document.getElementById("transactionList");
  transactionList.innerHTML = "";

  if (currentTransaction.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No items yet.";
    transactionList.appendChild(emptyItem);
  } else {
    for (let i = 0; i < currentTransaction.length; i++) {
      const lineItem = currentTransaction[i];

      const li = document.createElement("li");

      const infoSpan = document.createElement("span");
      infoSpan.textContent =
        lineItem.product_name + " x" + lineItem.quantity +
        " = PHP " + lineItem.subtotal.toFixed(2);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.className = "removeBtn";
      removeButton.addEventListener("click", function () {
        onRemoveClick(lineItem.product_id);
      });

      li.appendChild(infoSpan);
      li.appendChild(removeButton);
      transactionList.appendChild(li);
    }
  }

  const total = calculateTransactionTotal();
  document.getElementById("transactionTotal").textContent =
    "Total: PHP " + total.toFixed(2);
}

// Displays the receipt after a successful checkout.
export function renderReceipt(transaction) {
  const receiptDiv = document.getElementById("receipt");
  receiptDiv.style.display = "block";

  let receiptText = "=== TRANSACTION COMPLETED ===\n";
  receiptText += "Transaction ID: " + transaction.transactionId + "\n";
  receiptText += "Date: " + transaction.date + "\n";
  receiptText += "-------------------------------\n";

  for (let i = 0; i < transaction.items.length; i++) {
    const item = transaction.items[i];
    receiptText += item.product_name + " x" + item.quantity +
      " = PHP " + item.subtotal.toFixed(2) + "\n";
  }

  receiptText += "-------------------------------\n";
  receiptText += "Total Amount: PHP " + transaction.totalAmount.toFixed(2) + "\n";
  receiptText += "Amount Paid: PHP " + transaction.amountPaid.toFixed(2) + "\n";
  receiptText += "Change: PHP " + transaction.change.toFixed(2) + "\n";
  receiptText += "===============================";

  receiptDiv.textContent = receiptText;
}

// Shows an error message under the checkout form.
export function renderCheckoutError(message) {
  document.getElementById("checkoutError").textContent = message;
}
