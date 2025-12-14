'use client';

import React from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { Product } from '../../interfaces/Product';

export const ProductList = () => {
    const { products, removeProduct, updateProduct } = useProducts();

    const handleStockChange = (id: string, value: string) => {
        const newStock = parseInt(value, 10);
        const productToUpdate = products.find(p => p.id === id);
        if (productToUpdate && !isNaN(newStock)) { // Only update if newStock is a valid number
            updateProduct({ ...productToUpdate, currentStock: newStock });
        } else if (productToUpdate && value === '') { // Allow clearing the input to set stock to 0
            updateProduct({ ...productToUpdate, currentStock: 0 });
        }
    };

    const getStatusColor = (product: Product) => {
        if (product.currentStock < product.minQuantity) {
            return 'text-red-500'; // Needs restock
        } else if (product.currentStock >= product.buyQuantity) {
            return 'text-green-500'; // Sufficient stock
        }
        return 'text-yellow-500'; // Low stock but above minimum
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-semibold mb-4 text-black">Lista de Compras</h2>
            {products.length === 0 ? (
                <p className="text-black">Nenhum produto na lista ainda.</p>
            ) : (
                <ul>
                    {products.map((product) => (
                        <li key={product.id} className="border-b border-gray-200 py-2 flex justify-between items-center">
                            <div>
                                <span className="font-medium text-black">{product.name}</span>
                                <p className="text-sm text-black">
                                    Min: {product.minQuantity}, Compra: {product.buyQuantity}, Estoque:
                                    <input
                                        type="number"
                                        value={product.currentStock}
                                        onChange={(e) => handleStockChange(product.id, e.target.value)}
                                        className="ml-2 w-20 border border-gray-300 rounded-md p-1 text-center"
                                        min="0"
                                    />
                                </p>
                                <p className={`text-sm ${getStatusColor(product)}`}>
                                    {product.currentStock < product.minQuantity ? 'Repor!' : 'Estoque OK'}
                                </p>
                            </div>
                            <button
                                onClick={() => removeProduct(product.id)}
                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-sm"
                            >
                                Remover
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
