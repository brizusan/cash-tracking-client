import { Budget } from "@/src/types";
import { formatCurrency } from "@/src/utils";
import Link from "next/link";
import { BudgetMenu } from "./BudgetMenu";

export const BudgetItem = ({ name, id, amount }: Budget) => {
  return (
    <li className="flex justify-between gap-x-6 p-5 ">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto space-y-2">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            <Link
              className="cursor-pointer hover:underline text-lg"
              href={`admin/budget/${id}`}
            >
              {name}
            </Link>
          </p>
          <p className="text-2xl font-bold text-amber-500">
            {formatCurrency(amount)}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-6">
        <BudgetMenu budgetId={id} />
      </div>
    </li>
  );
};
