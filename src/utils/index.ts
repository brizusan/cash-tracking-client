import type { Budget, ResponseExpense } from "../types";

export const formatCurrency = (
  amount: Budget["amount"] | ResponseExpense["amount"]
) => {
  return amount.toLocaleString("pe-PE", { style: "currency", currency: "PEN" });
};
