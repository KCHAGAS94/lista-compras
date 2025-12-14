'use client';

import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';

export const AddProduct = () => {
    const { addProduct } = useProducts();
    const [name, setName] = useState('');
    const [minQuantity, setMinQuantity] = useState(1);
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [currentStock, setCurrentStock] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            addProduct({ name, minQuantity, buyQuantity, currentStock });
            setName('');
            setMinQuantity(1);
            setBuyQuantity(1);
            setCurrentStock(0);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-black">Adicionar Novo Produto</h2>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-black">
                    Produto
                </label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="minQuantity" className="block text-sm font-medium text-black">
                    Quantidade Mínima
                </label>
                <input
                    type="number"
                    id="minQuantity"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(parseInt(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    min="1"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="buyQuantity" className="block text-sm font-medium text-black">
                    Quantidade de Compra
                </label>
                <input
                    type="number"
                    id="buyQuantity"
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(parseInt(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    min="1"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="currentStock" className="block text-sm font-medium text-black">
                    Estoque Atual
                </label>
                <input
                    type="number"
                    id="currentStock"
                    value={currentStock}
                    onChange={(e) => setCurrentStock(parseInt(e.target.value))}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    min="0"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            >
                Adicionar Produto
            </button>
        </form>
    );
};
