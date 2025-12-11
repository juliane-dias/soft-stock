import { useState, useEffect } from 'react';
import type { Product, ProductInput } from '../types';

interface StockFormProps {
  onSubmit: (data: ProductInput) => void;
  onCancel: () => void;
  editingItem: Product | null;
}

export function StockForm({ onSubmit, onCancel, editingItem }: StockFormProps) {
  const [formData, setFormData] = useState({ 
    name: '', 
    category: '', 
    qty: '', 
    price: '' 
  });

  useEffect(() => {
    if (editingItem) {
      setFormData({ 
        name: editingItem.name, 
        category: editingItem.category, 
        qty: editingItem.qty.toString(), 
        price: editingItem.price.toString() 
      });
    } else {
      setFormData({ name: '', category: '', qty: '', price: '' });
    }
  }, [editingItem]);

  const handleSubmit = () => {
    if (!formData.name || !formData.category || !formData.qty || !formData.price) {
      alert("Preencha todos os campos!");
      return;
    }

    onSubmit({
      name: formData.name,
      category: formData.category,
      qty: parseInt(formData.qty),
      price: parseFloat(formData.price)
    });

    setFormData({ name: '', category: '', qty: '', price: '' });
  };

  return (
    <div className="bg-gray-50 p-6 rounded-[25px] border border-white shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
        
        <div className="md:col-span-4 flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Produto</label>
          <input
            className="w-full h-12 px-4 rounded-xl border-2 border-transparent bg-white text-gray-600 font-medium focus:outline-none focus:border-pastel-mint focus:ring-4 focus:ring-pastel-mint/20 transition-all placeholder:text-gray-300"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: Caneta"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Categoria</label>
          <input
            className="w-full h-12 px-4 rounded-xl border-2 border-transparent bg-white text-gray-600 font-medium focus:outline-none focus:border-pastel-mint focus:ring-4 focus:ring-pastel-mint/20 transition-all placeholder:text-gray-300"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="Ex: Papelaria"
          />
        </div>
        
        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Qtd</label>
          <input
            type="number"
            className="w-full h-12 px-4 rounded-xl border-2 border-transparent bg-white text-gray-600 font-medium focus:outline-none focus:border-pastel-mint focus:ring-4 focus:ring-pastel-mint/20 transition-all"
            value={formData.qty}
            onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
            placeholder="0"
          />
        </div>

        <div className="md:col-span-2 flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Preço</label>
          <input
            type="number"
            step="0.01"
            className="w-full h-12 px-4 rounded-xl border-2 border-transparent bg-white text-gray-600 font-medium focus:outline-none focus:border-pastel-mint focus:ring-4 focus:ring-pastel-mint/20 transition-all"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="0.00"
          />
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button 
            onClick={handleSubmit}
            className={`h-12 w-full font-bold rounded-xl text-gray-700 transition-all hover:brightness-95 active:scale-95 shadow-sm ${
              editingItem ? 'bg-pastel-yellow text-yellow-800' : 'bg-pastel-mint text-green-800'
            }`}
          >
            {editingItem ? 'Salvar' : 'Adicionar'}
          </button>
          
          {editingItem && (
            <button 
              onClick={onCancel}
              className="h-12 px-3 font-bold rounded-xl bg-gray-200 text-gray-500 hover:bg-gray-300 transition-all"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
}