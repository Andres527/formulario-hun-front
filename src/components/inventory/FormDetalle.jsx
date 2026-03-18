import { Network, HardDrive, Cpu, Monitor, Package } from "lucide-react";
import CollapsibleSection from "../ui/CollapsibleSection";
import FormField from "../ui/FormField";

// Secciones colapsables con los datos crudos del .txt
export default function FormDetalle({ form, set, sections, onToggle }) {

  const updateArrayItem = (key, index, field, value) => {
    const arr = [...form[key]];
    arr[index] = { ...arr[index], [field]: value };
    set(key, arr);
  };

  return (
    <div className="flex flex-col gap-2">

      {/* Adaptadores de red */}
      <CollapsibleSection id="red" icon={Network} label="Adaptadores de red (detalle)"
        count={form.netAdapters?.length} open={sections.red} onToggle={onToggle}>
        {form.netAdapters?.length === 0 && <EmptyMsg>Sin adaptadores detectados</EmptyMsg>}
        {form.netAdapters?.map((n, i) => (
          <div key={i} className="bg-[#0d0f12] border border-[#252a36] rounded-md p-3">
            <span className="font-mono text-[10px] px-2 py-0.5 mb-2 inline-block rounded
              bg-[#0099ff]/10 border border-[#0099ff]/30 text-[#0099ff]">{n.adaptador}</span>
            <div className="grid grid-cols-3 gap-2 mt-2">
              <FormField label="IPv4"><input className="font-mono" value={n.ipv4} onChange={e => updateArrayItem("netAdapters", i, "ipv4", e.target.value)} /></FormField>
              <FormField label="MAC"><input className="font-mono" value={n.mac} onChange={e => updateArrayItem("netAdapters", i, "mac", e.target.value)} /></FormField>
              <FormField label="Gateway"><input className="font-mono" value={n.gateway} onChange={e => updateArrayItem("netAdapters", i, "gateway", e.target.value)} /></FormField>
              <FormField label="DNS" span={2}><input className="font-mono" value={n.dns} onChange={e => updateArrayItem("netAdapters", i, "dns", e.target.value)} /></FormField>
            </div>
          </div>
        ))}
      </CollapsibleSection>

      {/* Discos */}
      <CollapsibleSection id="discos" icon={HardDrive} label="Discos (detalle)"
        count={form.discos?.length} open={sections.discos} onToggle={onToggle}>
        {form.discos?.length === 0 && <EmptyMsg>Sin discos detectados</EmptyMsg>}
        {form.discos?.map((d, i) => (
          <div key={i} className="bg-[#0d0f12] border border-[#252a36] rounded-md p-3">
            <div className="grid grid-cols-3 gap-2">
              <FormField label="Modelo" span={2}><input value={d.modelo} onChange={e => updateArrayItem("discos", i, "modelo", e.target.value)} /></FormField>
              <FormField label="Interfaz"><input value={d.interfaz} onChange={e => updateArrayItem("discos", i, "interfaz", e.target.value)} /></FormField>
              <FormField label="Serial"><input className="font-mono" value={d.serial} onChange={e => updateArrayItem("discos", i, "serial", e.target.value)} /></FormField>
              <FormField label="Tamaño"><input value={d.tam} onChange={e => updateArrayItem("discos", i, "tam", e.target.value)} /></FormField>
            </div>
          </div>
        ))}
      </CollapsibleSection>

      {/* RAM */}
      <CollapsibleSection id="ram" icon={Cpu} label="Módulos de RAM (detalle)"
        count={form.memorias?.length} open={sections.ram} onToggle={onToggle}>
        {form.memorias?.length === 0 && <EmptyMsg>Sin módulos detectados</EmptyMsg>}
        {form.memorias?.map((m, i) => (
          <div key={i} className="bg-[#0d0f12] border border-[#252a36] rounded-md p-3">
            <div className="grid grid-cols-3 gap-2">
              <FormField label="Capacidad"><input readOnly className="font-mono opacity-60" value={m.cap} /></FormField>
              <FormField label="Velocidad"><input readOnly className="font-mono opacity-60" value={m.vel} /></FormField>
              <FormField label="Fabricante"><input readOnly className="opacity-60" value={m.fab} /></FormField>
              <FormField label="Parte #" span={2}><input readOnly className="font-mono opacity-60" value={m.parte} /></FormField>
              <FormField label="Zócalo"><input readOnly className="opacity-60" value={m.zocalo} /></FormField>
            </div>
          </div>
        ))}
      </CollapsibleSection>

      {/* Monitor */}
      <CollapsibleSection id="monitor" icon={Monitor} label="Monitor (detalle)"
        count={form.monitor ? 1 : 0} open={sections.monitor} onToggle={onToggle}>
        {!form.monitor
          ? <EmptyMsg>Sin monitor detectado</EmptyMsg>
          : (
            <div className="bg-[#0d0f12] border border-[#252a36] rounded-md p-3">
              <div className="grid grid-cols-3 gap-2">
                <FormField label="Marca"><input value={form.monitor.marca} onChange={e => set("monitor", { ...form.monitor, marca: e.target.value })} /></FormField>
                <FormField label="Modelo"><input value={form.monitor.modelo} onChange={e => set("monitor", { ...form.monitor, modelo: e.target.value })} /></FormField>
                <FormField label="Serial"><input className="font-mono" value={form.monitor.serial} onChange={e => set("monitor", { ...form.monitor, serial: e.target.value })} /></FormField>
              </div>
            </div>
          )
        }
      </CollapsibleSection>

      {/* Apps */}
      <CollapsibleSection id="apps" icon={Package} label="Aplicaciones instaladas"
        count={form.apps?.length} open={sections.apps} onToggle={onToggle}>
        {form.apps?.length === 0 && <EmptyMsg>Sin aplicaciones detectadas</EmptyMsg>}
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {form.apps?.map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 px-2.5 py-1.5 rounded
              bg-[#0d0f12] border border-[#252a36] text-[12px]">
              <span className="flex-1 truncate text-[#e8eaf0]">{a.name}</span>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-[#1a1e27] border border-[#2e3446] text-[#8891a8]">{a.version}</span>
              <span className="text-[11px] text-[#555e73] ml-auto truncate max-w-[140px]">{a.editor}</span>
            </div>
          ))}
        </div>
      </CollapsibleSection>

    </div>
  );
}

function EmptyMsg({ children }) {
  return <p className="text-[12px] text-[#555e73]">{children}</p>;
}
