"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApi } from "@/lib/api-client";
import { VehicleApi, DriverApi } from "@/features/fleet/schemas";

// ─── Response envelopes ───────────────────────────────────────────────────────
interface VehiclesListResponse {
  vehicles: VehicleApi[];
  total: number;
}

interface DriversListResponse {
  drivers: DriverApi[];
  total: number;
}

// ─── Vehicles ─────────────────────────────────────────────────────────────────
export async function getVehiclesAction(): Promise<VehicleApi[]> {
  try {
    const data = await fetchApi<VehiclesListResponse>("/fleet/vehicles");
    return data.vehicles ?? [];
  } catch (error) {
    console.error("[fleet] getVehicles error:", error);
    return [];
  }
}

export async function createVehicleAction(
  _prevState: any,
  formData: FormData
) {
  const plate = formData.get("plate") as string;
  const brand = formData.get("brand") as string;
  const model = formData.get("model") as string;
  const year = formData.get("year") ? Number(formData.get("year")) : undefined;
  const capacity = Number(formData.get("capacity"));
  const status = formData.get("status") as string || "active";

  if (!plate || !brand || !model || !capacity) {
    return { error: "Placa, marca, modelo y capacidad son obligatorios." };
  }

  try {
    await fetchApi<VehicleApi>("/fleet/vehicles", {
      method: "POST",
      body: JSON.stringify({ plate, brand, model, year, capacity, status }),
    });
  } catch (error: any) {
    console.error("[fleet] createVehicle error:", error.message);
    return { error: error.message || "Error al crear el vehículo." };
  }

  revalidatePath("/dashboard/fleet/vehicles");
  redirect("/dashboard/fleet/vehicles");
}

// ─── Drivers ──────────────────────────────────────────────────────────────────
export async function getDriversAction(): Promise<DriverApi[]> {
  try {
    const data = await fetchApi<DriversListResponse>("/fleet/drivers");
    return data.drivers ?? [];
  } catch (error) {
    console.error("[fleet] getDrivers error:", error);
    return [];
  }
}

export async function createDriverAction(
  _prevState: any,
  formData: FormData
) {
  const user_id = formData.get("user_id") as string;
  const license_number = formData.get("license_number") as string;
  const license_type = formData.get("license_type") as string;
  const license_expiry = formData.get("license_expiry") as string;
  const cedula_id = formData.get("cedula_id") as string;
  const emergency_phone = formData.get("emergency_phone") as string;
  const status = formData.get("status") as string || "active";

  if (!user_id || !license_number || !cedula_id) {
    return { error: "Usuario, número de licencia y cédula son obligatorios." };
  }

  try {
    await fetchApi<DriverApi>("/fleet/drivers", {
      method: "POST",
      body: JSON.stringify({ 
        user_id, 
        license_number, 
        license_type, 
        license_expiry, 
        cedula_id, 
        emergency_phone,
        status, 
      }),
    });
  } catch (error: any) {
    console.error("[fleet] createDriver error:", error.message);
    return { error: error.message || "Error al registrar el conductor." };
  }

  revalidatePath("/dashboard/fleet/drivers");
  redirect("/dashboard/fleet/drivers");
}
