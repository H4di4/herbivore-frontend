import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { categoryToSlug } from '../utils/categorySlug';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  // Calculate discount amount if product is on sale and has a discount price
  const discountAmount = product.onSale && product.discountPrice
    ? (product.price - product.discountPrice).toFixed(2)
    : null;

  return (
    <div className="relative bg-white shadow-md p-0 flex flex-col justify-between items-center text-center h-[500px]">
      {/* Discount Badge */}
      {discountAmount && (
        <div className="absolute top-2 left-2 bg-[rgb(59,59,59)] text-white text-xs px-4 py-1 z-10 font-semibold">
          SAVE ${discountAmount}
        </div>
      )}

      {/* Product Image with link to product detail */}
      <div className="w-full h-auto overflow-hidden">
        <Link to={`/skincare/${categoryToSlug(product.category)}/product/${product.slug}`}>
          <img src={product.imageUrl[0]} alt={product.name} className="w-full h-full object-cover" />
        </Link>
      </div>

      {/* Product Details */}
      <div className="p-4 w-full flex flex-col justify-between flex-1">
        {/* Product Name with link */}
        <h3 className="text-sm font-medium text-gray-900 mt-2">
          <Link to={`/skincare/${categoryToSlug(product.category)}/product/${product.slug}`}>
            {product.name}
          </Link>
        </h3>

        {/* Star Rating */}
        <div className="flex justify-center mt-10 my-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 ${i < product.rating ? 'text-black' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.975 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
            </svg>
          ))}
        </div>

        {/* Price display: discounted price + original price or just original price */}
        {product.onSale && product.discountPrice ? (
          <div>
            <span className="text-gray-700 text-[16px]">${product.discountPrice.toFixed(2)}</span>
            <span className="line-through text-black font-normal ml-2 text-[16px]">${product.price.toFixed(2)}</span>
          </div>
        ) : (
          <p className="text-gray-800 text-sm mb-3">${product.price.toFixed(2)}</p>
        )}

        {/* Add to Cart button */}
        <button
          onClick={() => addToCart(product)}
          className="w-full border border-black text-black text-sm px-4 py-2 hover:bg-[rgb(59,59,59)] hover:text-white transition"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
}
