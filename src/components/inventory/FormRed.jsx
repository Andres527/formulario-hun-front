import FormSection from "../ui/FormSection";
import FormField from "../ui/FormField";

// Solo campos manuales — IP, MAC y Gateway viven en FormDetalle (adaptadores)
export default function FormRed({ form, set }) {
  return (
    <FormSection title="Red">
      <div className="grid grid-cols-3 gap-3">

        <FormField label="IP">
          <input className="font-mono" value={form.ip} onChange={e => set("ip", e.target.value)} placeholder="172.22.0.0" />
        </FormField>
        
        <FormField label="Máscara de red">
          <input className="font-mono" value={form.mascaraRed} onChange={e => set("mascaraRed", e.target.value)} placeholder="255.255.255.0" />
        </FormField>

        <FormField label="Wireless MAC">
          <input className="font-mono" value={form.wirelessMac} onChange={e => set("wirelessMac", e.target.value)} />
        </FormField>

        <FormField label="Etiqueta punto de red">
          <input value={form.etiquetaPuntoRed} onChange={e => set("etiquetaPuntoRed", e.target.value)} />
        </FormField>
      </div>
    </FormSection>
  );
}