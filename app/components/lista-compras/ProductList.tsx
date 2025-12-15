'use client';

import React, { useState, useEffect } from 'react';
import { useProducts } from '../../contexts/ProductContext';
import { Product } from '../../interfaces/Product';

interface EditProductFormProps {
    product: Product;
    onSave: (product: Product) => void;
    onCancel: () => void;
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product, onSave, onCancel }) => {
    const [name, setName] = useState(product.name);
    const [minQuantity, setMinQuantity] = useState(product.minQuantity || 0);
    const [buyQuantity, setBuyQuantity] = useState(product.buyQuantity || 0);
    const [quantityToBuy, setQuantityToBuy] = useState(product.quantityToBuy || 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...product, name, minQuantity, buyQuantity, quantityToBuy });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-2 w-full">
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border p-1 rounded text-black"
                placeholder="Nome do Produto"
            />
            <div className="flex space-x-2">
                <input
                    type="number"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(parseInt(e.target.value) || 0)}
                    className="border p-1 rounded w-1/3 text-black"
                    placeholder="Min Qtd"
                />
                <input
                    type="number"
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(parseInt(e.target.value) || 0)}
                    className="border p-1 rounded w-1/3 text-black"
                    placeholder="Qtd Pedido"
                />
                <input
                    type="number"
                    value={quantityToBuy}
                    onChange={(e) => setQuantityToBuy(parseInt(e.target.value) || 0)}
                    className="border p-1 rounded w-1/3 text-black"
                    placeholder="Comprar Qtd"
                />
            </div>
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={onCancel} className="px-3 py-1 bg-gray-300 rounded">Cancelar</button>
                <button type="submit" className="px-3 py-1 bg-blue-500 text-white rounded">Salvar</button>
            </div>
        </form>
    );
};

interface ProductListProps {
    view: 'all' | 'toBuy';
}

export const ProductList = ({ view }: ProductListProps) => {
    const { products, removeProduct, updateProduct } = useProducts();

    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
        setHasMounted(true);
    }, []);

    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState<string | null>(null);
    const [editingProductId, setEditingProductId] = useState<string | null>(null);

    const handleQuantityToBuyChange = (id: string, value: string) => {
        const newQuantityToBuy = parseInt(value, 10);
        const productToUpdate = products.find(p => p.id === id);
        if (productToUpdate && !isNaN(newQuantityToBuy)) {
            updateProduct({ ...productToUpdate, quantityToBuy: newQuantityToBuy });
        } else if (productToUpdate && value === '') {
            updateProduct({ ...productToUpdate, quantityToBuy: 0 });
        }
    };

    const handleDeleteClick = (id: string) => {
        setProductToDeleteId(id);
        setShowConfirmDialog(true);
    };

    const handleConfirmDelete = () => {
        if (productToDeleteId) {
            removeProduct(productToDeleteId);
            setProductToDeleteId(null);
            setShowConfirmDialog(false);
        }
    };

    const handleCancelDelete = () => {
        setProductToDeleteId(null);
        setShowConfirmDialog(false);
    };

    const handleToggleBought = (id: string, isBought: boolean) => {
        const productToUpdate = products.find(p => p.id === id);
        if (productToUpdate) {
            updateProduct({ ...productToUpdate, isBought });
        }
    };

    const handleEditClick = (id: string) => {
        setEditingProductId(id);
    };

    const handleSaveEdit = (editedProduct: Product) => {
        updateProduct(editedProduct);
        setEditingProductId(null);
    };

    const handleCancelEdit = () => {
        setEditingProductId(null);
    };

    const filteredProducts = (view === 'toBuy'
        ? products.filter(p => (p.quantityToBuy ?? 0) > 0)
        : products)
        .slice()
        .sort((a, b) => {
            // Sort by isBought (false first, true last)
            if ((a.isBought ?? false) && !(b.isBought ?? false)) return 1;
            if (!(a.isBought ?? false) && (b.isBought ?? false)) return -1;

            // Then sort by name
            return a.name.localeCompare(b.name);
        });

    const listTitle = view === 'toBuy' ? 'Comprar' : 'Lista de Compras';

    if (!hasMounted) {
        return null; // Or a loading spinner
    }

    return (
        <div className="p-4 bg-white rounded-lg shadow-md mt-8">
            <h2 className="text-xl font-semibold mb-4 text-black">{listTitle}</h2>
            {filteredProducts.length === 0 ? (
                <p className="text-black">
                    {view === 'toBuy' ? 'Nenhum produto para comprar.' : 'Nenhum produto na lista ainda.'}
                </p>
            ) : (
                <ul>
                    {filteredProducts.map((product) => (
                        <li key={product.id} className="border-b border-gray-200 py-2 flex justify-between items-center">
                            {editingProductId === product.id ? (
                                <EditProductForm product={product} onSave={handleSaveEdit} onCancel={handleCancelEdit} />
                            ) : (
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center">
                                        <div>
                                            <span className="font-medium text-black">{product.name}</span>
                                            <p className="text-sm text-black">
                                                Min: {product.minQuantity}, Pedido: {product.buyQuantity},
                                                <div className="flex items-center space-x-1">
                                                    <span>Comprar:</span>
                                                    <input
                                                        type="number"
                                                        value={product.quantityToBuy}
                                                        onChange={(e) => handleQuantityToBuyChange(product.id, e.target.value)}
                                                        className="w-20 border border-gray-300 rounded-md p-1 text-center"
                                                        min="0"
                                                    />
                                                </div>
                                            </p>

                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {view === 'toBuy' && (
                                            <input
                                                type="checkbox"
                                                checked={product.isBought ?? false}
                                                onChange={(e) => handleToggleBought(product.id, e.target.checked)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                            />
                                        )}
                                        <button
                                            onClick={() => handleEditClick(product.id)}
                                            className="text-blue-500 hover:text-blue-700 p-2 rounded-md"
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleDeleteClick(product.id)}
                                            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-sm"
                                        >
                                            X
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            {showConfirmDialog && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-xl text-black">
                        <h3 className="text-lg font-semibold mb-4">Confirmar Exclusão</h3>
                        <p className="mb-4">Tem certeza que deseja excluir este item?</p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={handleCancelDelete}
                                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                            >
                                Não
                            </button>
                            <button
                                onClick={handleConfirmDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                                Sim
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );  
};