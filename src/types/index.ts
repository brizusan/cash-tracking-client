import { z } from "zod";

// Schemas Auth - Register - Login
export const registerSchema = z
  .object({
    email: z
      .string()
      .email({ message: "Email no valido" })
      .min(3, { message: "El campo email es obligatorio" }),
    name: z.string().min(3, { message: "El campo nombre es obligatorio" }),
    password: z.string().min(8, { message: "Password Minimo de 8 caracteres" }),
    password_confirm: z
      .string()
      .nonempty({ message: "El campo confirmar password es obligatorio" })
      .optional(),
  })
  .refine((data) => data.password === data.password_confirm, {
    message: "Las contraseñas no coinciden",
    path: ["password_confirm"],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "El campo email es obligatorio" })
    .email({ message: "Email no valido" }),
  password: z.string().min(8, { message: "Password Minimo de 8 caracteres" }),
});

export const emailValidateSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "El campo email es obligatorio" })
    .email({ message: "Email no valido" }),
});

export const tokenSchema = z
  .string()
  .min(6, { message: "Token no valido" })
  .max(6, { message: "Token no valido" });

export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
});

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, { message: "El Password debe ser de al menos 8 caracteres" }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Los Passwords no son iguales",
    path: ["password_confirmation"],
  });

export type Email = z.infer<typeof emailValidateSchema>;
export type Register = z.infer<typeof registerSchema>;
export type User = z.infer<typeof userSchema>;

// Schemas Budget
export const DraftBudgetSchema = z.object({
  name: z
    .string()
    .min(1, { message: "El Nombre del presupuesto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const BudgetSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.coerce.number(),
  userID: z.number(),
});

export const passwordSchema = z
  .string()
  .min(8, { message: "Password Minimo de 8 caracteres" });

export const ArrayBudgetSchema = z.array(BudgetSchema);

export type Budget = z.infer<typeof BudgetSchema>;

// Schemas and Types Expense
export const DraftExpenseSchema = z.object({
  name: z.string().min(1, { message: "El Nombre del gasto es obligatorio" }),
  amount: z.coerce
    .number({ message: "Cantidad no válida" })
    .min(1, { message: "Cantidad no válida" }),
});

export const ExpenseSchema = z.object({
  id: z.number(),
  name: z.string(),
  amount: z.coerce.number(),
  budgetID: z.number(),
});

export type Expense = z.infer<typeof DraftExpenseSchema>;
export type ResponseExpense = z.infer<typeof ExpenseSchema>;
export const ArrayExpenseSchema = z.array(ExpenseSchema);
export type Expenses = z.infer<typeof ArrayExpenseSchema>;
export type BudgetResponse = z.infer<typeof BudgetSchema> & {
  expenses: Expenses;
};
