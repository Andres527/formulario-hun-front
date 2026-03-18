import { Search, X, SlidersHorizontal } from "lucide-react";
import FormSelect from "../ui/FormSelect";

export default function InventoryFilters({ inventory, filters, onFilters, search, onSearch }) {

  // Genera opciones únicas dinámicamente desde el inventario actual
  const unique = (key) => [...new Set(inventory.map(r => r[key]).filter(Boolean))].sort();

  const set = (key, val) => onFilters(f => ({ ...f, [key]: val }));

  const hasActiveFilters = search || Object.values(filters).some(Boolean);

  const clearAll = () => {
    onSearch("");
    onFilters({ sede: "", area: "", estado: "", tipoEquipo: "" });
  };

  return (
    <div className="flex flex-col gap-2">

      {/* Búsqueda + botón limpiar */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 flex-1 bg-[#13161c] border border-[#252a36]
          rounded-md px-3.5 py-2 focus-within:border-[#00e5a0] transition-colors">
          <Search size={13} className="text-[#555e73] flex-shrink-0" />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Buscar equipo, usuario, sede, serial…"
            className="flex-1 bg-transparent border-none text-[13px] text-[#e8eaf0]
              placeholder-[#555e73] outline-none"
          />
          {search && (
            <button onClick={() => onSearch("")} className="text-[#555e73] hover:text-[#ff6b35]">
              <X size={13} />
            </button>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearAll}
            className="flex items-center gap-1.5 px-3 py-2 rounded-md text-[12px] font-semibold
              bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35]
              hover:bg-[#ff6b35]/20 transition-all whitespace-nowrap"
          >
            <X size={12} /> Limpiar filtros
          </button>
        )}
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-4 gap-2">
        <FormSelect
          value={filters.sede}
          onChange={v => set("sede", v)}
          options={unique("sede")}
          placeholder="Sede…"
        />
        <FormSelect
          value={filters.area}
          onChange={v => set("area", v)}
          options={unique("area")}
          placeholder="Área…"
        />
        <FormSelect
          value={filters.estado}
          onChange={v => set("estado", v)}
          options={unique("estado")}
          placeholder="Estado…"
        />
        <FormSelect
          value={filters.tipoEquipo}
          onChange={v => set("tipoEquipo", v)}
          options={unique("tipoEquipo")}
          placeholder="Tipo equipo…"
        />
      </div>

    </div>
  );
}