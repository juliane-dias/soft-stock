import { useEffect, useState } from "react";
import { StockForm } from "./components/StockForm";
import { StockTable } from "./components/StockTable";
import type { Product, ProductInput } from "./types";

const API_URL = "http://localhost:4000/products";

export default function App() {
  const [items, setItems] = useState<Product[]>([]);
  const [editingItem, setEditingItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 BUSCAR PRODUTOS DO BACKEND
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Limpa qualquer erro anterior

        const res = await fetch(API_URL);

        if (!res.ok) {
          throw new Error(`Erro HTTP: ${res.status}`);
        }

        const data = await res.json();

        // Garante que seja array
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          console.warn("Resposta não é array:", data);
          setItems([]);
        }
      } catch (err) {
        console.error("Erro ao buscar produtos", err);
        setError("Erro ao carregar produtos. Tente novamente.");
        setItems([]); // Previne crash
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 🔹 INSERIR / ATUALIZAR PRODUTO
  const handleSubmit = async (data: ProductInput) => {
    try {
      setError(null); // Limpa o erro antes de tentar salvar

      const res = await fetch(
        editingItem ? `${API_URL}/${editingItem.id}` : API_URL,
        {
          method: editingItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }

      const savedItem = await res.json();

      // UPDATE
      if (editingItem) {
        setItems((prev) =>
          prev.map((item) => (item.id === editingItem.id ? savedItem : item))
        );
        setEditingItem(null);
      }
      // CREATE
      else {
        setItems((prev) => [...prev, savedItem]);
      }
    } catch (err) {
      console.error("Erro ao salvar produto", err);
      setError("Erro ao salvar o produto. Tente novamente.");
    }
  };

  // 🔹 DELETAR PRODUTO
  const handleDelete = async (id: number) => {
    try {
      setError(null); // Limpa qualquer erro

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Erro HTTP: ${res.status}`);
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erro ao deletar produto", err);
      setError("Erro ao deletar o produto. Tente novamente.");
    }
  };

  return (
    <div className="p-8">
      <StockForm
        onSubmit={handleSubmit}
        onCancel={() => setEditingItem(null)}
        editingItem={editingItem}
      />

      {loading && <p className="mt-4 text-gray-500">Carregando produtos...</p>}

      {error && <p className="mt-4 text-red-500 font-semibold">{error}</p>}

      {!loading && !error && (
        <StockTable
          items={items}
          onEdit={setEditingItem}
          onDelete={handleDelete}
          onStockOut={() => {}}
        />
      )}
    </div>
  );
}
