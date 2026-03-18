// Componente genérico para mostrar un par título/valor
// Usado en la fila expandida de la tabla, pero puede usarse en cualquier parte
export default function InfoBlock({ title, value, mono = false, wide = false }) {
  return (
    <div className={wide ? "col-span-2 md:col-span-4" : "col-span-1"}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#555e73] mb-1">
        {title}
      </p>
      <p className={`text-[12px] text-[#8891a8] break-words ${mono ? "font-mono" : ""}`}>
        {value || "—"}
      </p>
    </div>
  );
}