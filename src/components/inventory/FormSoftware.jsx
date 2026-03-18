import FormSection from "../ui/FormSection";
import FormField from "../ui/FormField";
import FormSelect from "../ui/FormSelect";
import * as OPT from "../../constants/formOptions";


export default function FormSoftware({ form, set }) {
  return (
    <FormSection title="Software">
      <div className="grid grid-cols-3 gap-3">
        <FormField label="Antivirus">
          <FormSelect value={form.antivirus} onChange={v => set("antivirus", v)} options={OPT.ANTIVIRUS} placeholder="Selecciona antivirus…" />
        </FormField>

        <FormField label="Office">
          <FormSelect value={form.office} onChange={v => set("office", v)} options={OPT.OFFICE} placeholder="Selecciona Office…" />
        </FormField>
      </div>
    </FormSection>
  );
}