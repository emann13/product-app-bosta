// components/CreateProdComponent/CreateProdComponent.tsx
"use client";
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation'; 
import {useLoadingStore} from '@/components/zustand-store/useLoadingStore';
import './CreateProdComponent.css';
import { GrFormAdd } from "react-icons/gr";
import { Button } from '@mui/material';

const CreateProdComponent = () => {
  const [query, setQuery] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const router = useRouter(); 
    const { isLoading,setLoading } = useLoadingStore();
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClick = () => {
      router.push(`/addProduct`); 
      setLoading(true);

    
  };

  const handleScroll = () => {
    setIsSticky(window.scrollY > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`createProd-container `
    // ${isSticky ? 'sticky' : ''}
    }>{!isLoading&& <Button
      variant="contained"
      type="submit"
      endIcon={<GrFormAdd />}
      onClick={handleClick}
      sx={{
        backgroundColor: "#E30613",
        "&:hover": { backgroundColor: "#B30410" },
      }}
    >
      Add Product
    </Button>
}
       
      {/* <TextField
        variant="outlined"
        value={query}
        onChange={handleChange}
        placeholder="CreateProd for products..."
        className="createProd-input"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CreateProdIcon />
            </InputAdornment>
          ),
        }}
      />
      {query && (
        <IconButton 
          color="primary" 
          onClick={handleCreateProd} 
          style={{ marginLeft: '10px' , backgroundColor:"white",
               width:"50px", height:"50px"
            }} 
        >
          <CreateProdIcon />
        </IconButton>
      )} */}
    </div>
  );
};

export default CreateProdComponent;
