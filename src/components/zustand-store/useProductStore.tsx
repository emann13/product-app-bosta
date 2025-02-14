"use client";

import { create } from 'zustand';

interface productStore {
  products: any[];
  addproducts: (newproducts: any[]) => void;
  resetproducts: () => void;
}

const useproductStore = create<productStore>((set, get) => ({
  products: [],
  addproducts: (newproducts) => {
    const { products } = get();
    if (Array.isArray(newproducts) && newproducts.length > 0) {
      const existingproductIds = products.map((product) => product.id);
      const uniqueproducts = newproducts.filter(
        (product) => !existingproductIds.includes(product.id)
      );
      if (uniqueproducts.length > 0) { 
        set((state) => ({ products: [...state.products, ...uniqueproducts] }));
      }
    }
  },
    resetproducts: () => set({ products: [] }),
}));

export default useproductStore;
