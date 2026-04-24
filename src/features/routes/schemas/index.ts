import { z } from "zod";

// ─── Route API Response (raw from Gateway) ────────────────────────────────────
// Real payload: { id, name, direction, schedule_time, vehicle_id, is_active }
export const routeApiSchema = z.object({
  id: z.string(),
  name: z.string(),
  direction: z.enum(["to_school", "from_school"]).optional().nullable(),
  schedule_time: z.string().optional().nullable(),
  vehicle_id: z.string().optional().nullable(),
  driver_id: z.string().optional().nullable(),
  school_id: z.string().optional().nullable(),
  is_active: z.boolean(),
  created_at: z.string().optional(),
});
export type RouteApi = z.infer<typeof routeApiSchema>;

// ─── Route Form Schema ────────────────────────────────────────────────────────
export const routeFormSchema = z.object({
  name: z.string().min(3, "Nombre identificatorio para la ruta (Ej. Norte-01)"),
  direction: z.enum(["to_school", "from_school"]),
  schedule_time: z.string().min(5, "Hora de inicio requerida (HH:MM)"),
  vehicle_id: z.string().optional(),
  driver_id: z.string().optional(),
  school_id: z.string().min(1, "Colegio es requerido"),
});
export type RouteForm = z.infer<typeof routeFormSchema>;

// ─── Stop Schema (Updated) ──────────────────────────────────────────────────
export const stopApiSchema = z.object({
  id: z.string().optional(),
  route_id: z.string().min(1, "Debe seleccionar una ruta de transporte"),
  student_id: z.string().min(1, "Debe seleccionar un estudiante para esta parada"),
  address: z.string().min(5, "La dirección debe tener al menos 5 caracteres"),
  order: z.coerce.number().int().min(1, "El orden debe ser un número entero positivo"),
  eta: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato de hora inválido (HH:MM)"),
  latitude: z.coerce.number().optional().nullable(),
  longitude: z.coerce.number().optional().nullable(),
});
export type StopApi = z.infer<typeof stopApiSchema>;

// ─── Backward-compat aliases ──────────────────────────────────────────────────
/** @deprecated Use RouteApi / RouteForm */
export const routeSchema = routeApiSchema;
export type RouteModel = RouteApi;

export const stopSchema = stopApiSchema;
export type StopModel = StopApi;
