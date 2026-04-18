"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApi } from "@/lib/api-client";
import { RouteApi } from "@/features/routes/schemas";

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
  const school_id = formData.get("school_id") as string | undefined;

  if (!name || !direction || !schedule_time) {
    return { error: "Nombre, dirección y horario son obligatorios." };
  }

  try {
    await fetchApi<RouteApi>("/fleet/routes", {
      method: "POST",
      body: JSON.stringify({ name, direction, schedule_time, vehicle_id, school_id }),
    });
  } catch (error: any) {
    console.error("[routes] createRoute error:", error.message);
    return { error: error.message || "Error al crear la ruta." };
  }

  revalidatePath("/dashboard/routes");
  redirect("/dashboard/routes");
}
