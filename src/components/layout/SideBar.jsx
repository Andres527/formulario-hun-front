import { Monitor, HardDrive } from "lucide-react";

// Cada item del nav se define aquí — para agregar secciones en el futuro
// solo añades un objeto a esta lista
const NAV_ITEMS = [
  { icon: HardDrive, label: "Inventario", active: true },
];

export default function Sidebar({ stats }) {
  return (
    <aside className="w-48 flex-shrink-0 flex flex-col bg-[#13161c] border-r border-[#252a36]">

      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-[#252a36] font-mono text-lg">
        <Monitor size={20} className="text-[#00e5a0]" />
        <span>PC<strong className="text-[#00e5a0]">Inv</strong></span>
      </div>

      {/* Navegación */}
      <nav className="flex flex-col gap-0.5 px-2.5 mt-4">
        {NAV_ITEMS.map(({ icon: Icon, label, active }) => (
          <a
            key={label}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium cursor-pointer transition-all
              ${active
                ? "bg-[#00e5a0]/10 text-[#00e5a0]"
                : "text-[#8891a8] hover:bg-[#1a1e27] hover:text-[#e8eaf0]"
              }`}
          >
            <Icon size={15} />
            {label}
          </a>
        ))}
      </nav>

      {/* Stats al fondo */}
      <div className="mt-auto border-t border-[#252a36] px-5 py-4 flex flex-col gap-3">
        {[
          { val: stats.total, lbl: "Equipos" },
          { val: stats.sedes, lbl: "Sedes" },
          { val: stats.areas, lbl: "Áreas" },
        ].map(({ val, lbl }) => (
          <div key={lbl} className="flex items-center justify-between">
            <span className="font-mono text-lg font-bold text-[#e8eaf0]">{val}</span>
            <span className="text-[11px] uppercase tracking-widest text-[#555e73]">{lbl}</span>
          </div>
        ))}
      </div>

    </aside>
  );
}