import { Student } from "../schemas";
import { GraduationCap, MapPin, UserSquare2, Phone, MoreVertical, Building2, Route } from "lucide-react";

interface StudentsTableProps {
  students: Student[];
}

export function StudentsTable({ students }: StudentsTableProps) {
  return (
    <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-low/50 border-b border-outline-variant/40">
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Alumno
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden md:table-cell">
                Tutor
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden lg:table-cell">
                Contexto
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/20">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No hay alumnos registrados.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr 
                  key={student.id}
                  className="hover:bg-surface-low/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-cyan-50 text-cyan-600 mt-0.5 border border-outline-variant/30">
                        <GraduationCap size={20} strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                          {student.first_name} {student.last_name}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1.5">
                          <MapPin size={12} className="shrink-0" />
                          <span className="truncate max-w-[200px] xl:max-w-[300px]">
                            {student.pickup_address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-col gap-1.5 text-sm">
                      <div className="flex items-center gap-2 text-on-surface">
                        <UserSquare2 size={14} className="text-on-surface-variant" />
                        {student.parent_name}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
                        <Phone size={12} />
                        {student.parent_phone}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex flex-col gap-2 text-xs font-medium text-on-surface-variant">
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-surface border border-outline-variant/30 w-fit">
                        <Building2 size={10} className="text-slate-500" />
                        {student.school_id ? `ID Colegio: ${student.school_id}` : 'Colegio no asignado'}
                      </span>
                      {student.route_id ? (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#EAB308]/10 text-yellow-800 border border-yellow-500/20 w-fit">
                          <Route size={10} />
                          En Ruta {student.route_id}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-200 w-fit">
                          <Route size={10} />
                          Sin ruta asignada
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${student.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : 'bg-surface-container text-on-surface-variant'
                        }
                      `}
                    >
                      <span 
                        className={`w-1.5 h-1.5 rounded-full 
                          ${student.status === 'active' ? 'bg-emerald-500' : 'bg-outline-variant'}
                        `} 
                      />
                      {student.status === 'active' ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-on-surface-variant hover:bg-surface hover:text-on-surface transition-colors">
                      <MoreVertical size={16} />
                    </button>
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
