"use client";

import { useRouter } from "next/navigation";

export const AddExpenseButton = () => {
  const router = useRouter();
  return (
    <button
      type="button"
      className="bg-amber-500 p-2 rounded-lg text-white font-bold w-full md:w-auto text-center"
      onClick={() => router.push("?newExpense=true&showModal=true")}
    >
      Crear Gasto
    </button>
  );
};
