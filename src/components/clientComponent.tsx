'use client';

import React, { useEffect, useState } from 'react';
import TabBar from './TabBar/TabBar';
import Results from './Results/Results';
import { fetchProducts, fetchCategories, fetchCategoryProducts } from '../APIs/apis'; 
import { PropagateLoaderComponent } from '@/components/PropagateLoader/PropagateLoader';
import ErrorPage from '@/components/ErrorPage/ErrorPage';
import Pagination from '@/components/Pagination/Pagination';
import CreateProdComponent from '@/components/CreateProdComponent/CreateProdComponent';
import './clientComponent.css';

const ClientComponent = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);  
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        let products;
        if (selectedCategory) {
          products = await fetchCategoryProducts(selectedCategory);
        } else {
          products = await fetchProducts(20);
        }
        
        products = [...products].sort((a, b) =>
          sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
        );

        setAllProducts(products);
      } catch (error) {
        setError('connection');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategory, sortOrder]);

  if (error === "connection") {
    return <ErrorPage errorType="connection" />;
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const indexOfLastProduct = currentPage * pageSize;
  const indexOfFirstProduct = indexOfLastProduct - pageSize;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <>
              <CreateProdComponent />

      <div className="filters">
        <select 
          onChange={(e) => setSelectedCategory(e.target.value || null)} 
          className="dropdown"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select 
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')} 
          className="dropdown"
        >
          <option value="asc">Sort by A-Z</option>
          <option value="desc">Sort by Z-A</option>
        </select>
      </div>

      <TabBar activeTab="all" onTabChange={() => {}} />
      <Results results={currentProducts} /> 

      <Pagination 
        totalProducts={allProducts.length} 
        pageSize={pageSize} 
        currentPage={currentPage} 
     onPageChange={handlePageChange} 
      />

      {loading && (
        <div className="loading-container">
          <PropagateLoaderComponent />
        </div>
      )}
    </>
  );
};

export default ClientComponent;
