"use client";
import {
  DeleteExpenseForm,
  EditExpenseForm,
  NewExpenseForm,
} from "@/src/components";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { Fragment } from "react";

export const ModalContainer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // Mostrar - Ocultar modal por url
  const showModal = searchParams.get("showModal");
  const show = showModal ? true : false;

  //Componente de agregar Gasto
  const newExpense = searchParams.get("newExpense");
  const editExpense = searchParams.get("editExpense");

  const getComponentName = () => {
    if (newExpense) return "newExpense";
    if (editExpense) return "editExpense";
    return null;
  };

  const componentName = getComponentName();
  const componentsMap: Record<string, React.FC> = {
    newExpense: NewExpenseForm,
    editExpense: EditExpenseForm,
    deleteExpense: DeleteExpenseForm,
  };

  const ComponentToRender = componentName ? componentsMap[componentName] : null;

  const closeModal = () => {
    const hideModal = new URLSearchParams(searchParams.toString());
    Array.from(hideModal.entries()).forEach(([key]) => {
      hideModal.delete(key);
    });
    router.replace(`${pathname}?${hideModal}`);
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-5xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                  {ComponentToRender !== null ? <ComponentToRender /> : null}
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
