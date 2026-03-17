import { useState } from "react";
import { Plus, Download, Monitor, HardDrive, Users, RefreshCw } from "lucide-react";
import { useInventory } from "./hooks/useInventory";
import { exportToExcel } from "./utils/exportExcel";
import InventoryForm from "./components/InventoryForm";
import InventoryTable from "./components/InventoryTable";
import styles from "./App.module.css";

export default function App() {
  const { inventory, loading, addRecord, updateRecord, deleteRecord, parseTxt } = useInventory();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSave = async (data) => {
    if (editing?.id) { await updateRecord(editing.id, data); }
    else { await addRecord(data); }
    setShowForm(false); setEditing(null);
  };

  const handleEdit = (record) => { setEditing(record); setShowForm(true); };
  const handleNew  = () => { setEditing(null); setShowForm(true); };

  const stats = {
    total: inventory.length,
    sedes: new Set(inventory.map(r => r.sede).filter(Boolean)).size,
    areas: new Set(inventory.map(r => r.area).filter(Boolean)).size,
  };

  return (
    <div className={styles.app}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Monitor size={20} style={{color:"var(--accent)"}} />
          <span>PC<strong>Inv</strong></span>
        </div>
        <nav className={styles.nav}>
          <a className={`${styles.navItem} ${styles.active}`}><HardDrive size={15}/> Inventario</a>
        </nav>
        <div className={styles.sideStats}>
          <div className={styles.statItem}><span className={styles.statVal}>{stats.total}</span><span className={styles.statLbl}>Equipos</span></div>
          <div className={styles.statItem}><span className={styles.statVal}>{stats.sedes}</span><span className={styles.statLbl}>Sedes</span></div>
          <div className={styles.statItem}><span className={styles.statVal}>{stats.areas}</span><span className={styles.statLbl}>Áreas</span></div>
        </div>
      </aside>

      {/* Main */}
      <main className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <div>
            <h1 className={styles.pageTitle}>Inventario de PCs</h1>
            <p className={styles.pageSubtitle}>Gestión y seguimiento de equipos</p>
          </div>
          <div style={{display:"flex", gap:10}}>
            <button className="btn-secondary" onClick={() => exportToExcel(inventory)} disabled={inventory.length === 0}>
              <Download size={14}/> Exportar Excel
            </button>
            <button className="btn-primary" onClick={handleNew}>
              <Plus size={14}/> Nuevo equipo
            </button>
          </div>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>
              <RefreshCw size={20} className={styles.spin} />
              <span>Cargando inventario…</span>
            </div>
          ) : (
            <InventoryTable inventory={inventory} onEdit={handleEdit} onDelete={deleteRecord} />
          )}
        </div>
      </main>

      {/* Form modal */}
      {showForm && (
        <InventoryForm
          initial={editing}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          parseTxt={parseTxt}
        />
      )}
    </div>
  );
}
