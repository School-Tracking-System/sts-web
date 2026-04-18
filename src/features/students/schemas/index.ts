import { z } from "zod";

export const studentApiSchema = z.object({
  id: z.string(),
  user_id: z.string().optional().nullable(),
  first_name: z.string(),
  last_name: z.string(),
  grade: z.string().optional().nullable(),
  school_id: z.string(),
  route_id: z.string().optional().nullable(),
  pickup_address: z.string().optional().nullable(),
  status: z.enum(["active", "inactive"]),
  parent_name: z.string().optional().nullable(),
  parent_phone: z.string().optional().nullable(),
  cedula_id: z.string(),
});

export type StudentApi = z.infer<typeof studentApiSchema>;

export const studentFormSchema = z.object({
  first_name: z.string().min(2, "Nombre requerido"),
  last_name: z.string().min(2, "Apellido requerido"),
  grade: z.string().min(1, "Grado requerido (ej. 3ro EGB)"),
  school_id: z.string().uuid("Colegio inválido"),
  pickup_address: z.string().min(5, "Dirección requerida"),
  parent_name: z.string().min(2, "Nombre del representante requerido"),
  parent_phone: z.string().min(7, "Teléfono del representante requerido"),
  status: z.enum(["active", "inactive"]),
  cedula_id: z.string().min(5, "Identificación requerida (Cédula/Pasaporte)"),
});

export type StudentForm = z.infer<typeof studentFormSchema>;

// Backward-compat
/** @deprecated Use StudentApi */
export type Student = StudentApi;
/** @deprecated Use studentApiSchema */
export const studentSchema = studentApiSchema;
