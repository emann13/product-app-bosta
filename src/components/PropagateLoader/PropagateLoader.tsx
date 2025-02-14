"use client";

import React from 'react';
import { PropagateLoader } from 'react-spinners';
import './PropagateLoader.css'; 

export const PropagateLoaderComponent = () => {
  return (
    <div className="loader-container">
      <PropagateLoader color="#E30613" size={15} /> 
    </div>
  );
};
