// Grupo de campos con título en color acento
// Uso: <FormSection title="Organización"> <div className="grid ..."> ... </div> </FormSection>
export default function FormSection({ title, children }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-bold uppercase tracking-widest text-[#00e5a0]
        pb-1.5 border-b border-[#252a36]">
        {title}
      </p>
      {children}
    </div>
  );
}
