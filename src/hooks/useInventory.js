import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export function useInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/inventory`)
      .then((r) => r.json())
      .then((data) => setInventory(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const addRecord = async (data) => {
    const res = await fetch(`${API}/inventory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const record = await res.json();
    setInventory((prev) => [...prev, record]);
    return record;
  };

  const updateRecord = async (id, data) => {
    const res = await fetch(`${API}/inventory/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setInventory((prev) => prev.map((r) => (r.id === id ? updated : r)));
    return updated;
  };

  const deleteRecord = async (id) => {
    await fetch(`${API}/inventory/${id}`, { method: "DELETE" });
    setInventory((prev) => prev.filter((r) => r.id !== id));
  };

  const parseTxt = async (file) => {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${API}/parse`, { method: "POST", body: form });
    return res.json();
  };

  return { inventory, loading, addRecord, updateRecord, deleteRecord, parseTxt };
}
