"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApi } from "@/lib/api-client";
import { RouteApi, StopApi, stopSchema } from "@/features/routes/schemas";

export type FormState = {
  errors?: {
    [key: string]: string[];
  };
  message?: string | null;
  success?: boolean;
};

// ─── Response envelope ────────────────────────────────────────────────────────
interface RoutesListResponse {
  routes: RouteApi[];
  total: number;
}

export async function getRoutesAction(): Promise<RouteApi[]> {
  try {
    const data = await fetchApi<RoutesListResponse>("/fleet/routes");
    return data.routes ?? [];
  } catch (error) {
    console.error("[routes] getRoutes error:", error);
    return [];
  }
}

export async function createRouteAction(
  _prevState: any,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const direction = formData.get("direction") as string;
  const schedule_time = formData.get("schedule_time") as string;
  const vehicle_id = formData.get("vehicle_id") as string | undefined;
  const driver_id = formData.get("driver_id") as string | undefined;
  const school_id = formData.get("school_id") as string | undefined;

  if (!name || !direction || !schedule_time || !school_id) {
    return { error: "Nombre, dirección, horario y colegio son obligatorios." };
  }

  try {
    await fetchApi<RouteApi>("/fleet/routes", {
      method: "POST",
      body: JSON.stringify({ name, direction, schedule_time, vehicle_id, driver_id, school_id }),
    });
  } catch (error: any) {
    console.error("[routes] createRoute error:", error.message);
    return { error: error.message || "Error al crear la ruta." };
  }

  revalidatePath("/dashboard/routes");
  redirect("/dashboard/routes");
}

export async function addStopAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = stopSchema.safeParse({
    route_id: formData.get("route_id"),
    student_id: formData.get("student_id"),
    order: formData.get("order"),
    address: formData.get("address"),
    eta: formData.get("eta"),
    latitude: formData.get("latitude") || null,
    longitude: formData.get("longitude") || null,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Datos inválidos. Por favor revise el formulario.",
    };
  }

  const { route_id, ...stopData } = validatedFields.data;
  
  // Format for Gateway DTO
  const payload = {
    student_id: stopData.student_id,
    order: stopData.order,
    address: stopData.address,
    est_time: stopData.eta,
    location: (stopData.latitude && stopData.longitude) ? {
      latitude: stopData.latitude,
      longitude: stopData.longitude
    } : undefined
  };

  try {
    await fetchApi(`/fleet/routes/${route_id}/stops`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    
    revalidatePath("/dashboard/stops");
    revalidatePath(`/dashboard/routes/${route_id}`);
    
    return { success: true, message: "Parada creada exitosamente." };
  } catch (error: any) {
    console.error("[routes] addStop error:", error.message);
    return { 
      message: error.message || "Error al conectar con el servidor de flota.",
      success: false 
    };
  }
}

export async function getRouteStopsAction(routeId: string): Promise<StopApi[]> {
  try {
    const stops = await fetchApi<any[]>(`/fleet/routes/${routeId}/stops`);
    
    return (stops ?? []).map(s => ({
      id: s.id,
      route_id: routeId,
      student_id: s.student_id,
      order: s.order,
      address: s.address,
      eta: s.est_time,
      latitude: s.location?.latitude,
      longitude: s.location?.longitude,
    }));
  } catch (error) {
    console.error("[routes] getRouteStops error:", error);
    return [];
  }
}
