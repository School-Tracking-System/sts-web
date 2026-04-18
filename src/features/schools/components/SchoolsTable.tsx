import { School } from "../schemas";
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  MoreVertical, 
  GraduationCap 
} from "lucide-react";

interface SchoolsTableProps {
  schools: School[];
}

export function SchoolsTable({ schools }: SchoolsTableProps) {
  return (
    <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-low/50 border-b border-outline-variant/40">
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Colegio
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden md:table-cell">
                Contacto
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden sm:table-cell">
                Info adicional
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
            {schools.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No hay colegios registrados.
                </td>
              </tr>
            ) : (
              schools.map((school) => (
                <tr 
                  key={school.id}
                  className="hover:bg-surface-low/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary mt-0.5">
                        <Building2 size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                          {school.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1.5">
                          <MapPin size={12} className="shrink-0" />
                          <span className="truncate max-w-[200px] lg:max-w-[300px]">
                            {school.address}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex flex-col gap-1.5 text-sm">
                      <div className="flex items-center gap-2 text-on-surface">
                        <Mail size={13} className="text-on-surface-variant" />
                        {school.contact_email || "N/A"}
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <Phone size={13} />
                        {school.contact_phone || "N/A"}
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden sm:table-cell">
                    <div className="flex items-center gap-2">
                       <span className="text-xs text-on-surface-variant">
                          Registrado el: {school.created_at ? new Date(school.created_at).toLocaleDateString() : '—'}
                       </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span 
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500`} />
                      Activo
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
