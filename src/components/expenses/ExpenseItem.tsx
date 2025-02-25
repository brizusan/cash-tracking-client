import type { ResponseExpense } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import { ExpenseMenu } from "./ExpenseMenu";

type Props = {
  name: ResponseExpense["name"];
  id: ResponseExpense["id"];
  amount: ResponseExpense["amount"];
};

export const ExpenseItem = ({ name, id, amount }: Props) => {
  return (
    <li className="flex justify-between gap-x-6 p-5 ">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <p className="text-lg font-semibold leading-6 text-gray-900 capitalize">
            {name}
          </p>
          <p className="text-2xl font-bold text-amber-500">
            {formatCurrency(+amount)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <ExpenseMenu expenseId={id} />
      </div>
    </li>
  );
};
