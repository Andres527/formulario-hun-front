import { useState, useRef, useEffect } from "react";
import { ChevronDown, X, Search } from "lucide-react";
import styles from "./SearchSelect.module.css";

export default function SearchSelect({ value, onChange, options, placeholder = "Seleccionar…" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef();
  const inputRef = useRef();

  const filtered = options.filter(o => o.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const handler = (e) => {
      if (!containerRef.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const select = (opt) => { onChange(opt); setOpen(false); setQuery(""); };
  const clear = (e) => { e.stopPropagation(); onChange(""); };

  return (
    <div className={styles.wrap} ref={containerRef}>
      <div className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`} onClick={() => setOpen(o => !o)}>
        <span className={value ? styles.selected : styles.placeholder}>{value || placeholder}</span>
        <span className={styles.icons}>
          {value && <span className={styles.clearBtn} onClick={clear}><X size={11} /></span>}
          <ChevronDown size={13} className={open ? styles.chevronUp : ""} />
        </span>
      </div>
      {open && (
        <div className={styles.dropdown}>
          <div className={styles.searchBox}>
            <Search size={12} />
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar…" className={styles.searchInput} />
            {query && <span className={styles.clearBtn} onClick={() => setQuery("")}><X size={11} /></span>}
          </div>
          <div className={styles.list}>
            {filtered.length === 0
              ? <div className={styles.empty}>Sin resultados</div>
              : filtered.map(opt => (
                <div key={opt} className={`${styles.option} ${opt === value ? styles.optionActive : ""}`} onClick={() => select(opt)}>
                  {opt}
                </div>
              ))
            }
          </div>
        </div>
      )}
    </div>
  );
}
