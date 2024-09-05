'use client'

const ProductCard = ({ product }) => {
  return (
    <div className="flex gap-5 border-b items-center p-4 bg-white hover:bg-gray-50 transition overflow-x-auto">
      {/* Product Image */}
      <div className="w-1/12">
        <img src={product.image} alt={product.productName} className="w-16 h-16 object-cover rounded-md" />
      </div>
      
      {/* Product Name */}
      <div className="w-1/6 overflow-hidden">
        <h2 className="text-base font-semibold whitespace-nowrap overflow-hidden">{product.productName}asdasdasd</h2>
      </div>

      {/* Product Description */}
      <div className="w-2/6 overflow-hidden">
        <p className="text-sm text-gray-600 whitespace-nowrap overflow-hidden">{product.productDescription}</p>
      </div>

      {/* Category */}
      <div className="w-1/6 overflow-hidden">
        <span className="text-sm text-gray-500 whitespace-nowrap overflow-hidden">{product.category}</span>
      </div>

      {/* Subcategory */}
      <div className="w-1/6 overflow-hidden">
        <span className="text-sm text-gray-500 whitespace-nowrap overflow-hidden">{product.subcategory}</span>
      </div>

      {/* Reference Number */}
      <div className="w-1/6 overflow-hidden">
        <span className="text-sm text-gray-500 whitespace-nowrap overflow-hidden">{product.referenceNumber}</span>
      </div>

      {/* Price */}
      <div className="w-1/6">
        <span className="text-lg font-semibold text-blue-600">${product.price}</span>
      </div>
    </div>
  );
};

export default ProductCard;
