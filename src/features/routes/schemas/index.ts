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
  school_id: z.string().optional(),
});
export type RouteForm = z.infer<typeof routeFormSchema>;

// ─── Stop Schema (unchanged structure) ───────────────────────────────────────
export const stopApiSchema = z.object({
  id: z.string().optional(),
  route_id: z.string().min(1, "Ruta principal obligatoria"),
  name: z.string().min(2, "Nombre de parada"),
  address: z.string().min(5, "Dirección o referencia"),
  order: z.number().int().min(1, "Orden de paso"),
  eta: z.string().optional().nullable(),
});
export type StopApi = z.infer<typeof stopApiSchema>;

// ─── Backward-compat aliases ──────────────────────────────────────────────────
/** @deprecated Use RouteApi / RouteForm */
export const routeSchema = routeApiSchema;
export type RouteModel = RouteApi;

export const stopSchema = stopApiSchema;
export type StopModel = StopApi;
