// 'use client'

const BASE_URL = 'https://fakestoreapi.com/products';


export const fetchProduct = async (productId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${productId}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCategoryProducts = async (cat: string) => {
  try {
    const response = await fetch(`${BASE_URL}/category/${cat}`);
    if (!response.ok) throw new Error('Failed to fetch category products');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchProducts = async (page: number) => {
  try {
    console.log(`${BASE_URL}?limit=${page}`);
    const response = await fetch(`${BASE_URL}?limit=${page}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addProduct = async (productData: {
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
}) => {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error('Failed to add product');

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
