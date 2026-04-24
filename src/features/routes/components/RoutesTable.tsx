import { RouteModel } from "../schemas";
import { Route, Clock, MoreVertical, ShieldAlert } from "lucide-react";

interface RoutesTableProps {
  routes: RouteModel[];
}

export function RoutesTable({ routes }: RoutesTableProps) {
  return (
    <div className="bg-white border border-outline-variant/40 rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-low/50 border-b border-outline-variant/40">
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                Identificación de Ruta
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden md:table-cell">
                Horario Planificado
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider hidden lg:table-cell">
                Asignaciones
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
            {routes.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant">
                  No hay rutas configuradas.
                </td>
              </tr>
            ) : (
              routes.map((route) => (
                <tr
                  key={route.id}
                  className="hover:bg-surface-low/40 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200/50">
                        <Route size={18} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface group-hover:text-primary transition-colors">
                          {route.name}
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          {route.direction === 'to_school' ? 'Hacia el colegio' : 'De regreso a casa'}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-2 text-sm text-on-surface font-medium">
                      <Clock size={16} className="text-on-surface-variant" />
                      {route.schedule_time
                        ? route.schedule_time
                        : '—'
                      }
                    </div>
                  </td>

                  <td className="px-6 py-4 hidden lg:table-cell">
                    <div className="flex flex-col gap-1.5 text-xs text-on-surface-variant font-medium">
                      {route.vehicle_id ? (
                        <span>Vehículo: <span className="font-mono text-on-surface">{route.vehicle_id}</span></span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-600"><ShieldAlert size={12} /> Sin vehículo asociado</span>
                      )}

                      {route.driver_id ? (
                        <span>Conductor principal asignado</span>
                      ) : (
                        <span className="flex items-center gap-1 text-amber-600"><ShieldAlert size={12} /> Sin conductor asociado</span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${route.is_active
                          ? 'bg-blue-50 text-blue-700'
                          : 'bg-surface-container text-on-surface-variant'
                        }
                      `}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full 
                          ${route.is_active ? 'bg-blue-500' : 'bg-outline-variant'}
                        `}
                      />
                      {route.is_active ? 'Operativa' : 'Suspendida'}
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
