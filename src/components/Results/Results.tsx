"use client"
import React from 'react';
import Card from '../Card/Card';
import SkeletonCard from '../Card/SkeletonCard'; 
import './Results.css';
import { useLoadingStore } from '../zustand-store/useLoadingStore';
import CreateProdComponent from '../CreateProdComponent/CreateProdComponent'; 

interface Result {
  id?: number;
  title?: string;
image?: string;
  description?: string;
  price?: number;
  rating?: { rate: number; count: number };}

interface ResultsProps {
  results: Result[] | null; 
  lastRef?: (node: HTMLDivElement | null) => void;
}

export default function Results({ results, lastRef }: ResultsProps) {
  const { isLoading, setLoading } = useLoadingStore(); 
  

  return (
    <>

    <div className="results-container">
      
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => <SkeletonCard key={index} />)
        : 
        
        results?.map((result, index) => {
          if (!result || Object.keys(result).length === 0) return null; 
          if (results.length === index + 1 && lastRef) {
            return (
              <div key={result.id} >
                <Card result={result} />
              </div>
            );
          } else {
            return <Card key={result.id} result={result}  />;
          }
        })
        
        }
    </div>

    </>  );
}
