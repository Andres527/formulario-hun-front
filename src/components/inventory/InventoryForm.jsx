import { useState, useRef } from "react";
import { Upload, Save, X } from "lucide-react";
import { EMPTY } from "../../constants/formOptions";
import FormOrganizacion   from "./FormOrganizacion";
import FormIdentificacion from "./FormIdentificacion";
import FormHardware       from "./FormHardware";
import FormSoftware       from "./FormSoftware";
import FormRed            from "./FormRed";
import FormDetalle        from "./FormDetalle";

export default function InventoryForm({ initial, onSave, onCancel, parseTxt }) {
  const [form, setForm]         = useState(initial ? { ...EMPTY, ...initial } : EMPTY);
  const [sections, setSections] = useState({ red: false, discos: false, ram: false, monitor: false, apps: false });
  const [importing, setImporting] = useState(false);
  const [saving, setSaving]     = useState(false);
  // true cuando se importó un .txt — activa el modo detalle en registros nuevos
  const [hasTxtData, setHasTxtData] = useState(false);
  const fileRef = useRef();

  // Modo detalle: .txt importado o edición de existente
  const isDetailMode = hasTxtData || !!initial?.id;

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleSection = (id) => setSections(s => ({ ...s, [id]: !s[id] }));

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true);
    try {
      const parsed = await parseTxt(file);
      setForm(f => ({
        ...f,
        equipo:     parsed.equipo     || f.equipo,
        usuario:    parsed.usuario    || f.usuario,
        dominio:    parsed.dominio    || f.dominio,
        fecha:      parsed.fecha      || f.fecha,
        so:         parsed.so         || f.so,
        cpu:        parsed.cpu        || f.cpu,
        coresHilos: parsed.coresHilos || f.coresHilos,
        marca:      parsed.marca      || f.marca,
        modelo:     parsed.modelo     || f.modelo,
        serial:     parsed.serial     || f.serial,
        memoria:    parsed.memoria    || f.memoria,
        netAdapters: parsed.netAdapters?.length ? parsed.netAdapters : f.netAdapters,
        discos:      parsed.discos?.length      ? parsed.discos      : f.discos,
        memorias:    parsed.memorias?.length    ? parsed.memorias    : f.memorias,
        monitor:     parsed.monitor             || f.monitor,
        apps:        parsed.apps?.length        ? parsed.apps        : f.apps,
        ip:           parsed.netAdapters?.[0]?.ipv4    || f.ip,
        gateway:      parsed.netAdapters?.[0]?.gateway || f.gateway,
        mac:          parsed.netAdapters?.[0]?.mac     || f.mac,
        discoResumen: parsed.discos?.length
          ? parsed.discos.map(d => `${d.modelo} (${d.tam})`).join(" | ")
          : f.discoResumen,
        monitorResumen: parsed.monitor
          ? `${parsed.monitor.marca} ${parsed.monitor.modelo}`
          : f.monitorResumen,
        ramResumen: parsed.memorias?.length
          ? parsed.memorias.map(m => `${m.cap} ${m.vel}`).join(" | ")
          : f.ramResumen,
      }));
      setSections({ red: true, discos: true, ram: true, monitor: true, apps: false });
      setHasTxtData(true);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5
      bg-black/70 backdrop-blur-sm animate-[fadeIn_0.15s_ease]">

      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col
        bg-[#13161c] border border-[#2e3446] rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.4)]
        animate-[slideUp_0.2s_ease]">

        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#252a36] flex-shrink-0">
          <div>
            <h2 className="text-[16px] font-semibold text-[#e8eaf0]">
              {initial?.id ? "Editar equipo" : "Registrar equipo"}
            </h2>
            <p className="text-[12px] text-[#8891a8] mt-0.5">
              Completa los datos o importa desde .txt
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fileRef.current.click()}
              disabled={importing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-md text-[13px] font-semibold
                bg-[#1a1e27] text-[#e8eaf0] border border-[#2e3446]
                hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload size={14} />
              {importing ? "Importando…" : "Importar .txt"}
            </button>
            <input ref={fileRef} type="file" accept=".txt" className="hidden" onChange={handleFile} />
            <button
              onClick={onCancel}
              className="p-2 rounded-md bg-[#1a1e27] border border-[#252a36] text-[#8891a8]
                hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5">

          {/* Siempre visible */}
          <FormOrganizacion   form={form} set={set} />
          <FormIdentificacion form={form} set={set} />
          <FormSoftware       form={form} set={set} />

          {/* Modo manual (nuevo sin .txt): hardware completo + red completa */}
          {!isDetailMode && (
            <>
              <FormHardware form={form} set={set} />
              <FormRed      form={form} set={set} />
            </>
          )}

          {/* Modo detalle (.txt importado o edición): solo campos manuales de red + detalle completo */}
          {isDetailMode && (
            <>
              <FormRed     form={form} set={set} />
              <FormDetalle form={form} set={set} sections={sections} onToggle={toggleSection} />
            </>
          )}

          {/* Siempre visible */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-[#8891a8]">
              Observaciones
            </label>
            <textarea
              rows={3}
              value={form.observaciones}
              onChange={e => set("observaciones", e.target.value)}
              placeholder="Notas adicionales sobre el equipo…"
              className="resize-y"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 border-t border-[#252a36] flex-shrink-0">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-md text-[13px] font-semibold
              bg-[#1a1e27] text-[#e8eaf0] border border-[#2e3446]
              hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-[13px] font-semibold
              bg-[#00e5a0] text-[#0d0f12]
              hover:bg-[#00ffb3] hover:shadow-[0_0_16px_rgba(0,229,160,0.3)] transition-all
              active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={14} />
            {saving ? "Guardando…" : "Guardar registro"}
          </button>
        </div>

      </div>
    </div>
  );
}