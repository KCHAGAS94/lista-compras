'use client';

import React, { useState } from 'react';
import { useProducts } from '../../contexts/ProductContext';

export const AddProduct = () => {
    const { addProduct } = useProducts();
    const [name, setName] = useState('');
    const [minQuantity, setMinQuantity] = useState(1);
    const [buyQuantity, setBuyQuantity] = useState(1);
    const [quantityToBuy, setQuantityToBuy] = useState(0);
    const [isFormVisible, setIsFormVisible] = useState(false); // New state for form visibility

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            addProduct({ name, minQuantity, buyQuantity, quantityToBuy });
            setName('');
            setMinQuantity(1);
            setBuyQuantity(1);
            setQuantityToBuy(0);
            setIsFormVisible(false); // Hide form after adding product
        }
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow-md">
            <button
                onClick={() => setIsFormVisible(!isFormVisible)}
                className=" bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 flex justify-between items-center"
            >
                <h2 className="text-xl font-semibold"><span>{isFormVisible ? 'Adicionar --' : 'Adicionar +'}</span></h2>
                
            </button>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="mt-4">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-black">
                            Produto
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
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
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                            min="1"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="quantityToBuy" className="block text-sm font-medium text-black">
                            Comprar
                        </label>
                        <input
                            type="number"
                            id="quantityToBuy"
                            value={quantityToBuy}
                            onChange={(e) => setQuantityToBuy(parseInt(e.target.value))}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-black"
                            min="0"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Adicionar Produto
                    </button>
                </form>
            )}
        </div>
    );
};
