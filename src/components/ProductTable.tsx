
"use client";
import { useState, useEffect } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product, direction: 'ascending' | 'descending' }>({ key: 'name', direction: 'ascending' });

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then(response => response.json())
      .then(data => setProducts(data));
  }, []);

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key: keyof Product) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <input
        type="text"
        placeholder="Buscar por nombre"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th onClick={() => requestSort('name')} className="px-6 py-3 text-left text-sm uppercase tracking-wider cursor-pointer">Nombre</th>
              <th onClick={() => requestSort('description')} className="px-6 py-3 text-left text-sm uppercase tracking-wider cursor-pointer">Descripción</th>
              <th onClick={() => requestSort('price')} className="px-6 py-3 text-left text-sm uppercase tracking-wider cursor-pointer">Precio</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {sortedProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-100">
                <td className="border px-6 py-4">{product.name}</td>
                <td className="border px-6 py-4">{product.description}</td>
                <td className="border px-6 py-4">{product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

