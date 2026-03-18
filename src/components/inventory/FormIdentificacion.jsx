import FormSection from "../ui/FormSection";
import FormField from "../ui/FormField";
import FormSelect from "../ui/FormSelect";
import * as OPT from "../../constants/formOptions";

export default function FormIdentificacion({ form, set }) {
  return (
    <FormSection title="Identificación del equipo">
      <div className="grid grid-cols-3 gap-3">
        <FormField label="Nombre del equipo *">
          <input value={form.equipo} onChange={e => set("equipo", e.target.value)} placeholder="PC-AREA-01" />
        </FormField>
 
        <FormField label="Activo *">
          <input value={form.activo} onChange={e => set("activo", e.target.value)} placeholder="Nº activo fijo" />
        </FormField>
 
        <FormField label="Usuario Windows">
          <input value={form.usuario} onChange={e => set("usuario", e.target.value)} />
        </FormField>
 
        <FormField label="Usuario Responsable">
          <input value={form.usuarioResponsable} onChange={e => set("usuarioResponsable", e.target.value)} />
        </FormField>
 
        <FormField label="Dominio">
          <input value={form.dominio} onChange={e => set("dominio", e.target.value)} />
        </FormField>
 
        <FormField label="Fecha inventario">
          <input value={form.fecha} onChange={e => set("fecha", e.target.value)} placeholder="DD/MM/YYYY" />
        </FormField>
 
        <FormField label="Sistema Operativo">
          <input value={form.so} onChange={e => set("so", e.target.value)} />
        </FormField>
 
        <FormField label="Entidad Propietario">
          <FormSelect value={form.entidadPropietario} onChange={v => set("entidadPropietario", v)} options={OPT.ENTIDAD_PROPIETARIO} placeholder="Seleccionar…" />
        </FormField>
 
        <FormField label="Estado">
          <FormSelect value={form.estado} onChange={v => set("estado", v)} options={OPT.ESTADO} placeholder="Estado…" />
        </FormField>
      </div>
    </FormSection>
  );
}
