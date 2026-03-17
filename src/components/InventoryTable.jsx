import { useState } from "react";
import { Edit2, Trash2, ChevronDown, ChevronUp, Search } from "lucide-react";
import styles from "./InventoryTable.module.css";

export default function InventoryTable({ inventory, onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ col: "equipo", dir: "asc" });
  const [expanded, setExpanded] = useState(null);

  const filtered = inventory
    .filter(r => {
      const q = search.toLowerCase();
      return !q || [r.equipo, r.usuario, r.sede, r.area, r.so, r.marca, r.modelo, r.serial]
        .some(v => v?.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      const av = a[sort.col] || ""; const bv = b[sort.col] || "";
      return sort.dir === "asc" ? av.localeCompare(bv) : bv.localeCompare(av);
    });

  const toggleSort = (col) => setSort(s => ({ col, dir: s.col === col && s.dir === "asc" ? "desc" : "asc" }));
  const Th = ({ col, label }) => (
    <th className={styles.th} onClick={() => toggleSort(col)} style={{cursor:"pointer",userSelect:"none"}}>
      <span style={{display:"flex",alignItems:"center",gap:4}}>
        {label}
        {sort.col === col && (sort.dir === "asc" ? <ChevronUp size={11}/> : <ChevronDown size={11}/>)}
      </span>
    </th>
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={13} style={{color:"var(--text3)"}} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar equipo, usuario, sede…" style={{border:"none",background:"transparent",padding:"0",width:"100%"}} />
        </div>
        <span style={{color:"var(--text3)",fontSize:12}}>{filtered.length} equipo{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty}>
          <p>No hay equipos registrados</p>
          <p style={{fontSize:12,color:"var(--text3)"}}>Haz clic en «Nuevo equipo» para comenzar</p>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <Th col="id" label="ID" />
                <Th col="equipo" label="Equipo" />
                <Th col="usuario" label="Usuario" />
                <Th col="sede" label="Sede" />
                <Th col="area" label="Área" />
                <Th col="so" label="SO" />
                <Th col="marca" label="Marca / Modelo" />
                <th className={styles.th}>IP</th>
                <th className={styles.th}>RAM</th>
                <th className={styles.th} style={{width:80}}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(r => (
                <>
                  <tr key={r.id} className={styles.row} onClick={() => setExpanded(expanded === r.id ? null : r.id)}>
                    <td className={styles.td}><span className="tag">{r.id}</span></td>
                    <td className={styles.td}>
                      <span className={styles.equipName}>{r.equipo}</span>
                      {r.dominio && <span style={{color:"var(--text3)",fontSize:11,display:"block"}}>{r.dominio}</span>}
                    </td>
                    <td className={styles.td}>{r.usuario}</td>
                    <td className={styles.td}><span className="tag">{r.sede || "—"}</span></td>
                    <td className={styles.td}><span className="tag blue">{r.area || "—"}</span></td>
                    <td className={styles.td} style={{fontSize:11,color:"var(--text2)"}}>{r.so?.replace("Microsoft ", "")}</td>
                    <td className={styles.td}>
                      <span style={{fontWeight:500}}>{r.marca}</span>
                      {r.modelo && <span style={{color:"var(--text3)",fontSize:11,display:"block"}}>{r.modelo}</span>}
                    </td>
                    <td className={styles.td}><span className="mono" style={{fontSize:11}}>{r.netAdapters?.[0]?.ipv4 || "—"}</span></td>
                    <td className={styles.td}><span className="tag green">{r.memoria}</span></td>
                    <td className={styles.td} onClick={e => e.stopPropagation()}>
                      <div style={{display:"flex",gap:4}}>
                        <button className="btn-icon" title="Editar" onClick={() => onEdit(r)}><Edit2 size={13}/></button>
                        <button className="btn-icon btn-danger" title="Eliminar" onClick={() => { if(confirm(`¿Eliminar ${r.equipo}?`)) onDelete(r.id); }}><Trash2 size={13}/></button>
                      </div>
                    </td>
                  </tr>
                  {expanded === r.id && (
                    <tr key={r.id + "_exp"} className={styles.expandRow}>
                      <td colSpan={10} className={styles.expandCell}>
                        <div className={styles.expandGrid}>
                          <InfoBlock title="CPU" value={`${r.cpu} (${r.coresHilos})`} />
                          <InfoBlock title="Serial BIOS" value={r.serial} mono />
                          <InfoBlock title="Gateway" value={r.netAdapters?.[0]?.gateway} mono />
                          <InfoBlock title="DNS" value={r.netAdapters?.[0]?.dns} mono />
                          <InfoBlock title="Monitor" value={r.monitor ? `${r.monitor.marca} ${r.monitor.modelo} — ${r.monitor.serial}` : "—"} />
                          <InfoBlock title="Discos" value={r.discos?.map(d => `${d.modelo} (${d.tam})`).join(", ") || "—"} />
                          <InfoBlock title="RAM módulos" value={r.memorias?.map(m => `${m.cap} ${m.vel} ${m.fab}`).join(" | ") || "—"} />
                          <InfoBlock title="Apps instaladas" value={r.apps?.length ? `${r.apps.length} aplicaciones` : "—"} />
                          {r.observaciones && <InfoBlock title="Observaciones" value={r.observaciones} wide />}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function InfoBlock({ title, value, mono, wide }) {
  return (
    <div style={{ gridColumn: wide ? "span 4" : "span 1" }}>
      <p style={{fontSize:10,fontWeight:700,letterSpacing:"0.06em",textTransform:"uppercase",color:"var(--text3)",marginBottom:3}}>{title}</p>
      <p style={{fontSize:12,color:"var(--text2)",fontFamily: mono ? "var(--font-mono)" : undefined}}>{value || "—"}</p>
    </div>
  );
}
