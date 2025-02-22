import { z } from "zod";

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

export type Register = z.infer<typeof registerSchema>;
