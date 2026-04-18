import { z } from "zod";

// ─── API Response (raw from Gateway) ─────────────────────────────────────────
export const schoolApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  location: z
    .object({
      latitude: z.number(),
      longitude: z.number(),
    })
    .optional()
    .nullable(),
  contact_email: z.string().optional().nullable(),
  contact_phone: z.string().optional().nullable(),
  created_at: z.string().optional(),
});
export type SchoolApi = z.infer<typeof schoolApiSchema>;

// ─── Form Schema (for create/edit forms) ─────────────────────────────────────
export const schoolFormSchema = z.object({
  name: z.string().min(2, "El nombre de la escuela es muy corto"),
  address: z.string().min(5, "La dirección detallada es requerida"),
  contact_email: z.string().email("Correo electrónico no válido").optional().or(z.literal("")),
  contact_phone: z.string().min(7, "Teléfono de contacto inválido").optional().or(z.literal("")),
});
export type SchoolForm = z.infer<typeof schoolFormSchema>;

// ─── Backward-compat alias ────────────────────────────────────────────────────
/** @deprecated Use SchoolApi for API data, SchoolForm for forms */
export const schoolSchema = schoolApiSchema;
export type School = SchoolApi;
