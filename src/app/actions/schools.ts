"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { fetchApi } from "@/lib/api-client";
import { SchoolApi, SchoolForm } from "@/features/schools/schemas";

// ─── Response envelope from the Gateway ──────────────────────────────────────
interface SchoolsListResponse {
  schools: SchoolApi[];
  total: number;
}

export async function getSchoolsAction(): Promise<SchoolApi[]> {
  try {
    const data = await fetchApi<SchoolsListResponse>("/fleet/schools");
    return data.schools ?? [];
  } catch (error) {
    console.error("[schools] getSchools error:", error);
    return [];
  }
}

export async function createSchoolAction(
  _prevState: any,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const contact_email = formData.get("contact_email") as string;
  const contact_phone = formData.get("contact_phone") as string;

  if (!name || !address) {
    return { error: "Nombre y dirección son obligatorios." };
  }

  try {
    await fetchApi<SchoolApi>("/fleet/schools", {
      method: "POST",
      body: JSON.stringify({ name, address, contact_email, contact_phone }),
    });
  } catch (error: any) {
    console.error("[schools] createSchool error:", error.message);
    return { error: error.message || "Error al crear el colegio." };
  }

  revalidatePath("/dashboard/schools");
  redirect("/dashboard/schools");
}

export async function updateSchoolAction(
  id: string,
  _prevState: any,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const contact_email = formData.get("contact_email") as string;
  const contact_phone = formData.get("contact_phone") as string;

  try {
    await fetchApi<SchoolApi>(`/fleet/schools/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name, address, contact_email, contact_phone }),
    });
  } catch (error: any) {
    console.error("[schools] updateSchool error:", error.message);
    return { error: error.message || "Error al actualizar el colegio." };
  }

  revalidatePath("/dashboard/schools");
  redirect("/dashboard/schools");
}
