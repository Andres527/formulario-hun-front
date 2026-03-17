import { useState, useRef } from "react";
import { Upload, Save, X, ChevronDown, ChevronUp, Monitor, HardDrive, Cpu, Network, Package } from "lucide-react";
import styles from "./InventoryForm.module.css";
import SearchSelect from "./SearchSelect";

const SEDES = ["Sede Principal", "Sede 3 / Cruz Roja"];

const AREAS = [
  "FACTURACION", "CARTERA", "COMPRAS", "AUDITORIA EXTERNA", "TALENTO HUMANO",
  "CONTRATACIONES", "JURIDICA", "CALIDAD", "CUENTAS MEDICAS", "CONSULTA EXTERNA",
  "FARMACIA", "SISTEMA", "BLOQUE DE ENFERMERIA", "MANTENIMIENTO", "ALMACEN",
  "UCI ADULTO", "UCI NEONATAL", "UCI INTERMEDIA", "HOSPITALIZACION",
  "FACTURACION HOSPITALIZACION", "NUTRICION", "CIRUGIA", "RADIOLOGIA",
  "URGENCIA OBSERVACION PEDIATRICA", "OBSERVACION PEDIATRICA", "URGENCIA OBS ADULTO",
  "ESTAR ENFERMERIA 1", "REANIMACION", "COORDINACION URGENCIA", "URGENCIA EVOLUCION",
  "SALA TRANSITORIA", "SALA DE TERAPIA RESPIRATORIA", "TRIAGE 1", "TRIAGE 2",
  "CUARTO DE INTERNOS", "CONSULTORIO 2 URGENCIA", "CONSULTORIO 4 URGENCIA",
  "CONSULTORIO 5 URGENCIA", "CONSULTORIO 6 URGENCIA", "FACTCABINA URGENCIA",
  "ADMISIONES URGENCIA", "OFICINA DOCENCIA Y SERVICIO", "BIBLIOTECA", "SIMULACION",
  "SALA DE USUARIOS", "SALON 21H1", "SALON 21H2", "SALON 22H2", "SALON 23H1",
  "SALON 24H2", "SALON 25H2", "SALON 26H2", "SALON 28H2", "INVESTIGACION",
  "ADMISION CONSULTA EXTERNA", "FACTURACION SEDE 3", "PSICOLOGIA", "PATOLOGIA",
  "GESTION AL USUARIO", "TRABAJO SOCIAL", "ODONTOLOGIA", "FACTURACION ODONTOLOGIA",
  "VACUNACION", "ADMINISTRACION ODONTOLOGIA", "CALL CENTER", "SIAU",
  "CIRUGIA COORDINACION", "PROGRAMACION DE CIRUGIA Y FACTURACION", "LABORATORIO",
  "AUTORIZACIONES", "SISTEMAS", "AUDITORIA INTERNA", "TESORERIA", "CONTABILIDAD",
  "ENFERMERIA CONSULTA EXTERNA", "COORDINACION DE ENFERMERIA", "ENDOSCOPIA 1",
  "ENDOSCOPIA 2", "MATERNIDAD", "FARMACIA DE CIRUGIA", "RECUPERACION DE CIRUGIA",
  "GESTION DOCUMENTAL", "CONSULTORIO JURIDICO", "TICS", "ADMINISTRACION FINANCIERA",
  "DIRECCION ADMINISTRATIVA", "ADMINISTRACION", "DIRECCION MEDICA",
  "SUBDIRECCION DE INTERNACION", "UNIVOLUNTARIOS", "CAJA 1", "CAJA 2",
  "COORDINADOR DU NORD H", "HEMODINAMIA", "RADIOLOGIA CUARTO TECNICO",
  "RADIOLOGIA SALA DE LECTURA", "HOLTER", "CARDIOSOF", "CIRUGIA ESTERILIZACION",
  "SERVICIOS GENERALES", "ENFERMERIA URGENCIA", "CONTROL DE MONITOREO",
  "URGENCIA", "BODEGA SISTEMAS", "CENTRAL DE MONITOREO", "CENTRAL DE MONITOREO UCI INT",
  "SST", "CONSULTORIO 1 URGENCIA", "CONSULTORIO 3 URGENCIA", "CONSULTORIO 7 URGENCIA",
];

const CENTRO_COSTO = [
  "ADMINISTRACION HOSPITAL", "GESTION DE OPERACIONES", "DIRECCIONAMIENTO", "CALIDAD",
  "CONSULTA EXTERNA", "CENTRO INVESTIGACION CLINICA", "FARMACIA", "UCI ADULTO",
  "URGENCIAS", "HOSPITALIZACION PISO 1", "HOSPITALIZACION PISO 2", "UCI NEONATAL",
  "CIRUGIA", "CONVENIO DOCENTE ASISTENCIAL", "LABORATORIO", "ATENCION AL USUARIO",
  "CLINICA ODONTOLOGICA", "DU NORD H",
];

const UBICACION = [
  "OFICINA DE FACTURACION", "OFICINA DE CARTERA", "OFICINA DE COMPRAS",
  "OFICINA AUDITORIA EXTERNA", "OFICINA DE TALENTO HUMANO",
  "OFICINA COMERCIAL Y CONTRATACIONES", "OFICINA JURIDICA", "OFICINA DE CALIDAD",
  "OFICINA DE CUENTAS MEDICAS", "FISIOTERAPIA", "FARMACIA", "FARMACIA BODEGA",
  "FARMACIA CONSIGNACION", "FARMACIA PRINCIPAL", "TIC", "BLOQUE E", "MANTENIMIENTO",
  "ALMACEN", "UCI ADULTO", "UCI NEONATAL", "UCI INTERMEDIA", "HOSPITALIZACION",
  "OFICINA DE NUTRICION", "COORDINACION CIRUGIA", "RADIOLOGIA",
  "OBSERVACION PEDIATRICA", "FARMACIA URGENCIA", "ESTAR 1", "REANIMACION",
  "COORDINACION URGENCIAS", "EVOLUCION", "SALA TRANSITORIA", "TERAPIA RESPIRATORIA",
  "TRIAGE 1", "TRIAGE 2", "CONSULTORIO 2", "CONSULTORIO 4", "CONSULTORIO 5",
  "CONSULTORIO 6", "FACTURACION URGENCIAS", "ADMISIONES URGENCIAS",
  "BLOQUE ACADEMICO", "CENTRO DE INVESTIGACION CLINICA", "CONSULTA EXTERNA",
  "ADMISION CONSULTA EXTERNA", "PSICOLOGIA", "PATOLOGIA",
  "RECEPCION ATENCION AL USUARIO", "TRABAJO SOCIAL", "ODONTOLOGIA", "CALL CENTER",
  "CIRUGIA", "LABORATORIO CLINICO", "AUTORIZACIONES", "AUDITORIA INTERNA",
  "OFICINA DE TESORERIA", "OFICINA DE CONTABILIDAD", "URGENCIAS", "CONSULTORIO 1",
  "CONSULTORIO 3", "CONSULTORIO 7", "CONSULTORIA DE PROCEDIMIENTO", "ENDOSCOPIA 1",
  "ENDOSCOPIA 2", "MATERNIDAD", "FARMACIA CIRUGIA", "RECUPERACION CIRUGIA",
  "GESTION DOCUMENTAL", "VENTANILLA", "SEDE 3", "RACK ODONTOLOGIA",
  "DIRECCION ADMINISTRATIVA Y FINANCIERA", "ADMINISTRACION", "COSTOS",
  "ASISTENTE DIRECCION EJECUTIVA", "OFICINA DIRECTOR CIENTIFICO",
  "OFICINA UNIVOLUNTARIOS", "CAJA 1", "CAJA 2", "COORDINADOR DU NORD H",
  "SERVICIOS GENERALES", "ESTAR DE ENFERMERIA", "CENTRAL DE MONITOREO",
  "CONSULTORIO ECOGRAFIA", "BODEGA TIC", "RACK SERVIDORES",
];

const PROCESO = [
  "FACTURACION", "CARTERA", "GESTION RECURSOS MATERIALES",
  "GESTION DE OPERACIONES ASISTENCIALES", "GESTION DEL TALENTO HUMANO",
  "GESTION JURIDICA", "GESTION DE CALIDAD", "CONSULTA EXTERNA", "INVESTIGACION",
  "FARMACIA", "GESTION DE TIC", "HOSPITALIZACION", "DIRECCIONAMIENTO ESTRATEGICO",
  "URGENCIAS", "AUDITORIA MEDICA", "GESTION DE INFRAESTRUCTURA", "UCI ADULTO",
  "UCI NEONATAL", "CIRUGIA Y MATERNIDAD", "IMAGENES DIAGNOSTICAS", "DOCENCIA SERVICIO",
  "LABORATORIO CLINICO Y PATOLOGIA", "SIAU", "ODONTOLOGIA", "CONTROL INTERNO",
  "TESORERIA", "CONTABILIDAD", "GESTION DOCUMENTAL Y ARCHIVO", "HOTELERIA",
  "GESTION DE LA TECNOLOGIA BIOMEDICA", "SST",
];

const ENTIDAD_PROPIETARIO = ["SONDA", "HUN", "UNINORTE", "NUEVA EPS", "TECHNOMEDICAL", "REGISTRADURIA", "N/A"];
const PISOS = ["1", "2"];
const TIPO_PROCESO = ["MISIONAL", "APOYO", "ESTRATEGICO"];
const TIPOS_EQUIPO = ["Desktop", "Laptop", "All-in-One", "Servidor", "Otro"];
const ESTADO = ["NO-EXT", "Ok", "N/A", "Apagado"]
const TIPO_DISCO = ["Solido",
  "N/A",
  "Mecanico",
  "Solido",
  "Rotacional",
  "Solido NVMe",
  "MSA2040 (Rotacional)",
  "MSA2060 (Solido)"
]

const OFFICE = ["2019",
"N/A",
"2016",
"365",
"2010",
"2013",
"2021",
"OPEN OFFICE",
"2019 PRO",
"365"]

const ANTIVIRUS = [
  "BITDEFENDER",
"N/A",
"Cortex",
"TREND MICRO",
"SYMANTEC",
"MCAFEE",
"Trellix"
]

const EMPTY = {
  fecha: "", sede: "", area: "", ubicacion: "", tipoProceso: "", proceso: "",
  centroCosto: "", piso: "",
  equipo: "", activo: "", usuario: "", usuarioResponsable: "",
  dominio: "", so: "", entidadPropietario: "",
  marca: "", modelo: "", tipoEquipo: "", serial: "",
  cpu: "", coresHilos: "", memoria: "",
  discoResumen: "", monitorResumen: "", activoMonitor: "", ramResumen: "",
  ip: "", mascaraRed: "", gateway: "", mac: "", wirelessMac: "", etiquetaPuntoRed: "",
  observaciones: "",
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
      setForm(f => ({
        ...f, ...parsed,
        sede: f.sede, area: f.area, ubicacion: f.ubicacion, piso: f.piso,
        tipoProceso: f.tipoProceso, proceso: f.proceso,
        centroCosto: f.centroCosto, observaciones: f.observaciones,
        activo: f.activo, activoMonitor: f.activoMonitor,
        entidadPropietario: f.entidadPropietario, etiquetaPuntoRed: f.etiquetaPuntoRed,
        usuarioResponsable: f.usuarioResponsable,
        ip: parsed.netAdapters?.[0]?.ipv4 || f.ip,
        gateway: parsed.netAdapters?.[0]?.gateway || f.gateway,
        mac: parsed.netAdapters?.[0]?.mac || f.mac,
        discoResumen: parsed.discos?.map(d => `${d.modelo} (${d.tam})`).join(" | ") || f.discoResumen,
        monitorResumen: parsed.monitor ? `${parsed.monitor.marca} ${parsed.monitor.modelo}` : f.monitorResumen,
        ramResumen: parsed.memorias?.map(m => `${m.cap} ${m.vel}`).join(" | ") || f.ramResumen,
      }));
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

          {/* ── Organización ─────────────────────────────────────────── */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Organización</p>
            <div className={styles.grid2}>

              <div>
                <label>Sede</label>
                <select value={form.sede} onChange={e => set("sede", e.target.value)}>
                  <option value="">Selecciona sede…</option>
                  {SEDES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label>Área / Dependencia</label>
                <SearchSelect value={form.area} onChange={v => set("area", v)} options={AREAS} placeholder="Buscar área…" />
              </div>

              <div>
                <label>Ubicación</label>
                <SearchSelect value={form.ubicacion} onChange={v => set("ubicacion", v)} options={UBICACION} placeholder="Buscar ubicación…" />
              </div>

              <div>
                <label>Piso</label>
                <select value={form.piso} onChange={e => set("piso", e.target.value)}>
                  <option value="">Selecciona piso…</option>
                  {PISOS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label>Proceso</label>
                <SearchSelect value={form.proceso} onChange={v => set("proceso", v)} options={PROCESO} placeholder="Buscar proceso…" />
              </div>
              
              <div>
                <label>Tipo de proceso</label>
                <select value={form.tipoProceso} onChange={e => set("tipoProceso", e.target.value)}>
                  <option value="">Selecciona tipo…</option>
                  {TIPO_PROCESO.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label>Centro de costo</label>
                <SearchSelect value={form.centroCosto} onChange={v => set("centroCosto", v)} options={CENTRO_COSTO} placeholder="Buscar centro de costo…" />
              </div>

            </div>
          </div>

          {/* ── Identificación ───────────────────────────────────────── */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Identificación del equipo</p>
            <div className={styles.grid3}>

              <div>
                <label>Nombre del equipo *</label>
                <input value={form.equipo} onChange={e => set("equipo", e.target.value)} placeholder="PC-AREA-01" />
              </div>

              <div>
                <label>Activo *</label>
                <input value={form.activo} onChange={e => set("activo", e.target.value)} placeholder="Nº activo fijo" />
              </div>

              <div>
                <label>Usuario Windows</label>
                <input value={form.usuario} onChange={e => set("usuario", e.target.value)} />
              </div>

              <div>
                <label>Usuario Responsable</label>
                <input value={form.usuarioResponsable} onChange={e => set("usuarioResponsable", e.target.value)} />
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

              <div>
                <label>Entidad Propietario</label>
                <select value={form.entidadPropietario} onChange={e => set("entidadPropietario", e.target.value)}>
                  <option value="">Seleccionar…</option>
                  {ENTIDAD_PROPIETARIO.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label>Estado</label>
                <select value={form.estado} onChange={e => set("estado", e.target.value)}>
                  <option value="">Estado…</option>
                  {ESTADO.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

            </div>
          </div>

          {/* ── Hardware ─────────────────────────────────────────────── */}
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
                <label>Tipo de equipo</label>
                <select value={form.tipoEquipo} onChange={e => set("tipoEquipo", e.target.value)}>
                  <option value="">Selecciona tipo…</option>
                  {TIPOS_EQUIPO.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label>Serial (BIOS)</label>
                <input className="mono" value={form.serial} onChange={e => set("serial", e.target.value)} />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label>CPU</label>
                <input value={form.cpu} onChange={e => set("cpu", e.target.value)} />
              </div>

              <div style={{ gridColumn: "span 2" }}>
                <label>Discos</label>
                <input value={form.discoResumen} onChange={e => set("discoResumen", e.target.value)} />
              </div>

              <div>
                <label>Discos</label>
                <input value={form.discoResumen} onChange={e => set("discoResumen", e.target.value)} />
              </div>

              <div>
                <label>Cores / Hilos</label>
                <input value={form.coresHilos} onChange={e => set("coresHilos", e.target.value)} placeholder="4/8" />
              </div>

              <div>
                <label>Memoria total (RAM)</label>
                <input value={form.memoria} onChange={e => set("memoria", e.target.value)} placeholder="8 GB" />
              </div>

              <div>
                <label>Monitor</label>
                <input value={form.monitorResumen} onChange={e => set("monitorResumen", e.target.value)} />
              </div>

              <div>
                <label>Activo Monitor</label>
                <input value={form.activoMonitor} onChange={e => set("activoMonitor", e.target.value)} placeholder="Nº activo fijo monitor" />
              </div>

              <div>
                <label>RAM (módulos)</label>
                <input value={form.ramResumen} onChange={e => set("ramResumen", e.target.value)} />
              </div>

            </div>
          </div>


          {/* ── Software ─────────────────────────────────────────────── */}

          <div className={styles.group}>
            <p className={styles.groupLabel}>Software</p>
            <div className={styles.grid3}>

              <div>
                <label>Antivirus</label>
                <select value={form.antivirus} onChange={e => set("antivirus", e.target.value)}>
                  <option value="">Selecciona antivirus…</option>
                  {ANTIVIRUS.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label>Office</label>
                <select value={form.office} onChange={e => set("office", e.target.value)}>
                  <option value="">Selecciona Office…</option>
                  {OFFICE.map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

            </div>
          </div>

          {/* ── Red ──────────────────────────────────────────────────── */}
          <div className={styles.group}>
            <p className={styles.groupLabel}>Red</p>
            <div className={styles.grid3}>

              <div>
                <label>IP</label>
                <input className="mono" value={form.ip} onChange={e => set("ip", e.target.value)} placeholder="172.22.0.0" />
              </div>

              <div>
                <label>Máscara de red</label>
                <input className="mono" value={form.mascaraRed} onChange={e => set("mascaraRed", e.target.value)} placeholder="255.255.255.0" />
              </div>

              <div>
                <label>Gateway</label>
                <input className="mono" value={form.gateway} onChange={e => set("gateway", e.target.value)} placeholder="172.22.0.0" />
              </div>

              <div>
                <label>MAC</label>
                <input className="mono" value={form.mac} onChange={e => set("mac", e.target.value)} />
              </div>

              <div>
                <label>Wireless MAC</label>
                <input className="mono" value={form.wirelessMac} onChange={e => set("wirelessMac", e.target.value)} />
              </div>

              <div>
                <label>Etiqueta punto de red</label>
                <input value={form.etiquetaPuntoRed} onChange={e => set("etiquetaPuntoRed", e.target.value)} />
              </div>

            </div>
          </div>

          {/* ── Secciones colapsables ────────────────────────────────── */}
          <Section id="red" icon={Network} label="Adaptadores de red (detalle)" count={form.netAdapters?.length}>
            {form.netAdapters?.map((n, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardTitle}><span className="tag blue">{n.adaptador}</span></div>
                <div className={styles.grid3}>
                  <div><label>IPv4</label><input className="mono" value={n.ipv4} onChange={e => { const a = [...form.netAdapters]; a[i] = { ...a[i], ipv4: e.target.value }; set("netAdapters", a); }} /></div>
                  <div><label>MAC</label><input className="mono" value={n.mac} onChange={e => { const a = [...form.netAdapters]; a[i] = { ...a[i], mac: e.target.value }; set("netAdapters", a); }} /></div>
                  <div><label>Gateway</label><input className="mono" value={n.gateway} onChange={e => { const a = [...form.netAdapters]; a[i] = { ...a[i], gateway: e.target.value }; set("netAdapters", a); }} /></div>
                  <div style={{ gridColumn: "span 2" }}><label>DNS</label><input className="mono" value={n.dns} onChange={e => { const a = [...form.netAdapters]; a[i] = { ...a[i], dns: e.target.value }; set("netAdapters", a); }} /></div>
                </div>
              </div>
            ))}
            {(!form.netAdapters || form.netAdapters.length === 0) && <p style={{ color: "var(--text3)", fontSize: 12 }}>Sin adaptadores detectados</p>}
          </Section>

          <Section id="discos" icon={HardDrive} label="Discos (detalle)" count={form.discos?.length}>
            {form.discos?.map((d, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.grid3}>
                  <div style={{ gridColumn: "span 2" }}><label>Modelo</label><input value={d.modelo} onChange={e => { const a = [...form.discos]; a[i] = { ...a[i], modelo: e.target.value }; set("discos", a); }} /></div>
                  <div><label>Interfaz</label><input value={d.interfaz} onChange={e => { const a = [...form.discos]; a[i] = { ...a[i], interfaz: e.target.value }; set("discos", a); }} /></div>
                  <div><label>Serial</label><input className="mono" value={d.serial} onChange={e => { const a = [...form.discos]; a[i] = { ...a[i], serial: e.target.value }; set("discos", a); }} /></div>
                  <div><label>Tamaño</label><input value={d.tam} onChange={e => { const a = [...form.discos]; a[i] = { ...a[i], tam: e.target.value }; set("discos", a); }} /></div>
                </div>
              </div>
            ))}
            {(!form.discos || form.discos.length === 0) && <p style={{ color: "var(--text3)", fontSize: 12 }}>Sin discos detectados</p>}
          </Section>

          <Section id="ram" icon={Cpu} label="Módulos de RAM (detalle)" count={form.memorias?.length}>
            {form.memorias?.map((m, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.grid3}>
                  <div><label>Capacidad</label><input value={m.cap} readOnly className="mono" /></div>
                  <div><label>Velocidad</label><input value={m.vel} readOnly className="mono" /></div>
                  <div><label>Fabricante</label><input value={m.fab} readOnly /></div>
                  <div style={{ gridColumn: "span 2" }}><label>Parte #</label><input value={m.parte} readOnly className="mono" /></div>
                  <div><label>Zócalo</label><input value={m.zocalo} readOnly /></div>
                </div>
              </div>
            ))}
            {(!form.memorias || form.memorias.length === 0) && <p style={{ color: "var(--text3)", fontSize: 12 }}>Sin módulos detectados</p>}
          </Section>

          <Section id="monitor" icon={Monitor} label="Monitor (detalle)" count={form.monitor ? 1 : 0}>
            {form.monitor ? (
              <div className={styles.card}>
                <div className={styles.grid3}>
                  <div><label>Marca</label><input value={form.monitor.marca} onChange={e => set("monitor", { ...form.monitor, marca: e.target.value })} /></div>
                  <div><label>Modelo</label><input value={form.monitor.modelo} onChange={e => set("monitor", { ...form.monitor, modelo: e.target.value })} /></div>
                  <div><label>Serial</label><input className="mono" value={form.monitor.serial} onChange={e => set("monitor", { ...form.monitor, serial: e.target.value })} /></div>
                </div>
              </div>
            ) : <p style={{ color: "var(--text3)", fontSize: 12 }}>Sin monitor detectado</p>}
          </Section>

          <Section id="apps" icon={Package} label="Aplicaciones instaladas" count={form.apps?.length}>
            <div className={styles.appList}>
              {form.apps?.map((a, i) => (
                <div key={i} className={styles.appRow}>
                  <span className={styles.appName}>{a.name}</span>
                  <span className="tag mono">{a.version}</span>
                  <span style={{ color: "var(--text3)", fontSize: 11, marginLeft: "auto" }}>{a.editor}</span>
                </div>
              ))}
              {(!form.apps || form.apps.length === 0) && <p style={{ color: "var(--text3)", fontSize: 12 }}>Sin aplicaciones detectadas</p>}
            </div>
          </Section>

          {/* ── Observaciones ────────────────────────────────────────── */}
          <div className={styles.group}>
            <label>Observaciones</label>
            <textarea rows={3} value={form.observaciones} onChange={e => set("observaciones", e.target.value)} placeholder="Notas adicionales sobre el equipo…" style={{ resize: "vertical" }} />
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