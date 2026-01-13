"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
    id: string; // or slug
    name: string;
    price: number;
    originalPrice?: number;
    type: "test" | "package";
    testPreparation?: string;
    reportTat?: string;
    Item_ID?: string;
    CategoryID?: string;
    SubCategoryID?: string;
    LabType?: string;
};

type CartContextType = {
    items: CartItem[];
    isOpen: boolean;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    toggleCart: (open?: boolean) => void;
    openCart: () => void;
    closeCart: () => void;
    cartTotal: number;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart_items");
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart items", e);
            }
        }
    }, []);

    // Save cart to local storage whenever it changes
    useEffect(() => {
        localStorage.setItem("cart_items", JSON.stringify(items));
    }, [items]);

    const addToCart = (item: CartItem) => {
        // Check if already in cart
        if (!items.find((i) => i.id === item.id)) {
            setItems((prev) => [...prev, item]);
        }
        setIsOpen(true); // Auto open cart
    };

    const removeFromCart = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const toggleCart = (open?: boolean) => {
        setIsOpen((prev) => (open !== undefined ? open : !prev));
    };

    const openCart = () => setIsOpen(true);
    const closeCart = () => setIsOpen(false);

    const clearCart = () => {
        setItems([]);
    };

    const cartTotal = items.reduce((total, item) => total + item.price, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                isOpen,
                addToCart,
                removeFromCart,
                toggleCart,
                openCart,
                closeCart,
                cartTotal,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};
