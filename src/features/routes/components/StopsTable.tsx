import { StopApi } from "../schemas";
import { StudentApi } from "@/features/students/schemas";
import { MapPin, Clock, User } from "lucide-react";

interface StopsTableProps {
  stops: StopApi[];
  students?: StudentApi[];
}

export function StopsTable({ stops, students = [] }: StopsTableProps) {
  // Create a map for quick student lookup
  const studentMap = new Map(students.map(s => [s.id, `${s.first_name} ${s.last_name}`]));

  return (
    <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-low/50 border-b border-outline-variant/40">
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Orden
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Estudiante / Parada
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden md:table-cell">
                Ubicación
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                ETA
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {stops.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                  Aún no hay paradas trazadas para esta ruta.
                </td>
              </tr>
            ) : (
              [...stops].sort((a,b) => a.order - b.order).map((stop) => (
                <tr 
                  key={stop.id}
                  className="hover:bg-surface-low/40 transition-colors group"
                >
                  <td className="px-6 py-4 w-16">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-container font-bold text-on-surface text-sm border border-outline-variant/50">
                      {stop.order}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                     <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                           <User size={16} className="text-primary/70" />
                           <span className="font-semibold text-sm text-on-surface">
                             {studentMap.get(stop.student_id) || "Estudiante Desconocido"}
                           </span>
                        </div>
                        <span className="text-xs text-on-surface-variant ml-6">
                          ID: {stop.student_id.split('-')[0]}...
                        </span>
                     </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-on-surface-variant max-w-[300px] truncate">
                      <MapPin size={14} className="shrink-0" />
                      {stop.address}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-on-surface font-medium bg-surface-low w-fit px-3 py-1.5 rounded-lg border border-outline-variant/40">
                      <Clock size={14} className="text-[#EAB308]" />
                      {stop.eta}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
