import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { categoryToSlug } from '../utils/categorySlug';
import { useTranslation } from 'react-i18next';
import Price from './Price';

const Bestsellers = () => {
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bestseller products on component mount
    async function fetchBestsellers() {
      try {
        const res = await axios.get('http://localhost:5000/api/products/bestsellers');
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchBestsellers();
  }, []);

  if (loading) return <p>{t('bestseller.loading')}</p>;

  return (
    <section className="bg-white m-12 px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl font-normal text-gray-800 mb-8">{t('bestseller.title')}</h2>

      {/* Grid of bestseller products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md p-0 flex flex-col justify-between items-center text-center h-[500px]"
          >
            {/* Product image with link to product page */}
            <div className="w-full h-auto overflow-hidden">
              <Link to={`/skincare/${categoryToSlug(product.category)}/product/${product.slug}`}>
                <img src={product.imageUrl[0]} alt={product.name} className="w-full h-full object-cover" />
              </Link>
            </div>

            {/* Product details and add to cart */}
            <div className="p-4 w-full flex flex-col justify-between flex-1">
              <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>

              {/* Star rating display */}
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

              {/* Price and add to cart button */}
              <p className="text-gray-800 text-sm mb-3">
                <Price amount={product.price} />
              </p>

              <button
                onClick={() => addToCart(product)}
                className="w-full border border-black text-black text-sm px-4 py-2 hover:bg-[rgb(59,59,59)] hover:text-white transition"
              >
                {t('bestseller.addToCart')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bestsellers;
