import { useState } from 'react';
import { useStock } from './hooks/useStock';
import { StockForm } from './components/StockForm';
import { StockTable } from './components/StockTable';
import type { Product, ProductInput } from './types';
import './assets/global.css';

function App() {
  const { stock, addProduct, updateProduct, deleteProduct, removeStock } = useStock();
  const [editingItem, setEditingItem] = useState<Product | null>(null);

  const handleFormSubmit = (data: ProductInput) => {
    if (editingItem) {
      updateProduct(editingItem.id, data);
      setEditingItem(null);
    } else {
      addProduct(data);
    }
  };

  const handleStockOutRequest = (item: Product) => {
    const amount = prompt(`Quantos itens de "${item.name}" saíram?`);
    if (amount) removeStock(item.id, parseInt(amount));
  };

  return (
    <div className="min-h-screen bg-background flex justify-center p-6 md:p-10">
      <div className="w-full max-w-5xl bg-white p-8 md:p-10 rounded-[30px] shadow-xl h-fit">
        <h1 className="text-3xl font-bold text-center text-text-dark mb-8">
          📦 SoftStock <span className="text-pastel-mint-dark">Manager</span>
        </h1>
        
        <StockForm 
          onSubmit={handleFormSubmit} 
          onCancel={() => setEditingItem(null)}
          editingItem={editingItem}
        />

        <StockTable 
          items={stock}
          onEdit={(item) => setEditingItem(item)}
          onDelete={deleteProduct}
          onStockOut={handleStockOutRequest}
        />
      </div>
    </div>
  );
}

export default App;