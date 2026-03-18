import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Search } from "lucide-react";

export default function SearchSelect({ value, onChange, options, placeholder = "Seleccionar…" }) {
  const [open, setOpen]   = useState(false);
  const [query, setQuery] = useState("");
  const containerRef      = useRef();
  const inputRef          = useRef();

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) { setQuery(""); setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  const select = (opt) => { onChange(opt); setOpen(false); setQuery(""); };
  const clear  = (e)   => { e.stopPropagation(); onChange(""); };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Trigger */}
      <div
        onClick={() => setOpen(o => !o)}
        className={`flex items-center justify-between min-h-[36px] px-3 py-2 cursor-pointer
          bg-[#1a1e27] border rounded-md transition-all select-none
          ${open
            ? "border-[#00e5a0] shadow-[0_0_0_3px_rgba(0,229,160,0.1)]"
            : "border-[#252a36] hover:border-[#2e3446]"
          }`}
      >
        <span className={`text-[13px] truncate ${value ? "text-[#e8eaf0]" : "text-[#555e73]"}`}>
          {value || placeholder}
        </span>
        <span className="flex items-center gap-1 text-[#555e73] flex-shrink-0 ml-2">
          {value && (
            <span onClick={clear} className="hover:text-[#ff6b35] p-0.5 rounded">
              <X size={11} />
            </span>
          )}
          <ChevronDown size={13} className={`transition-transform ${open ? "rotate-180" : ""}`} />
        </span>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 z-50
          bg-[#13161c] border border-[#2e3446] rounded-md shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          overflow-hidden animate-[fadeDown_0.1s_ease]">
          {/* Search input */}
          <div className="flex items-center gap-2 px-2.5 py-2 border-b border-[#252a36] bg-[#1a1e27] text-[#555e73]">
            <Search size={12} />
            <input
              ref={inputRef}
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="flex-1 bg-transparent border-none outline-none text-[12px] text-[#e8eaf0] placeholder-[#555e73]"
            />
            {query && (
              <span onClick={() => setQuery("")} className="cursor-pointer hover:text-[#ff6b35]">
                <X size={11} />
              </span>
            )}
          </div>
          {/* Options */}
          <div className="max-h-56 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="px-3 py-3 text-[12px] text-[#555e73] text-center">Sin resultados</div>
            ) : (
              filtered.map(opt => (
                <div
                  key={opt}
                  onClick={() => select(opt)}
                  className={`px-3 py-2 text-[13px] cursor-pointer truncate transition-colors
                    ${opt === value
                      ? "bg-[#00e5a0]/10 text-[#00e5a0] font-semibold"
                      : "text-[#8891a8] hover:bg-[#1a1e27] hover:text-[#e8eaf0]"
                    }`}
                >
                  {opt}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
