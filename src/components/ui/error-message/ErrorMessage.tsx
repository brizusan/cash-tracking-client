import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return (
    <p className="text-red-500 bg-red-100 text-sm font-semibold text-center py-2">
      {children}
    </p>
  );
};
