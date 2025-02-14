"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import CustomImage from "../CustomImage/CustomImage";
import "./Card.css";
import Skeleton from "react-loading-skeleton";
import { PiShoppingCartSimpleFill } from "react-icons/pi";
import StarRatings from "react-star-ratings"; 
import { useCartStore, useCartsHydration } from "../zustand-store/useCartStore";
import { useLoadingStore } from "../zustand-store/useLoadingStore";

interface CardProps {
  result: {
    rating?: { rate: number; count: number };
    id?: number;
    image?: string;
    title?: string;
    description?: string;
    price?: number;
  };
}

export default function Card({ result }: CardProps) {
  const altText = result.title || "product poster";
  const [animateClass, setAnimateClass] = useState("");
  const [cartAnimate, setCartAnimate] = useState(false);
  const { isLoading } = useLoadingStore();

  useCartsHydration(); // Ensure store is hydrated

  const { carts, addcart, removecart } = useCartStore();
  const iscart = carts.some((cat) => cat.id === result.id);

  useEffect(() => {
    if (!isLoading) {
      setAnimateClass("card-loaded");
    }
  }, [isLoading]);

  const handlecartToggle = () => {
    if (iscart) {
      removecart(result.id||0);
    } else {
      addcart(result);
    }
    setCartAnimate(true);
    setTimeout(() => setCartAnimate(false), 300);
  };

  return (
    <div className={`card ${animateClass}`} style={{ position: "relative" }}>
      {result.id && (
        <Link href={`/product/${result.id}`} passHref>
          {isLoading ? (
            <Skeleton height={200} style={{ marginBottom: "1rem" }} />
          ) : (
            <CustomImage
              src={result.image || ""}
              width="100%"
              height="70%"
              alt={altText}
              type="card"
            />
          )}
          <div className="cardContent">
            <h3 className="title">
              {isLoading ? <Skeleton width="60%" /> : result.title }
            </h3>
            <h5 className="overview" style={{ color: "gray" }}>
              {isLoading ? <Skeleton count={2} /> : result.description}
            </h5>
            <h3 style={{ color: "#E30613" }}>{result.price}$</h3>
            <h3 className="info">
              {isLoading ? (
                <Skeleton width="40%" />
              ) : (
                <div>
                  <StarRatings
                    rating={Number(result?.rating?.rate||0)}
                    starRatedColor="#ffd700"
                    numberOfStars={5}
                    starDimension="17px"
                    starSpacing="2px"
                    name="rating"
                  />
                  <span style={{ fontSize: "15px" }}>
                    {"("}
                    {result.rating?.count}
                    {")"} votes
                  </span>
                </div>
              )}
            </h3>
          </div>
        </Link>
      )}

      <div className="view-details-container">
        <Link href={`/product/${result.id}`} passHref>
          <button className="view-details-btn">View Details</button>
        </Link>
      </div>

      <PiShoppingCartSimpleFill
        onClick={handlecartToggle}
        className={`cart-icon ${cartAnimate ? "cart-animate" : ""}`}
        style={{
          color: iscart ? "#E30613" : "white",
        }}
      />
    </div>
  );
}
