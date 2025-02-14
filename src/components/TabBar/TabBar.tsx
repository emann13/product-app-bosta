// components/TabBar/TabBar.tsx
"use client";
import React from 'react';
import { Tabs, Tab } from '@mui/material';
import './TabBar.css';

interface TabBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TabBar: React.FC<TabBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <></>
    // <Tabs
    //   value={activeTab}
    //   onChange={(event, newValue) => onTabChange(newValue)}
    //   textColor="inherit"
    //   indicatorColor="secondary"
    //   variant="fullWidth"
    //   sx={{
    //     backgroundColor: '#1d1c1c', // Transparent background
    //     // borderRadius: '8px',
    //     padding: '0.5rem', // Optional: padding for the tabs
    //   }}
    // >
    //   <Tab label="All" value="all" />
    //   <Tab label="Top Rated" value="top-rated" />
    //   <Tab label="Trending" value="trending" />
    // </Tabs>
  );
};

export default TabBar;
