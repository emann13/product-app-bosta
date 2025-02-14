"use client";
import { create } from 'zustand';
import { useEffect } from 'react';

interface cartItem {
  id?: number;
  title?: string;
image?: string;
  description?: string;
  price?: number;
  rating?: { rate: number; count: number };}

interface cartStore {
  carts: cartItem[];
  addcart: (item: cartItem) => void;
  removecart: (id: number) => void;
  hydratecarts: () => void;
}

export const useCartStore = create<cartStore>((set) => ({
  carts: [],

  addcart: (item) => {
    set((state) => {
      const updatedcarts = [...state.carts, item];
      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(updatedcarts));
      }
      return { carts: updatedcarts };
    });
  },

  removecart: (id) => {
    set((state) => {
      const updatedcarts = state.carts.filter((p) => p.id !== id);
      if (typeof window !== "undefined") {
        localStorage.setItem("carts", JSON.stringify(updatedcarts));
      }
      return { carts: updatedcarts };
    });
  },

  hydratecarts: () => {
    if (typeof window !== "undefined") {
      const storedcarts = JSON.parse(localStorage.getItem("carts") || "[]");
      set({ carts: storedcarts });
    }
  },
}));

export const useCartsHydration = () => {
  const hydratecarts = useCartStore((state) => state.hydratecarts);

  useEffect(() => {
    hydratecarts();
  }, [hydratecarts]);
};
