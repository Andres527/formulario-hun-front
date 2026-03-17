import * as XLSX from "xlsx";

export function exportToExcel(inventory) {
  const wb = XLSX.utils.book_new();

  // ── Sheet 1: Resumen general ──────────────────────────────────────────────
  const summaryRows = inventory.map((r) => ({
    ID: r.id,
    Fecha: r.fecha,
    Equipo: r.equipo,
    Usuario: r.usuario,
    Área: r.area || "",
    Sede: r.sede || "",
    Dominio: r.dominio,
    SO: r.so,
    CPU: r.cpu,
    "Cores/Hilos": r.coresHilos,
    "Marca Equipo": r.marca,
    "Modelo Equipo": r.modelo,
    "Serial BIOS": r.serial,
    "Memoria Total": r.memoria,
    "IP (Ethernet)": r.netAdapters?.[0]?.ipv4 || "",
    "MAC (Ethernet)": r.netAdapters?.[0]?.mac || "",
    Gateway: r.netAdapters?.[0]?.gateway || "",
    DNS: r.netAdapters?.[0]?.dns || "",
    "Monitor Marca": r.monitor?.marca || "",
    "Monitor Modelo": r.monitor?.modelo || "",
    "Monitor Serial": r.monitor?.serial || "",
    Observaciones: r.observaciones || "",
  }));
  const ws1 = XLSX.utils.json_to_sheet(summaryRows);
  styleSheet(ws1, summaryRows.length + 1);
  XLSX.utils.book_append_sheet(wb, ws1, "Resumen");

  // ── Sheet 2: Discos ───────────────────────────────────────────────────────
  const diskRows = [];
  inventory.forEach((r) => {
    (r.discos || []).forEach((d) => {
      diskRows.push({
        Equipo: r.equipo,
        Sede: r.sede || "",
        Área: r.area || "",
        Modelo: d.modelo,
        Serial: d.serial,
        Tamaño: d.tam,
        Interfaz: d.interfaz,
      });
    });
  });
  if (diskRows.length) {
    const ws2 = XLSX.utils.json_to_sheet(diskRows);
    styleSheet(ws2, diskRows.length + 1);
    XLSX.utils.book_append_sheet(wb, ws2, "Discos");
  }

  // ── Sheet 3: Memoria RAM ──────────────────────────────────────────────────
  const ramRows = [];
  inventory.forEach((r) => {
    (r.memorias || []).forEach((m) => {
      ramRows.push({
        Equipo: r.equipo,
        Sede: r.sede || "",
        Capacidad: m.cap,
        Velocidad: m.vel,
        Fabricante: m.fab,
        "Parte #": m.parte,
        Zócalo: m.zocalo,
      });
    });
  });
  if (ramRows.length) {
    const ws3 = XLSX.utils.json_to_sheet(ramRows);
    styleSheet(ws3, ramRows.length + 1);
    XLSX.utils.book_append_sheet(wb, ws3, "Memoria RAM");
  }

  // ── Sheet 4: Aplicaciones ─────────────────────────────────────────────────
  const appRows = [];
  inventory.forEach((r) => {
    (r.apps || []).forEach((a) => {
      appRows.push({
        Equipo: r.equipo,
        Sede: r.sede || "",
        Aplicación: a.name,
        Versión: a.version,
        Editor: a.editor,
      });
    });
  });
  if (appRows.length) {
    const ws4 = XLSX.utils.json_to_sheet(appRows);
    styleSheet(ws4, appRows.length + 1);
    XLSX.utils.book_append_sheet(wb, ws4, "Aplicaciones");
  }

  const date = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `inventario_pcs_${date}.xlsx`);
}

function styleSheet(ws, rowCount) {
  const cols = Object.keys(ws).filter(k => k[0] !== "!" && k[1] === "1");
  cols.forEach((cell) => {
    ws[cell].s = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "1A1E27" } },
      alignment: { horizontal: "center" },
    };
  });
  // Auto col width
  const range = XLSX.utils.decode_range(ws["!ref"]);
  const widths = [];
  for (let C = range.s.c; C <= range.e.c; C++) {
    let max = 10;
    for (let R = range.s.r; R <= range.e.r; R++) {
      const cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
      if (cell && cell.v) max = Math.max(max, String(cell.v).length + 2);
    }
    widths.push({ wch: Math.min(max, 40) });
  }
  ws["!cols"] = widths;
}
