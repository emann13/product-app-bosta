"use client";
import React from "react";
import Slider from "react-slick"; 
import "./TopRatedSlider.css"; 
import Link from "next/link";

// Import static images
import offer1 from "@/assets/offers-imgs/offer1.jpg";
import offer2 from "@/assets/offers-imgs/offer2.jpg";
import offer3 from "@/assets/offers-imgs/offer3.jpg";

// Array of offer posters
const offerImages = [
  { id: 1, src: "/offers-imgs/offer1.jpg", alt: "Offer 1" },
  { id: 2, src: "/offers-imgs/offer2.jpg", alt: "Offer 2" },
  { id: 3, src: "/offers-imgs/offer3.jpg", alt: "Offer 3" },
];


interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

// Custom Next Arrow component
const NextArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} arrow next`}
      style={{ ...style }}
      onClick={onClick}
    >
      →
    </div>
  );
};

// Custom Previous Arrow component
const PrevArrow: React.FC<ArrowProps> = ({ className, style, onClick }) => {
  return (
    <div
      className={`${className} arrow prev`}
      style={{ ...style }}
      onClick={onClick}
    >
      ←
    </div>
  );
};

const TopRatedSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // nextArrow: <NextArrow />,
    // prevArrow: <PrevArrow />,
  };

  return (
    <div className="top-rated-slider">
      {/* <Slider {...settings}>
        {offerImages.map((offer) => (
          <div className="slider-item" key={offer.id}>
            <div className="slider-image-container">
              <img
                src={offer.src || ""}
                width="50%"
                height="50%"
                alt={offer.alt}
              />
            </div>
          </div>
        ))}
      </Slider> */}
    </div>
  );
};

export default TopRatedSlider;
