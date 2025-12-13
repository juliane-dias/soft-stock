import type { Product } from "../types";

interface StockTableProps {
  items: Product[];
  onEdit: (item: Product) => void;
  onDelete: (id: number) => void;
  onStockOut: (item: Product) => void;
}

export function StockTable({
  items,
  onEdit,
  onDelete,
  onStockOut,
}: StockTableProps) {
  return (
    <div className="bg-white rounded-[25px] shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50/50">
          <tr>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase">
              ID
            </th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase w-full">
              Produto
            </th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase">
              Categoria
            </th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase text-center">
              Estoque
            </th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase">
              Preço Un.
            </th>
            <th className="p-5 text-xs font-bold text-gray-400 uppercase text-center">
              Ações
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-50">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition">
              <td className="p-5 text-gray-400 font-mono">#{item.id}</td>

              <td className="p-5 font-semibold text-gray-700">{item.name}</td>

              <td className="p-5">
                <span className="bg-gray-100 px-2 py-1 rounded text-xs font-bold">
                  {item.category}
                </span>
              </td>

              <td className="p-5 text-center">
                <span
                  className={`px-3 py-1 rounded text-xs font-bold ${
                    item.qty < 5
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-700"
                  }`}
                >
                  {item.qty} un
                </span>
              </td>

              <td className="p-5 font-medium text-gray-600">
                {Number(item.price).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>

              <td className="p-5 text-center">
                <div className="flex gap-2 justify-center">
                  <button onClick={() => onStockOut(item)}></button>
                  <button onClick={() => onEdit(item)}>✎</button>
                  <button onClick={() => onDelete(item.id)}>✕</button>
                </div>
              </td>
            </tr>
          ))}

          {items.length === 0 && (
            <tr>
              <td colSpan={6} className="p-10 text-center text-gray-400">
                Nenhum produto cadastrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
