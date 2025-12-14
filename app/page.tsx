
'use client';

import { useState } from 'react';
import { ProductProvider } from './contexts/ProductContext';
import { AddProduct } from './components/lista-compras/AddProduct';
import { ProductList } from './components/lista-compras/ProductList';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<'all' | 'toBuy'>('all'); // 'all' or 'toBuy'

  return (
    <ProductProvider>
      <main className="min-h-screen p-8 bg-gray-50">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Minha Lista de Compras
        </h1>
        <div className="max-w-2xl mx-auto">
          <AddProduct />
          <div className="flex justify-center mt-4 mb-4 space-x-4">
            <button
              onClick={() => setCurrentView('all')}
              className={`py-2 px-4 rounded-md ${
                currentView === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Lista de Compras
            </button>
            <button
              onClick={() => setCurrentView('toBuy')}
              className={`py-2 px-4 rounded-md ${
                currentView === 'toBuy'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Comprar
            </button>
          </div>
          <ProductList view={currentView} />
        </div>
      </main>
    </ProductProvider>
  );
}