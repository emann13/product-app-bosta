"use client";

import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton styles
import './SkeletonCard.css'; // Create your CSS file for custom styles

const SkeletonCard: React.FC = () => {
  return (
    <div className="card skeleton-custom">
      <Skeleton height={200} style={{ borderRadius: '0.5rem' }} />
      <div className="cardContent">
        <Skeleton height={20} style={{ margin: '0.5rem 0', borderRadius: '4px' }} />
        <Skeleton height={15} style={{ margin: '0.5rem 0', borderRadius: '4px' }} count={2} />
      </div>
    </div>
  );
};

export default SkeletonCard;
