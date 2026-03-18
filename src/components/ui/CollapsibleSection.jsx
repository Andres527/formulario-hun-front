import { ChevronDown, ChevronUp } from "lucide-react";

// Sección colapsable con ícono, contador de items y animación
export default function CollapsibleSection({ id, icon: Icon, label, count, open, onToggle, children }) {
  return (
    <div className="border border-[#252a36] rounded-md overflow-hidden">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className="w-full flex items-center justify-between px-3.5 py-2.5
          bg-[#1a1e27] text-[13px] font-medium text-[#e8eaf0]
          hover:bg-[#252a36] transition-colors"
      >
        <span className="flex items-center gap-2">
          <Icon size={14} />
          {label}
        </span>
        <span className="flex items-center gap-2">
          {count > 0 && (
            <span className="font-mono text-[10px] px-2 py-0.5 rounded
              bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0]">
              {count}
            </span>
          )}
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </span>
      </button>
      {open && (
        <div className="p-3.5 flex flex-col gap-2.5">
          {children}
        </div>
      )}
    </div>
  );
}
