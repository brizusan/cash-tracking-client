import type { Budget } from "../types";

export const formatCurrency = (amount: Budget["amount"]) => {
  return amount.toLocaleString("pe-PE", { style: "currency", currency: "PEN" });
};
