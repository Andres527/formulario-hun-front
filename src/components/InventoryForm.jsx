import { useState, useRef } from "react";
import { Upload, Save, X, ChevronDown, ChevronUp, Monitor, HardDrive, Cpu, Network, Package } from "lucide-react";
import styles from "./InventoryForm.module.css";

const SEDES = ["Sede Principal", "Sede Norte", "Sede Sur", "Sede Centro", "Otra"];
const AREAS = ["TI", "Contabilidad", "Recursos Humanos", "Gerencia", "Administrativo", "Académico", "Biblioteca", "Otra"];

const EMPTY = {
  fecha: "", equipo: "", usuario: "", dominio: "", so: "",
  cpu: "", coresHilos: "", marca: "", modelo: "", serial: "",
  memoria: "", sede: "", area: "", observaciones: "",
  netAdapters: [], discos: [], memorias: [], monitor: null, apps: [],
};

export default function InventoryForm({ initial, onSave, onCancel, parseTxt }) {
  const [form, setForm] = useState(initial ? { ...EMPTY, ...initial } : EMPTY);
  const [sections, setSections] = useState({ red: false, discos: false, ram: false, monitor: false, apps: false });
  const [importing, setImporting] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggle = (k) => setSections(s => ({ ...s, [k]: !s[k] }));

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    try {
      const parsed = await parseTxt(file);
      setForm(f => ({ ...f, ...parsed, sede: f.sede, area: f.area, observaciones: f.observaciones }));
      setSections({ red: true, discos: true, ram: true, monitor: true, apps: false });
    } catch (err) {
      alert("Error al parsear el archivo: " + err.message);
    } finally {
      setImporting(false);
    }
  };

  const handleSubmit = async () => {
    if (!form.equipo) return alert("El nombre del equipo es requerido");
    setSaving(true);
    try { await onSave(form); }
    finally { setSaving(false); }
  };

  const Section = ({ id, icon: Icon, label, count, children }) => (
    <div className={styles.section}>
      <button type="button" className={styles.sectionHeader} onClick={() => toggle(id)}>
        <span className={styles.sectionTitle}><Icon size={14} /> {label}</span>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {count > 0 && <span className="tag green">{count}</span>}
          {sections[id] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      {sections[id] && <div className={styles.sectionBody}>{children}</div>}
    </div>
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.panel}>
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title}>{initial?.id ? "Editar equipo" : "Registrar equipo"}</h2>
            <p className={styles.subtitle}>Completa los datos o importa desde .txt</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-secondary" onClick={() => fileRef.current.click()} disabled={importing}>
              <Upload size={14} /> {importing ? "Importando…" : "Importar .txt"}
            </button>
            <input ref={fileRef} type="file" accept=".txt" style={{ display: "none" }} onChange={handleFile} />
            <button className="btn-icon" onClick={onCancel}><X size={16} /></button>
          </div>
        </div>

        <div className={styles.body}>
          {/* Organización */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Organización</p>
            <div className={styles.grid2}>
              <div>
                <label>Sede / Ubicación</label>
                <select value={form.sede} onChange={e => set("sede", e.target.value)}>
                  <option value="">Selecciona sede…</option>
                  {SEDES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label>Área / Departamento</label>
                <select value={form.area} onChange={e => set("area", e.target.value)}>
                  <option value="">Selecciona área…</option>
                  {AREAS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Identificación */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Identificación del equipo</p>
            <div className={styles.grid3}>
              <div>
                <label>Nombre del equipo *</label>
                <input value={form.equipo} onChange={e => set("equipo", e.target.value)} placeholder="PC-AREA-01" />
              </div>
              <div>
                <label>Usuario</label>
                <input value={form.usuario} onChange={e => set("usuario", e.target.value)} />
              </div>
              <div>
                <label>Dominio</label>
                <input value={form.dominio} onChange={e => set("dominio", e.target.value)} />
              </div>
              <div>
                <label>Fecha inventario</label>
                <input value={form.fecha} onChange={e => set("fecha", e.target.value)} placeholder="DD/MM/YYYY" />
              </div>
              <div>
                <label>Sistema Operativo</label>
                <input value={form.so} onChange={e => set("so", e.target.value)} />
              </div>
            </div>
          </div>

          {/* Hardware */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Hardware</p>
            <div className={styles.grid3}>
              <div>
                <label>Marca</label>
                <input value={form.marca} onChange={e => set("marca", e.target.value)} />
              </div>
              <div>
                <label>Modelo</label>
                <input value={form.modelo} onChange={e => set("modelo", e.target.value)} />
              </div>
              <div>
                <label>Serial (BIOS)</label>
                <input className="mono" value={form.serial} onChange={e => set("serial", e.target.value)} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label>CPU</label>
                <input value={form.cpu} onChange={e => set("cpu", e.target.value)} />
              </div>
              <div>
                <label>Cores / Hilos</label>
                <input value={form.coresHilos} onChange={e => set("coresHilos", e.target.value)} placeholder="4/8" />
              </div>
              <div>
                <label>Memoria total</label>
                <input value={form.memoria} onChange={e => set("memoria", e.target.value)} placeholder="8 GB" />
              </div>
            </div>
          </div>

          {/* Collapsible sections */}
          <Section id="red" icon={Network} label="Adaptadores de red" count={form.netAdapters?.length}>
            {form.netAdapters?.map((n, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardTitle}><span className="tag blue">{n.adaptador}</span></div>
                <div className={styles.grid3}>
                  <div><label>IPv4</label><input className="mono" value={n.ipv4} onChange={e => { const a=[...form.netAdapters]; a[i]={...a[i],ipv4:e.target.value}; set("netAdapters",a); }} /></div>
                  <div><label>MAC</label><input className="mono" value={n.mac} onChange={e => { const a=[...form.netAdapters]; a[i]={...a[i],mac:e.target.value}; set("netAdapters",a); }} /></div>
                  <div><label>Gateway</label><input className="mono" value={n.gateway} onChange={e => { const a=[...form.netAdapters]; a[i]={...a[i],gateway:e.target.value}; set("netAdapters",a); }} /></div>
                  <div style={{gridColumn:"span 2"}}><label>DNS</label><input className="mono" value={n.dns} onChange={e => { const a=[...form.netAdapters]; a[i]={...a[i],dns:e.target.value}; set("netAdapters",a); }} /></div>
                </div>
              </div>
            ))}
            {(!form.netAdapters || form.netAdapters.length === 0) && <p style={{color:"var(--text3)",fontSize:12}}>Sin adaptadores detectados</p>}
          </Section>

          <Section id="discos" icon={HardDrive} label="Discos" count={form.discos?.length}>
            {form.discos?.map((d, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.grid3}>
                  <div style={{gridColumn:"span 2"}}><label>Modelo</label><input value={d.modelo} onChange={e => { const a=[...form.discos]; a[i]={...a[i],modelo:e.target.value}; set("discos",a); }} /></div>
                  <div><label>Interfaz</label><input value={d.interfaz} onChange={e => { const a=[...form.discos]; a[i]={...a[i],interfaz:e.target.value}; set("discos",a); }} /></div>
                  <div><label>Serial</label><input className="mono" value={d.serial} onChange={e => { const a=[...form.discos]; a[i]={...a[i],serial:e.target.value}; set("discos",a); }} /></div>
                  <div><label>Tamaño</label><input value={d.tam} onChange={e => { const a=[...form.discos]; a[i]={...a[i],tam:e.target.value}; set("discos",a); }} /></div>
                </div>
              </div>
            ))}
            {(!form.discos || form.discos.length === 0) && <p style={{color:"var(--text3)",fontSize:12}}>Sin discos detectados</p>}
          </Section>

          <Section id="ram" icon={Cpu} label="Módulos de RAM" count={form.memorias?.length}>
            {form.memorias?.map((m, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.grid3}>
                  <div><label>Capacidad</label><input value={m.cap} readOnly className="mono" /></div>
                  <div><label>Velocidad</label><input value={m.vel} readOnly className="mono" /></div>
                  <div><label>Fabricante</label><input value={m.fab} readOnly /></div>
                  <div style={{gridColumn:"span 2"}}><label>Parte #</label><input value={m.parte} readOnly className="mono" /></div>
                  <div><label>Zócalo</label><input value={m.zocalo} readOnly /></div>
                </div>
              </div>
            ))}
            {(!form.memorias || form.memorias.length === 0) && <p style={{color:"var(--text3)",fontSize:12}}>Sin módulos detectados</p>}
          </Section>

          <Section id="monitor" icon={Monitor} label="Monitor" count={form.monitor ? 1 : 0}>
            {form.monitor ? (
              <div className={styles.card}>
                <div className={styles.grid3}>
                  <div><label>Marca</label><input value={form.monitor.marca} onChange={e => set("monitor", {...form.monitor, marca: e.target.value})} /></div>
                  <div><label>Modelo</label><input value={form.monitor.modelo} onChange={e => set("monitor", {...form.monitor, modelo: e.target.value})} /></div>
                  <div><label>Serial</label><input className="mono" value={form.monitor.serial} onChange={e => set("monitor", {...form.monitor, serial: e.target.value})} /></div>
                </div>
              </div>
            ) : <p style={{color:"var(--text3)",fontSize:12}}>Sin monitor detectado</p>}
          </Section>

          <Section id="apps" icon={Package} label="Aplicaciones instaladas" count={form.apps?.length}>
            <div className={styles.appList}>
              {form.apps?.map((a, i) => (
                <div key={i} className={styles.appRow}>
                  <span className={styles.appName}>{a.name}</span>
                  <span className="tag mono">{a.version}</span>
                  <span style={{color:"var(--text3)",fontSize:11,marginLeft:"auto"}}>{a.editor}</span>
                </div>
              ))}
              {(!form.apps || form.apps.length === 0) && <p style={{color:"var(--text3)",fontSize:12}}>Sin aplicaciones detectadas</p>}
            </div>
          </Section>

          {/* Observaciones */}
          <div className={styles.group}>
            <label>Observaciones</label>
            <textarea rows={3} value={form.observaciones} onChange={e => set("observaciones", e.target.value)} placeholder="Notas adicionales sobre el equipo…" style={{resize:"vertical"}} />
          </div>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className="btn-secondary" onClick={onCancel}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit} disabled={saving}>
            <Save size={14} /> {saving ? "Guardando…" : "Guardar registro"}
          </button>
        </div>
      </div>
    </div>
  );
}
