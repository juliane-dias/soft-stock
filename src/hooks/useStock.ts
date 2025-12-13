import { useState } from 'react';
import type { Product, ProductInput } from '../types';

export function useStock() {
  const [stock, setStock] = useState<Product[]>([]);

  const addProduct = (product: ProductInput) => {
    const newProduct = { ...product, id: new Date().getTime() };
    setStock((prev) => [...prev, newProduct]);
  };

  const updateProduct = (id: number, updatedData: ProductInput) => {
    setStock((prev) => 
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  const deleteProduct = (id: number) => {
    // AQUI ESTÁ A CORREÇÃO: Perguntamos antes de apagar
    if (window.confirm('Tem certeza que deseja excluir este item permanentemente?')) {
      setStock((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const removeStock = (id: number, amount: number) => {
    const item = stock.find((p) => p.id === id);
    if (!item) return;

    if (amount > item.qty) {
      alert(`Erro: Estoque insuficiente! (Disponível: ${item.qty})`);
      return;
    }

    setStock((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty - amount } : p))
    );
  };

  return { stock, addProduct, updateProduct, deleteProduct, removeStock };
}