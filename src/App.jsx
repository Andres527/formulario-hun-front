import { useState } from "react";
import { useInventory } from "./hooks/useInventory";
import { exportToExcel } from "./utils/exportExcel";
import InventoryForm from "./components/inventory/InventoryForm";
import InventoryTable from "./components/inventory/InventoryTable";
import Sidebar from "./components/layout/SideBar";
import Topbar from "./components/layout/TopBar";

export default function App() {
  const { inventory, loading, addRecord, updateRecord, deleteRecord, parseTxt } = useInventory();
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const handleSave = async (data) => {
    if (editing?.id) await updateRecord(editing.id, data);
    else await addRecord(data);
    setShowForm(false);
    setEditing(null);
  };

  const handleEdit = (record) => {
    setEditing(record);
    setShowForm(true);
  };

  const handleNew = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditing(null);
  };

  const stats = {
    total: inventory.length,
    sedes: new Set(inventory.map(r => r.sede).filter(Boolean)).size,
    areas: new Set(inventory.map(r => r.area).filter(Boolean)).size,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#0d0f12] text-[#e8eaf0]">

      <Sidebar stats={stats} />

      <main className="flex flex-col flex-1 overflow-hidden">
        <Topbar
          onNew={handleNew}
          onExport={() => exportToExcel(inventory)}
          canExport={inventory.length > 0}
        />

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-48 gap-3 text-[#8891a8]">
              <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              <span>Cargando inventario…</span>
            </div>
          ) : (
            <InventoryTable
              inventory={inventory}
              onEdit={handleEdit}
              onDelete={deleteRecord}
            />
          )}
        </div>
      </main>

      {showForm && (
        <InventoryForm
          initial={editing}
          onSave={handleSave}
          onCancel={handleCancel}
          parseTxt={parseTxt}
        />
      )}
    </div>
  );
}