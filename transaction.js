import { groceryItems } from "./products.js";

export let currentTransaction = [];


export function addToTransaction(productId, quantity) {
  
  let selectedProduct = null;
  for (let i = 0; i < groceryItems.length; i++) {
    if (groceryItems[i].product_id === productId) {
      selectedProduct = groceryItems[i];
      break;
    }
  }

  if (selectedProduct === null) {
    alert("Product not found.");
    return;
  }

  if (isNaN(quantity) || quantity <= 0) {
    alert("Please enter a valid quantity (1 or more).");
    return;
  }

  
  let alreadyInTransaction = false;
  for (let i = 0; i < currentTransaction.length; i++) {
    if (currentTransaction[i].product_id === selectedProduct.product_id) {
      currentTransaction[i].quantity += quantity;
      currentTransaction[i].subtotal = currentTransaction[i].quantity * currentTransaction[i].product_price;
      alreadyInTransaction = true;
      break;
    }
  }

  if (!alreadyInTransaction) {
    currentTransaction.push({
      product_id: selectedProduct.product_id,
      product_name: selectedProduct.product_name,
      product_price: selectedProduct.product_price,
      quantity: quantity,
      subtotal: selectedProduct.product_price * quantity
    });
  }
}


export function removeFromTransaction(productId) {
  const newTransactionItems = [];
  for (let i = 0; i < currentTransaction.length; i++) {
    if (currentTransaction[i].product_id !== productId) {
      newTransactionItems.push(currentTransaction[i]);
    }
  }
  
  currentTransaction.length = 0;
  for (let i = 0; i < newTransactionItems.length; i++) {
    currentTransaction.push(newTransactionItems[i]);
  }
}


export function calculateTransactionTotal() {
  let total = 0;
  for (let i = 0; i < currentTransaction.length; i++) {
    total += currentTransaction[i].subtotal;
  }
  return total;
}


export function clearTransaction() {
  currentTransaction.length = 0;
}
