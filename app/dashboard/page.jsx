'use client'

import ProductCard from "@/components/ProductCard";
import ProductTable from "@/components/ProductTable";
import { getProducts } from "@/lib/actions/product.actions";
import { useEffect, useState } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className='lg:p-10 max-md:pt-16'>
      <h1 className='text-3xl font-medium mb-10 px-2'>Products</h1>
      <div className="w-full px-2">
        <ProductTable products={products}/>
      </div>
    </div>
  );
};

export default ProductsPage;