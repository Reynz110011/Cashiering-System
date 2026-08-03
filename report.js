import { transactions, getTotalSales, getBestSeller } from "./transactions.js";

export function showAllTransactions() {
  const reportOutput = document.getElementById("reportOutput");

  if (transactions.length === 0) {
    reportOutput.textContent = "No transactions recorded yet.";
    return;
  }

  let output = "";
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    output += "Transaction #" + t.transactionId + " (" + t.date + ")\n";

    for (let j = 0; j < t.items.length; j++) {
      const item = t.items[j];
      output += "  - " + item.product_name + " x" + item.quantity +
        " = PHP " + item.subtotal.toFixed(2) + "\n";
    }

    output += "  Total: PHP " + t.totalAmount.toFixed(2) +
      " | Paid: PHP " + t.amountPaid.toFixed(2) +
      " | Change: PHP " + t.change.toFixed(2) + "\n\n";
  }

  reportOutput.textContent = output;
}

export function showTotalSales() {
  const reportOutput = document.getElementById("reportOutput");
  const totalSales = getTotalSales();

  reportOutput.textContent =
    "Total Sales for the Day: PHP " + totalSales.toFixed(2) +
    " (" + transactions.length + " transaction(s))";
}

export function showBestSeller() {
  const reportOutput = document.getElementById("reportOutput");

  if (transactions.length === 0) {
    reportOutput.textContent = "No transactions recorded yet.";
    return;
  }

  const result = getBestSeller();

  reportOutput.textContent =
    "Most Purchased Product: " + result.bestProduct +
    " (" + result.bestQuantity + " units sold)";
}
