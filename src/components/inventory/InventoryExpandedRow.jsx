import InfoBlock from "../ui/InfoBlocks";

// Qué campos mostrar en la fila expandida — fácil de agregar/quitar
const getFields = (r) => [
  { title: "CPU",            value: `${r.cpu} (${r.coresHilos})` },
  { title: "Serial BIOS",   value: r.serial,                          mono: true },
  { title: "Gateway",       value: r.netAdapters?.[0]?.gateway,       mono: true },
  { title: "DNS",           value: r.netAdapters?.[0]?.dns,           mono: true },
  { title: "Monitor",       value: r.monitor ? `${r.monitor.marca} ${r.monitor.modelo} — ${r.monitor.serial}` : null },
  { title: "Discos",        value: r.discos?.map(d => `${d.modelo} (${d.tam})`).join(", ") },
  { title: "RAM módulos",   value: r.memorias?.map(m => `${m.cap} ${m.vel} ${m.fab}`).join(" | ") },
  { title: "Antivirus",     value: r.antivirus },
  { title: "Office",        value: r.office },
  { title: "Apps",          value: r.apps?.length ? `${r.apps.length} aplicaciones` : null },
  { title: "Observaciones", value: r.observaciones, wide: true },
];

export default function InventoryExpandedRow({ record }) {
  const fields = getFields(record).filter(f => f.value);

  return (
    <tr className="bg-[#0d0f12]">
      <td colSpan={10} className="px-5 py-4 border-b border-[#252a36]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {fields.map(({ title, value, mono, wide }) => (
            <InfoBlock key={title} title={title} value={value} mono={mono} wide={wide} />
          ))}
        </div>
      </td>
    </tr>
  );
}