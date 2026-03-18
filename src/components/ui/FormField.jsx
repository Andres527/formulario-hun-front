// Componente atómico: label + cualquier input/select/searchselect
// Uso: <FormField label="Nombre"> <input .../> </FormField>
export default function FormField({ label, children, span }) {
  const spanClass = span === 2 ? "col-span-2" : span === 3 ? "col-span-3" : "col-span-1";
  return (
    <div className={spanClass}>
      {label && (
        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8891a8] mb-1.5">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}
