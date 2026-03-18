import { Plus, Download } from "lucide-react";

export default function Topbar({ onNew, onExport, canExport }) {
  return (
    <header className="flex items-center justify-between px-7 py-5 bg-[#13161c] border-b border-[#252a36] flex-shrink-0">

      <div>
        <h1 className="text-xl font-bold text-[#e8eaf0]">Inventario de PCs</h1>
        <p className="text-xs text-[#8891a8] mt-0.5">Gestión y seguimiento de equipos</p>
      </div>

      <div className="flex items-center gap-2.5">
        <button
          onClick={onExport}
          disabled={!canExport}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-semibold
            bg-[#1a1e27] text-[#e8eaf0] border border-[#2e3446]
            hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all
            disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Download size={14} /> Exportar Excel
        </button>

        <button
          onClick={onNew}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-semibold
            bg-[#00e5a0] text-[#0d0f12]
            hover:bg-[#00ffb3] hover:shadow-[0_0_16px_rgba(0,229,160,0.3)] transition-all
            active:scale-[0.97]"
        >
          <Plus size={14} /> Nuevo equipo
        </button>
      </div>

    </header>
  );
}