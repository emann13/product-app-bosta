import React from 'react';
import TopRatedSlider from '@/components/TopRatedSlider/TopRatedSlider';
import CreateProdComponent from '@/components/CreateProdComponent/CreateProdComponent';
import ClientComponent from '@/components/clientComponent';
import { fetchProducts } from '@/APIs/apis'; 
import ErrorPage from '@/components/ErrorPage/ErrorPage';

export default  function Home() {
  // try {
    // const initialResults = await fetchproducts(1);
    // console.log(initialResults)
    return (
      <div>
       
        <ClientComponent />
      </div>
    );
  // } catch (error: any) {
  //   if (error.message.includes('Failed to fetch')) {
  //     return <ErrorPage errorType="connection" />;
  //   } else {
  //     return <ErrorPage errorType="generic" />;
  //   }
  // }
}
