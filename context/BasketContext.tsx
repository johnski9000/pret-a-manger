"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { MenuItem } from "@/data/menu";

export type BasketItem = {
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

type BasketContextType = {
  items: BasketItem[];
  addItem: (item: BasketItem) => void;
  removeItem: (menuItemId: number) => void;
  updateQuantity: (menuItemId: number, quantity: number) => void;
  clearBasket: () => void;
  total: number;
};

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<BasketItem[]>([]);

  // Calculate total whenever items change
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Persist basket in localStorage
  useEffect(() => {
    const savedBasket = localStorage.getItem("basket");
    if (savedBasket) setItems(JSON.parse(savedBasket));
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(items));
  }, [items]);

  const addItem = (item: BasketItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === item.menuItemId);
      if (existing) {
        return prev.map((i) =>
          i.menuItemId === item.menuItemId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeItem = (menuItemId: number) => {
    setItems((prev) => prev.filter((item) => item.menuItemId !== menuItemId));
  };

  const updateQuantity = (menuItemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(menuItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.menuItemId === menuItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearBasket = () => setItems([]);

  return (
    <BasketContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearBasket, total }}
    >
      {children}
    </BasketContext.Provider>
  );
}

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context)
    throw new Error("useBasket must be used within a BasketProvider");
  return context;
};
