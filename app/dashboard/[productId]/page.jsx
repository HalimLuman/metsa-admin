'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // If using Next.js
import { deleteProductById, getProductById } from "@/lib/actions/product.actions";
import { Button } from "@/components/ui/button";
import { formatHeader } from "@/lib/utils";

const ProductPage = () => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductById(params.productId);
        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    if (params.productId) {
      fetchProduct();
    }
  }, [params.productId]);

  const handleRemoveProduct = async () => {
    try{
      const result = await deleteProductById(params.productId);
      if(result){
        router.push('/dashboard');
      }

    }catch(error){
      console.log(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 md:p-10 w-full">
      <h1 className="text-2xl font-semibold mb-6 pb-3 border-b">Product Management</h1>

      <div className="flex flex-col md:flex-row gap-10 items-start bg-white p-6 rounded-md">
        {/* Product Image */}
        <div className="w-full md:w-1/3">
          <img src={product.image} alt={product.productName} className="w-full object-cover rounded-md" />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3">
          <p className="text-gray-700 text-lg mb-4">
            <span className="font-semibold">Description: </span>{product.productDescription}
          </p>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Category: </span>{formatHeader(product.category)}
          </p>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Subcategory: </span>{formatHeader(product.subcategory)}
          </p>

          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Reference Number: </span>{product.referenceNumber}
          </p>

          <p className="text-blue-600 font-semibold text-xl mb-4">
            Price: ${product.price}
          </p>

          <div className="flex flex-col gap-3">

          <Button
            onClick={handleRemoveProduct}
            className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition w-[150px]"
          >
            Remove
          </Button>
          <Button
            onClick={() => router.push('/dashboard/update')}
            className=" bg-white border text-black py-2 px-4 rounded hover:bg-gray-200 transition w-[150px]"
          >
            Update
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
