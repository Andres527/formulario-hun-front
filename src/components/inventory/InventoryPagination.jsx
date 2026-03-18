import { ChevronLeft, ChevronRight } from "lucide-react";

const PAGE_SIZE = 15;

export default function InventoryPagination({ total, page, onPage }) {
  const totalPages = Math.ceil(total / PAGE_SIZE);
  const from = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const to   = Math.min(page * PAGE_SIZE, total);

  if (total === 0) return null;

  return (
    <div className="flex items-center justify-between px-1 pt-2">

      {/* Info */}
      <span className="text-[12px] text-[#555e73]">
        Mostrando <span className="text-[#8891a8] font-medium">{from}–{to}</span> de{" "}
        <span className="text-[#8891a8] font-medium">{total}</span> equipos
      </span>

      {/* Controles */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">

          {/* Anterior */}
          <button
            onClick={() => onPage(page - 1)}
            disabled={page === 1}
            className="p-1.5 rounded-md bg-[#1a1e27] border border-[#252a36] text-[#8891a8]
              hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={14} />
          </button>

          {/* Páginas */}
          {getPageNumbers(page, totalPages).map((p, i) =>
            p === "..." ? (
              <span key={`dots-${i}`} className="px-1 text-[#555e73] text-[12px]">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPage(p)}
                className={`min-w-[30px] h-[30px] rounded-md text-[12px] font-medium transition-all
                  ${p === page
                    ? "bg-[#00e5a0]/10 border border-[#00e5a0]/30 text-[#00e5a0]"
                    : "bg-[#1a1e27] border border-[#252a36] text-[#8891a8] hover:border-[#00e5a0] hover:text-[#00e5a0]"
                  }`}
              >
                {p}
              </button>
            )
          )}

          {/* Siguiente */}
          <button
            onClick={() => onPage(page + 1)}
            disabled={page === totalPages}
            className="p-1.5 rounded-md bg-[#1a1e27] border border-[#252a36] text-[#8891a8]
              hover:border-[#00e5a0] hover:text-[#00e5a0] transition-all
              disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight size={14} />
          </button>

        </div>
      )}

    </div>
  );
}

// Genera array de páginas con "..." cuando hay muchas
function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4)
    return [1, 2, 3, 4, 5, "...", total];

  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];

  return [1, "...", current - 1, current, current + 1, "...", total];
}

export { PAGE_SIZE };