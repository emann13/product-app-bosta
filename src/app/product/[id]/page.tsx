"use client";
import React, { useState, useEffect, use } from "react";
import CustomImage from "@/components/CustomImage/CustomImage";
import StarRatings from "react-star-ratings"; 
import "./product.css";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import { fetchProduct } from "@/APIs/apis";
import { useCartStore } from "@/components/zustand-store/useCartStore";
import { useLoadingStore } from "@/components/zustand-store/useLoadingStore";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import { PropagateLoaderComponent } from "@/components/PropagateLoader/PropagateLoader";
import { useErrorStore } from "@/components/zustand-store/useErrorStore";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: productId } = use(params); 
  const [product, setProduct] = useState<any>(null);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const { isLoading, setLoading } = useLoadingStore();
  const { hasConnectionError, hasGenericError, setConnectionError, setGenericError, resetErrors } = useErrorStore();
  const { carts, addcart, removecart } = useCartStore();
  const isCart = carts.some((fav) => fav.id === parseInt(productId));

  useEffect(() => {
    const getProductData = async () => {
      resetErrors();
      setLoading(true);
      try {
        const productData = await fetchProduct(productId);
        setProduct(productData);
      } catch (error) {
        if (error instanceof Error && error.message.includes("Failed to fetch")) {
          setConnectionError(true);
        } else {
          setGenericError(true);
        }
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getProductData();
  }, [productId]);

  const handleCartClick = () => {
    if (isCart) {
      removecart(parseInt(productId));
    } else {
      addcart(product);
    }

    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 500);
  };

  if (hasConnectionError) return <ErrorPage errorType="connection" />;
  if (hasGenericError) return <ErrorPage errorType="generic" />;

  return (
    <div className="product-page-container">
      {isLoading ? (
        <PropagateLoaderComponent />
      ) : product ? (
        <>
          <div
            className="product-backdrop"
            style={{
              backgroundImage: product.image,
            }}
          >
            <div className="product-overlay"></div>
          </div>

          <div className="product-content">
            <div className="product-poster-section">
              <div className="product-poster">
                <CustomImage
                  src={product.image}
                  alt={product.title}
                  type=""
                  width="100%"
                  height="60%"
                />
              </div>
            </div>

            <div className="product-details">
              <div className="title-cart">
                <h1 className="product-title" style={{ fontSize: "1.6rem" }}>
                  {product.title}
                </h1>
                <PiShoppingCartSimpleFill
                  className={`cart-icon ${cartAnimation ? "cart-animate" : ""}`}
                  onClick={handleCartClick}
                  style={{ color: isCart ? "#E30613" : "black" }}
                />
              </div>

              <p className="product-genre" style={{marginBottom: "10px"}}>
                <strong>Category:</strong> {product.category}
              </p>

              <h3 style={{ color: "#E30613" }}>{product.price}$</h3>

              <div className="product-rating">
                <span className="product-label">Rating:</span>
                <StarRatings
                  rating={Number(product.rating.rate)}
                  starRatedColor="#ffd700"
                  numberOfStars={5}
                  starDimension="21px"
                  starSpacing="2px"
                  name="rating"
                />
                <span>{` (${product.rating.count} votes)`}</span>
              </div>

              <p className="product-overview">
                {showFullDescription
                  ? product.description
                  : product.description.length > 200
                  ? product.description.substring(0, 200) + "..."
                  : product.description}
                {product.description.length > 200 && (
                  <button
                  style={{ color: "#E30613" , border: "none", background: "none" , cursor: "pointer" }}
                    className="see-more-btn"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                  >
                    {showFullDescription ? " See Less" : "See More"}
                  </button>
                )}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div>
          <h1>No product data available</h1>
        </div>
      )}
    </div>
  );
}
