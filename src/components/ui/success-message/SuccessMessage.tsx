export const SuccessMessage = ({ children }: { children: React.ReactNode }) => {
  return (
    <p className="text-green-500 bg-green-200 text-sm font-semibold text-center py-2">
      {children}
    </p>
  );
};
