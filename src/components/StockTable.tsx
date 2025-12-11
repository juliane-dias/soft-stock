import type { Product } from '../types';

interface StockTableProps {
  items: Product[];
  onEdit: (item: Product) => void;
  onDelete: (id: number) => void;
  onStockOut: (item: Product) => void;
}

export function StockTable({ items, onEdit, onDelete, onStockOut }: StockTableProps) {
  return (
    <div className="bg-white rounded-[25px] shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">ID</th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider w-full">Produto</th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider">Categoria</th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Estoque</th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">Preço Un.</th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50/80 transition-colors group">
              <td className="p-5 text-gray-400 font-mono text-sm">#{item.id}</td>
              <td className="p-5">
                <span className="font-semibold text-gray-700 text-lg">{item.name}</span>
              </td>
              <td className="p-5">
                <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs font-bold uppercase tracking-wide">
                  {item.category}
                </span>
              </td>
              <td className="p-5 text-center">
                <span className={`inline-block whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-bold border ${
                  item.qty < 5 
                    ? 'bg-red-50 text-red-600 border-red-100' 
                    : 'bg-green-50 text-green-700 border-green-100'
                }`}>
                  {item.qty} un
                </span>
              </td>
              <td className="p-5 font-medium text-gray-600 whitespace-nowrap">
                {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </td>
              <td className="p-5">
                <div className="flex items-center justify-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => onStockOut(item)} 
                    title="Dar Baixa"
                    className="whitespace-nowrap h-8 px-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs border border-blue-100 transition-colors"
                  >
                    📉 Baixa
                  </button>
                  <button 
                    onClick={() => onEdit(item)} 
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 border border-yellow-100 transition-colors"
                  >
                    ✎
                  </button>
                  <button 
                    onClick={() => onDelete(item.id)} 
                    className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-500 hover:bg-red-100 border border-red-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="p-10 text-center text-gray-400 italic">
                Nenhum item cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}