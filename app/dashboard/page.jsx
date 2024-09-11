'use client'

import ProductCard from "@/components/ProductCard";
import ProductTable from "@/components/ProductTable";
import { getProducts } from "@/lib/actions/product.actions";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData || []); // Ensure productsData is always an array
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Set products to an empty array in case of error
      }
    };
  
    fetchProducts();
  }, []);

  return (
    <div className='p-6 lg:p-10'>
      <h1 className='text-3xl font-medium mb-10 px-2'>Products</h1>
      <div className="w-full px-2">
        <ProductTable products={products}/>
      </div>
    </div>
  );
};

export default Page;
