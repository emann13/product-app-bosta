import React from 'react';
import './Pagination.css'; // Style it as you like

interface PaginationProps {
  totalProducts: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ totalProducts, pageSize, currentPage, onPageChange }: PaginationProps) => {
  const totalPages = Math.ceil(totalProducts / pageSize);
  if (totalPages <1) return null; 

  return (
    <div className="pagination">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        ◀
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
        >
          {index + 1}
        </button>
      ))}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
