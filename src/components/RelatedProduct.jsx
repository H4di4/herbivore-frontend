import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import Price from './Price';

export default function RelatedProducts({ productId }) {
  const { addToCart } = useCart();          // Access cart context to add products
  const [related, setRelated] = useState([]); // Store related products
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState('');         // Error message

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/api/products/related/${productId}`)
      .then(res => {
        setRelated(res.data);
        setError('');
      })
      .catch(() => setError('Failed to load related products'))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading)
    return <p className="mt-10 text-center text-sm text-gray-500">Loading related products...</p>;
  if (error)
    return <p className="mt-10 text-center text-sm text-red-500">{error}</p>;
  if (!related.length) return null;  // No related products to show

  return (
    <section className="bg-white mt-16 px-6 py-8 max-w-7xl mx-auto">
      <h2 className="text-xl font-normal text-black mb-8 text-center">RELATED PRODUCTS</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {related.map(product => (
          <div
            key={product._id}
            className="bg-white shadow-md p-0 flex flex-col justify-between items-center text-center h-[500px]"
          >
            {/* Product Image */}
            <div className="w-full h-auto overflow-hidden">
              <Link to={`/skincare/${product.category}/product/${product.slug}`}>
                <img
                  src={product.imageUrl?.[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            {/* Product Info */}
            <div className="p-4 w-full flex flex-col justify-between flex-1">
              <h3 className="text-sm font-medium text-gray-900 mt-2">
                <Link to={`/skincare/${product.category}/product/${product.slug}`} className="hover:underline">
                  {product.name}
                </Link>
              </h3>

              {/* Product Rating Stars */}
              <div className="flex justify-center mt-4 my-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < (product.rating || 0) ? 'text-black' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.975 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
                  </svg>
                ))}
              </div>

              {/* Product Price */}
              <p className="text-gray-800 text-sm mb-3"> <Price amount={product.price} /></p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(product)}
                className="w-full border border-black bg-[rgb(59,59,59)] text-white text-sm px-4 py-2 transition"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
