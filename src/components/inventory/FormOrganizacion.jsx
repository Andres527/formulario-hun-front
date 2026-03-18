import FormSection from "../ui/FormSection";
import FormField from "../ui/FormField";
import FormSelect from "../ui/FormSelect";
import SearchSelect from "../ui/SearchSelect";
import * as OPT from "../../constants/formOptions";

export default function FormOrganizacion({ form, set }) {
  return (
    <FormSection title="Organización">
      <div className="grid grid-cols-2 gap-3">
        <FormField label="Sede">
          <FormSelect value={form.sede} onChange={v => set("sede", v)} options={OPT.SEDES} placeholder="Selecciona sede…" />
        </FormField>

        <FormField label="Área / Dependencia">
          <SearchSelect value={form.area} onChange={v => set("area", v)} options={OPT.AREAS} placeholder="Buscar área…" />
        </FormField>

        <FormField label="Ubicación">
          <SearchSelect value={form.ubicacion} onChange={v => set("ubicacion", v)} options={OPT.UBICACION} placeholder="Buscar ubicación…" />
        </FormField>

        <FormField label="Piso">
          <FormSelect value={form.piso} onChange={v => set("piso", v)} options={OPT.PISOS} placeholder="Selecciona piso…" />
        </FormField>

        <FormField label="Proceso">
          <SearchSelect value={form.proceso} onChange={v => set("proceso", v)} options={OPT.PROCESO} placeholder="Buscar proceso…" />
        </FormField>

        <FormField label="Tipo de proceso">
          <FormSelect value={form.tipoProceso} onChange={v => set("tipoProceso", v)} options={OPT.TIPO_PROCESO} placeholder="Selecciona tipo de proceso…" />
        </FormField>

        <FormField label="Centro de costo">
          <SearchSelect value={form.centroCosto} onChange={v => set("centroCosto", v)} options={OPT.CENTRO_COSTO} placeholder="Buscar centro de costo…" />
        </FormField>
      </div>
    </FormSection>
  );
}
