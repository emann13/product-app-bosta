"use client";

import CustomImage from '@/components/CustomImage/CustomImage';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useErrorStore } from '@/components/zustand-store/useErrorStore';
import { fetchCategoryProducts } from "@/APIs/apis";

import Slider from 'react-slick';
import './GenreproductSlider.css'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface GenreproductSliderProps {
  cat: string;  
  excludedproductIds: number[];
  type: string;
}

const NextArrow = (props: any) => {
  const { className, onClick } = props;
  return <div className={`${className} arrow next`} onClick={onClick}>→</div>;
};

const PrevArrow = (props: any) => {
  const { className, onClick } = props;
  return <div className={`${className} arrow prev`} onClick={onClick}>←</div>;
};

const GenreProductSlider = ({ cat, excludedproductIds, type }: GenreproductSliderProps) => {
  const [products, setproducts] = useState<any[]>([]);
  const { hasConnectionError, hasGenericError, setConnectionError, setGenericError, resetErrors } = useErrorStore(); 

  useEffect(() => {
    const fetchproductsByGenres = async () => {
      let allproducts: any[] = [];
      let uniqueproductIds = new Set<number>();
      let attempts = 0;

      // while (allproducts.length < 100 && attempts < genreIds.length * 10) {
      //   for (const genreId of genreIds) {
          try {
            const res = await fetchCategoryProducts(cat);
            console.log(res);
            if (!res.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await res.json();
            console.log("CATTT",data)
            // Added only unique products that aren't in the excludedproductIds array
            data.results.forEach((product: any) => {
              if (!uniqueproductIds.has(product.id) && !excludedproductIds.includes(product.id)) {
                uniqueproductIds.add(product.id);
                allproducts.push(product);
              }
            });
          } catch (error) {
            console.error(error);
            return; 
          }
      //   }
      //   attempts++;
      // }

      // Shuffled the products array and pick 15 unique products
      const selectedproducts = allproducts.sort(() => 0.5 - Math.random()).slice(0, 15);
      setproducts(selectedproducts);
    };

    if (cat) {
      fetchproductsByGenres();
    }
  }, [cat, excludedproductIds]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="genre-product-slider">
      {type === "favs" ? <h3 className="genre-slider-title">Similar picks for you</h3> : 
      <h3 className="genre-slider-title">More products by Genres</h3>}
{/*       
      <Slider {...sliderSettings} className="genre-slider-container">
        {products.map((product) => (
          <div key={product.id} className="slider-item">
            <Link href={`/product/${product.id}`}>
              <CustomImage
                src={`https://image.tmdb.org/t/p/w200/${product.poster_path}`}
                alt={product.title}
                width="150px"
                height="225px"
              />
              <p className="product-title">{product.title}</p>
            </Link>
          </div>
        ))}
      </Slider> */}
    </div>
  );
};

export default GenreProductSlider;
