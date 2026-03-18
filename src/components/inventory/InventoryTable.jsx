import { useState, Fragment } from "react";
import { Edit2, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import InventoryExpandedRow from "./InventoryExpandedRow";
import InventoryFilters from "./InventoryFilters";
import InventoryPagination, { PAGE_SIZE } from "./InventoryPagination";

const COLUMNS = [
  { col: "id",      label: "ID",             sortable: true  },
  { col: "equipo",  label: "Equipo",         sortable: true  },
  { col: "usuario", label: "Usuario",        sortable: true  },
  { col: "sede",    label: "Sede",           sortable: true  },
  { col: "area",    label: "Área",           sortable: true  },
  { col: "so",      label: "SO",             sortable: true  },
  { col: "marca",   label: "Marca / Modelo", sortable: true  },
  { col: "ip",      label: "IP",             sortable: false },
  { col: "memoria", label: "RAM",            sortable: false },
  { col: "actions", label: "Acciones",       sortable: false },
];

function SortableHeader({ col, label, sortable, sort, onSort }) {
  const isActive = sort.col === col;
  return (
    <th
      onClick={() => sortable && onSort(col)}
      className={`px-3 py-2.5 text-left text-[11px] font-bold uppercase tracking-wider
        bg-[#1a1e27] border-b border-[#252a36] whitespace-nowrap select-none
        ${sortable ? "cursor-pointer hover:text-[#00e5a0]" : ""}
        ${isActive ? "text-[#00e5a0]" : "text-[#8891a8]"}`}
    >
      <span className="flex items-center gap-1">
        {label}
        {sortable && isActive && (
          sort.dir === "asc" ? <ChevronUp size={11} /> : <ChevronDown size={11} />
        )}
      </span>
    </th>
  );
}

export default function InventoryTable({ inventory, onEdit, onDelete }) {
  const [search, setSearch]     = useState("");
  const [filters, setFilters]   = useState({ sede: "", area: "", estado: "", tipoEquipo: "" });
  const [sort, setSort]         = useState({ col: "equipo", dir: "asc" });
  const [expanded, setExpanded] = useState(null);
  const [page, setPage]         = useState(1);

  const toggleSort = (col) => {
    setSort(s => ({ col, dir: s.col === col && s.dir === "asc" ? "desc" : "asc" }));
    setPage(1);
  };

  const handleSearch = (val) => { setSearch(val); setPage(1); };
  const handleFilters = (fn) => { setFilters(fn); setPage(1); };

  // 1. Filtrar
  const filtered = inventory
    .filter(r => {
      const q = search.toLowerCase();
      const matchSearch = !q || [r.equipo, r.usuario, r.sede, r.area, r.so, r.marca, r.modelo, r.serial]
        .some(v => v?.toLowerCase().includes(q));
      const matchSede      = !filters.sede      || r.sede      === filters.sede;
      const matchArea      = !filters.area      || r.area      === filters.area;
      const matchEstado    = !filters.estado    || r.estado    === filters.estado;
      const matchTipoEquipo = !filters.tipoEquipo || r.tipoEquipo === filters.tipoEquipo;
      return matchSearch && matchSede && matchArea && matchEstado && matchTipoEquipo;
    })
    // 2. Ordenar
    .sort((a, b) => {
      const av = String(a[sort.col] ?? "");
      const bv = String(b[sort.col] ?? "");
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  // 3. Paginar
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="flex flex-col gap-3">

      <InventoryFilters
        inventory={inventory}
        filters={filters}
        onFilters={handleFilters}
        search={search}
        onSearch={handleSearch}
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 px-5 text-[#8891a8] border border-dashed border-[#252a36] rounded-xl">
          <p className="font-medium">No hay equipos que coincidan</p>
          <p className="text-[12px] text-[#555e73] mt-1">Intenta con otros filtros o términos de búsqueda</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto border border-[#252a36] rounded-md">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {COLUMNS.map(c => (
                    <SortableHeader key={c.col} {...c} sort={sort} onSort={toggleSort} />
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map(r => (
                  <Fragment key={r.id}>
                    <tr
                      onClick={() => setExpanded(prev => prev === r.id ? null : r.id)}
                      className="cursor-pointer border-b border-[#252a36] hover:bg-[#1a1e27] transition-colors last:border-b-0"
                    >
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1a1e27] border border-[#2e3446] text-[#8891a8]">
                          {r.id}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                        <span className="font-mono text-[12px] font-semibold text-[#00e5a0]">{r.equipo}</span>
                        {r.dominio && <span className="block text-[11px] text-[#555e73]">{r.dominio}</span>}
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap text-[13px]">{r.usuario}</td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1a1e27] border border-[#2e3446] text-[#8891a8]">
                          {r.sede || "—"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#0099ff]/10 border border-[#0099ff]/30 text-[#0099ff]">
                          {r.area || "—"}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap text-[11px] text-[#8891a8]">
                        {r.so?.replace("Microsoft ", "")}
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                        <span className="text-[13px] font-medium">{r.marca}</span>
                        {r.modelo && <span className="block text-[11px] text-[#555e73]">{r.modelo}</span>}
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap font-mono text-[11px]">
                        {r.ip || r.netAdapters?.[0]?.ipv4 || "—"}
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap">
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0]">
                          {r.memoria}
                        </span>
                      </td>
                      <td className="px-3 py-2.5 align-middle whitespace-nowrap" onClick={e => e.stopPropagation()}>
                        <div className="flex gap-1">
                          <button
                            title="Editar"
                            onClick={() => onEdit(r)}
                            className="p-1.5 rounded bg-[#1a1e27] border border-[#252a36] text-[#8891a8]
                              hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all"
                          >
                            <Edit2 size={13} />
                          </button>
                          <button
                            title="Eliminar"
                            onClick={() => { if (confirm(`¿Eliminar ${r.equipo}?`)) onDelete(r.id); }}
                            className="p-1.5 rounded bg-[#1a1e27] border border-[#ff6b35]/50 text-[#ff6b35]
                              hover:bg-[#ff6b35] hover:text-white transition-all"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>

                    {expanded === r.id && (
                      <InventoryExpandedRow key={`${r.id}_exp`} record={r} />
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <InventoryPagination
            total={filtered.length}
            page={page}
            onPage={setPage}
          />
        </>
      )}
    </div>
  );
}