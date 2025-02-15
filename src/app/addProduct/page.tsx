"use client";
import React, { useState, useEffect, use } from "react";
import { Button, TextField, Grid, Typography, MenuItem } from "@mui/material";
import { useLoadingStore } from "@/components/zustand-store/useLoadingStore";
import { useErrorStore } from "@/components/zustand-store/useErrorStore";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { PropagateLoaderComponent } from "@/components/PropagateLoader/PropagateLoader";
import { addProduct, fetchCategories } from "@/APIs/apis";
import { ToastContainer, toast } from "react-toastify";
import { GrFormAdd } from "react-icons/gr";

import "react-toastify/dist/ReactToastify.css";
import "./AddProduct.css";

export default function AddProductPage() {
  const { isLoading, setLoading } = useLoadingStore();
  const { hasConnectionError, hasGenericError } = useErrorStore();
const [stock, setStock] = useState(0);
  const [productData, setProductData] = useState({
    title: "",
    category: "",
    price: 0,
    description: "",
    image: "",
  });

  const [categories, setCategories] = useState<string[]>([]);
useEffect(() => {
    setStock(0);  

} , [stock]);
  useEffect(() => {
    setLoading(false);
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
       // toast.error("Failed to fetch categories.");
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);

  if (hasConnectionError) return <ErrorPage errorType="connection" />;
  if (hasGenericError) return <ErrorPage errorType="generic" />;

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!productData.title || !productData.category || !productData.price ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await addProduct(productData);
      toast.success("Product added successfully!");
      setStock(0);
      setProductData({
        title: "",
        category: "",
        price: 0,
        description: "",
        image: "",
      });
    } catch (error) {
      toast.error("Error adding product. Please try again.");
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-page-container">
      <ToastContainer  />
      {isLoading ? (
        <PropagateLoaderComponent />
      ) : (
        <div className="product-content">
          <Typography className="product-add-title" color="#E30613" fontWeight="bold" fontSize="2rem" fontFamily="Ubuntu">
            Add a New Product
          </Typography>
          <form onSubmit={handleSubmit} className="product-form">
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Product Name *" name="title" value={productData.title} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth select label="Category *" name="category" value={productData.category} onChange={handleChange}>
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Price *" name="price" type="number" value={productData.price} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Stock Quantity " name="stock" type="number" value={stock} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth multiline rows={3} label="Description" name="description" value={productData.description} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Image URL" name="image" value={productData.image} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Button
                  variant="contained"
                  type="submit"
                  endIcon={<GrFormAdd />}
                  
                  disabled={isLoading}
                  sx={{
                    backgroundColor: isLoading ? "#ccc" : "#E30613",
                    "&:hover": { backgroundColor: isLoading ? "#ccc" : "#B30410" },
                  }}
                >
                  Add Product
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      )}
    </div>
  );
}
