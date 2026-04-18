import { Header } from "@/components/layout/header";
import { fetchApi } from "@/lib/api-client";
import {
  School,
  Users,
  Truck,
  Route,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  Database,
} from "lucide-react";

/* ─── Mock data ─────────────────────────────────────────────────── */
const stats = [
  {
    id: "schools",
    label: "Colegios activos",
    value: "12",
    change: "+2 este mes",
    trend: "up",
    icon: School,
    color: "var(--color-primary)",
    bg: "rgba(30,58,138,0.08)",
  },
  {
    id: "students",
    label: "Alumnos registrados",
    value: "1,847",
    change: "+34 esta semana",
    trend: "up",
    icon: Users,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.08)",
  },
  {
    id: "vehicles",
    label: "Vehículos en flota",
    value: "38",
    change: "3 en mantenimiento",
    trend: "neutral",
    icon: Truck,
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
  },
  {
    id: "routes",
    label: "Rutas operativas",
    value: "24",
    change: "100% en ruta hoy",
    trend: "up",
    icon: Route,
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
  },
];

const recentActivity = [
  {
    id: 1,
    type: "success",
    message: "Ruta R-04 «Centro» completada sin incidentes",
    time: "Hace 12 min",
  },
  {
    id: 2,
    type: "warning",
    message: "Vehículo BUS-09 ingresó a mantenimiento preventivo",
    time: "Hace 1 h",
  },
  {
    id: 3,
    type: "success",
    message: "31 alumnos registrados en Colegio San Marcos",
    time: "Hace 2 h",
  },
  {
    id: 4,
    type: "success",
    message: "Conductor Juan Pérez asignado a la Ruta R-07",
    time: "Ayer, 17:45",
  },
  {
    id: 5,
    type: "warning",
    message: "Parada «Av. Principal» reubicada en Ruta R-02",
    time: "Ayer, 14:00",
  },
];

const activityIcon = {
  success: <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />,
  warning: <AlertCircle size={15} className="text-amber-500 shrink-0 mt-0.5" />,
};

/* ─── Page ──────────────────────────────────────────────────────── */
export default async function DashboardPage() {
  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
    
  let authStatus = "OK";
  let authMessage = "Conexión a Microservicios Verificada";
  try {
    // Validamos el pase del JWT al Gateway llamando a Fleet Services
    const fleetData = await fetchApi<any>("/fleet/schools");
    console.log("[Dashboard] Token Valid! Received data:", fleetData);
  } catch (error: any) {
    console.error("[Dashboard] JWT Session Warning:", error.message);
    authStatus = "ERROR";
    authMessage = error.message.includes("401") || error.message.includes("invalid") 
      ? "Sesión JWT Inválida / No Autorizado" 
      : `Error de conexión: ${error.message}`;
  }

  return (
    <>
      <Header
        title="Dashboard"
        subtitle={`${greeting} — resumen operativo en tiempo real`}
      />

      <main className="flex-1 px-8 py-8 space-y-8">
        {/* ── KPI cards ─────────────────────────────────────── */}
        <section>
          <h2 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4">
            Indicadores clave
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ id, label, value, change, trend, icon: Icon, color, bg }) => (
              <div
                key={id}
                className="
                  relative flex flex-col gap-4 p-5 rounded-2xl
                  bg-white border border-outline-variant/40
                  shadow-sm hover:shadow-md
                  transition-shadow duration-300 overflow-hidden group
                "
              >
                {/* decorative gradient */}
                <div
                  aria-hidden="true"
                  className="
                    absolute inset-0 opacity-0 group-hover:opacity-100
                    transition-opacity duration-300
                  "
                  style={{
                    background: `radial-gradient(circle at top right, ${bg} 0%, transparent 70%)`,
                  }}
                />

                <div className="relative flex items-start justify-between">
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-xl"
                    style={{ background: bg }}
                  >
                    <Icon size={18} strokeWidth={2} style={{ color }} />
                  </div>
                  {trend === "up" && (
                    <TrendingUp size={14} className="text-emerald-500 mt-1" />
                  )}
                </div>

                <div className="relative">
                  <p
                    className="text-[28px] font-bold leading-none tracking-tight"
                    style={{ color }}
                  >
                    {value}
                  </p>
                  <p className="text-sm font-medium text-on-surface mt-1">
                    {label}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    {change}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Two-column area ───────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Actividad reciente (2/3) */}
          <div
            className="
              lg:col-span-2 flex flex-col
              bg-white rounded-2xl border border-outline-variant/40 shadow-sm
              overflow-hidden
            "
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
              <h2 className="text-sm font-bold text-on-surface">
                Actividad reciente
              </h2>
              <button className="text-xs font-medium text-primary hover:underline">
                Ver todo
              </button>
            </div>
            <ul className="divide-y divide-outline-variant/20">
              {recentActivity.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-3 px-6 py-4 hover:bg-surface-low/60 transition-colors duration-150"
                >
                  {activityIcon[item.type as keyof typeof activityIcon]}
                  <p className="text-sm text-on-surface flex-1 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-xs text-on-surface-variant whitespace-nowrap mt-0.5">
                    {item.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Estado del sistema (1/3) */}
          <div
            className="
              flex flex-col gap-4
              bg-white rounded-2xl border border-outline-variant/40 shadow-sm p-6
            "
          >
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-on-surface">Estado del sistema</h2>
              <span
                className="
                  flex items-center gap-1.5 px-2.5 py-1 rounded-full
                  bg-emerald-50 text-emerald-700 text-[11px] font-semibold
                "
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Operativo
              </span>
            </div>

            <ul className="space-y-3 mt-1">
              <li className="flex items-center justify-between pb-3 mb-3 border-b border-outline-variant/20">
                <span className="flex items-center gap-2 text-sm font-semibold text-on-surface">
                  <Database size={14} className={authStatus === "OK" ? "text-emerald-500" : "text-amber-500"} />
                  Gateway JWT Status
                </span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    authStatus === "OK"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-700"
                  }`}
                  title={authMessage}
                >
                  {authStatus}
                </span>
              </li>
              {[
                { label: "API Gateway", ok: true },
                { label: "Fleet Service", ok: true },
                { label: "Tracking Service", ok: true },
                { label: "Notification Service", ok: true },
                { label: "Auth Service", ok: true },
              ].map(({ label, ok }) => (
                <li key={label} className="flex items-center justify-between">
                  <span className="text-sm text-on-surface-variant">{label}</span>
                  <span
                    className={`
                      flex items-center gap-1.5 text-xs font-semibold
                      ${ok ? "text-emerald-600" : "text-red-500"}
                    `}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${ok ? "bg-emerald-500" : "bg-red-500"}`}
                    />
                    {ok ? "OK" : "ERROR"}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-auto pt-4 border-t border-outline-variant/20">
              <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                <Clock size={12} />
                <span>
                  Última verificación:{" "}
                  {now.toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
