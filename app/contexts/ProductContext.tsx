'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '../interfaces/Product';
import { v4 as uuidv4 } from 'uuid';

interface ProductContextType {
    products: Product[];
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (updatedProduct: Product) => void;
    removeProduct: (id: string) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>(() => {
        if (typeof window !== 'undefined') {
            const savedProducts = localStorage.getItem('shoppingListProducts');
            return savedProducts ? JSON.parse(savedProducts) : [];
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('shoppingListProducts', JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (product: Omit<Product, 'id'>) => {
        const newProduct = { ...product, id: uuidv4() };
        setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts((prevProducts) =>
            prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
        );
    };

    const removeProduct = (id: string) => {
        setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, updateProduct, removeProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error('useProducts must be used within a ProductProvider');
    }
    return context;
};
