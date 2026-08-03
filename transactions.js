
import { currentTransaction, calculateTransactionTotal, clearTransaction } from "./transaction.js";

export let transactions = [];
let transactionCounter = 1;


export function checkout(amountPaid) {
  if (currentTransaction.length === 0) {
    return { success: false, errorMessage: "Transaction is empty. Add products before checking out." };
  }

  if (isNaN(amountPaid) || amountPaid <= 0) {
    return { success: false, errorMessage: "Please enter a valid payment amount." };
  }

  const total = calculateTransactionTotal();

  if (amountPaid < total) {
    return { success: false, errorMessage: "Insufficient payment. Amount paid is less than the total." };
  }

  const change = amountPaid - total;

  
  const itemsCopy = [];
  for (let i = 0; i < currentTransaction.length; i++) {
    itemsCopy.push({
      product_id: currentTransaction[i].product_id,
      product_name: currentTransaction[i].product_name,
      product_price: currentTransaction[i].product_price,
      quantity: currentTransaction[i].quantity,
      subtotal: currentTransaction[i].subtotal
    });
  }

  const newTransaction = {
    transactionId: transactionCounter,
    date: new Date().toLocaleString(),
    items: itemsCopy,
    totalAmount: total,
    amountPaid: amountPaid,
    change: change
  };

  transactions.push(newTransaction);
  transactionCounter++;

  clearTransaction();

  return { success: true, transaction: newTransaction };
}



export function getTotalSales() {
  let totalSales = 0;
  for (let i = 0; i < transactions.length; i++) {
    totalSales += transactions[i].totalAmount;
  }
  return totalSales;
}

export function getBestSeller() {
  
  const productTotals = {};

  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    for (let j = 0; j < t.items.length; j++) {
      const item = t.items[j];

      if (productTotals[item.product_name] === undefined) {
        productTotals[item.product_name] = 0;
      }
      productTotals[item.product_name] += item.quantity;
    }
  }

  let bestProduct = "";
  let bestQuantity = 0;

  for (const productName in productTotals) {
    if (productTotals[productName] > bestQuantity) {
      bestQuantity = productTotals[productName];
      bestProduct = productName;
    }
  }

  return { bestProduct: bestProduct, bestQuantity: bestQuantity };
}
