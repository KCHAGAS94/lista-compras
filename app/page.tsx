
'use client';

import { ProductProvider } from './contexts/ProductContext';
import { AddProduct } from './components/lista-compras/AddProduct';
import { ProductList } from './components/lista-compras/ProductList';

export default function HomePage() {
  return (
    <ProductProvider>
      <main className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Minha Lista de Compras
        </h1>
        <div className="max-w-2xl mx-auto">
          <AddProduct />
          <ProductList />
        </div>
      </main>
    </ProductProvider>
  );
}