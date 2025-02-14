"use client";

import React, { useEffect, useState } from "react";
import Results from "@/components/Results/Results";
import { useCartStore } from "@/components/zustand-store/useCartStore";
import { PropagateLoaderComponent } from "@/components/PropagateLoader/PropagateLoader";
import ErrorPage from "@/components/ErrorPage/ErrorPage";
import "./cart.css";

export default function CartsPage() {
  const { carts } = useCartStore();
  const [cartGenres, setcartGenres] = useState<number[]>([]);
  const [excludedproductIds, setExcludedproductIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [sliderError, setSliderError] = useState<string | null>(null);

  useEffect(() => {
    // const uniqueGenres = new Set<number>();
    // const productIdsToExclude: number[] = [];

    // carts.forEach((cart) => {
    //   productIdsToExclude.push(cart.id);
    //   cart.genre_ids?.forEach((genreId) => uniqueGenres.add(genreId));
    // });

    // setcartGenres(Array.from(uniqueGenres));
    // setExcludedproductIds(productIdsToExclude);
    setLoading(false);
  }, [carts]);

  if (loading) {
    return (
      <div className="loading-container">
        <PropagateLoaderComponent />
      </div>
    );
  }

  if (sliderError) {
    return <ErrorPage errorType="generic"  />;
  }

  const totalCartPrice = carts.reduce((sum, item) => sum + (item.price || 0), 0);
  const shipmentFee = 2;
  const finalPrice = totalCartPrice + shipmentFee;

  return (
    <div className="carts-page">
      <h1>Your Cart</h1>
      <Results results={carts}  />

      <div className="cart-summary">
        <h2>Order Summary</h2>
        <div className="summary-item">
          <span>Subtotal:</span>
          <span>${totalCartPrice.toFixed(2)}</span>
        </div>
        <div className="summary-item">
          <span>Shipment Fee:</span>
          <span>${shipmentFee.toFixed(2)}</span>
        </div>
        <div className="summary-total">
          <span>Total:</span>
          <span>${finalPrice.toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}
