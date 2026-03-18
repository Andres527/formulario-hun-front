import FormSection from "../ui/FormSection";
import FormField from "../ui/FormField";
import FormSelect from "../ui/FormSelect";
import * as OPT from "../../constants/formOptions";

// Solo campos que NO vienen del .txt / no están en FormDetalle
export default function FormHardware({ form, set }) {
  return (
    <FormSection title="Hardware">
      <div className="grid grid-cols-3 gap-3">
        <FormField label="Marca">
          <input value={form.marca} onChange={e => set("marca", e.target.value)} />
        </FormField>
 
        <FormField label="Modelo">
          <input value={form.modelo} onChange={e => set("modelo", e.target.value)} />
        </FormField>
 
        <FormField label="Tipo de equipo">
          <FormSelect value={form.tipoEquipo} onChange={v => set("tipoEquipo", v)} options={OPT.TIPOS_EQUIPO} placeholder="Selecciona tipo…" />
        </FormField>
 
        <FormField label="Serial (BIOS)">
          <input className="font-mono" value={form.serial} onChange={e => set("serial", e.target.value)} />
        </FormField>
 
        <FormField label="Memoria total (RAM)">
          <input value={form.memoria} onChange={e => set("memoria", e.target.value)} placeholder="8 GB" />
        </FormField>
 
        <FormField label="Activo Monitor">
          <input value={form.activoMonitor} onChange={e => set("activoMonitor", e.target.value)} placeholder="Nº activo monitor" />
        </FormField>
      </div>
    </FormSection>
  );
}
 