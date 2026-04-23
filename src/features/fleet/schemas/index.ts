import { z } from "zod";

// ─── Vehicle API Response (raw from Gateway) ──────────────────────────────────
export const vehicleApiSchema = z.object({
  id: z.string(),
  plate: z.string(),
  brand: z.string(),
  model: z.string(),
  year: z.number().optional().nullable(),
  capacity: z.number().int(),
  status: z.enum(["active", "maintenance", "inactive"]),
  driver_id: z.string().optional().nullable(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});
export type VehicleApi = z.infer<typeof vehicleApiSchema>;

// ─── Vehicle Form Schema ──────────────────────────────────────────────────────
export const vehicleFormSchema = z.object({
  plate: z.string().min(6, "Placa requerida (Ej. ABC-1234)"),
  brand: z.string().min(2, "Marca requerida"),
  model: z.string().min(2, "Modelo requerido"),
  year: z.number().int().min(2000).max(2030).optional(),
  capacity: z.number().int().min(1, "La capacidad debe ser mayor a 0"),
  status: z.enum(["active", "maintenance", "inactive"]),
  driver_id: z.string().optional(),
});
export type VehicleForm = z.infer<typeof vehicleFormSchema>;

// ─── Driver API Response (raw from Gateway) ───────────────────────────────────
export const driverApiSchema = z.object({
  id: z.string(),
  user_id: z.string().optional().nullable(),
  // Note: name/phone come from user record, not driver profile. May be absent in list.
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  license_number: z.string(),
  license_type: z.string().optional().nullable(),
  license_expiry: z.string().optional().nullable(),
  status: z.enum(["active", "inactive", "on_leave"]),
});
export type DriverApi = z.infer<typeof driverApiSchema>;

// ─── Driver Form Schema ───────────────────────────────────────────────────────
export const driverFormSchema = z.object({
  user_id: z.string().min(1, "Seleccione un usuario"),
  license_number: z.string().min(5, "Número de licencia requerido"),
  license_type: z.string().min(1, "Tipo de licencia requerido"),
  license_expiry: z.string().min(1, "Fecha de vencimiento requerida"),
  cedula_id: z.string().min(10, "Cédula requerida (10 dígitos)"),
  emergency_phone: z.string().min(7, "Teléfono de emergencia requerido"),
  status: z.enum(["active", "inactive", "on_leave"]),
});
export type DriverForm = z.infer<typeof driverFormSchema>;

// ─── Backward-compat aliases ──────────────────────────────────────────────────
/** @deprecated Use VehicleApi / VehicleForm */
export const vehicleSchema = vehicleApiSchema;
export type Vehicle = VehicleApi;

/** @deprecated Use DriverApi / DriverForm */
export const driverSchema = driverApiSchema;
export type Driver = DriverApi;
