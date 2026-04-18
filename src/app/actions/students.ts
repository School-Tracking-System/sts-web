"use server";

import { fetchApi } from "@/lib/api-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { StudentApi } from "@/features/students/schemas";

export async function getStudentsAction() {
  try {
    const data = await fetchApi<{ students: StudentApi[] }>("/fleet/students");
    return data.students ?? [];
  } catch (error) {
    console.error("[students] getStudentsAction error:", error);
    return [];
  }
}

export async function createStudentAction(prevState: any, formData: FormData) {
  const rawData = Object.fromEntries(formData);
  
  // Mapear y limpiar datos para la API
  const studentData = {
    first_name: rawData.first_name,
    last_name: rawData.last_name,
    grade: rawData.grade,
    school_id: rawData.school_id,
    pickup_address: rawData.pickup_address,
    cedula_id: rawData.cedula_id,
  };

  try {
    const response = await fetchApi("/fleet/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    });

    if (!response) {
      return { error: "Error de comunicación con el servicio de estudiantes." };
    }

    // TODO: Si se desea guardar la información del padre, se debería 
    // realizar una llamada adicional aquí para crear el usuario/representante
    // y vincularlo con el student_id obtenido.

    revalidatePath("/dashboard/students");
  } catch (error: any) {
    console.error("[students] createStudentAction error:", error.message);
    return { error: error.message || "No se pudo registrar al estudiante." };
  }

  redirect("/dashboard/students");
}
