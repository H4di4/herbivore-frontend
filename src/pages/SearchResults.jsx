import React, { useEffect } from 'react';
import { useSearch } from '../context/SearchContext';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const SearchResults = () => {
  const { results, filters, setFilters, performSearch } = useSearch();
  const { addToCart } = useCart();

 
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const keywordFromURL = urlParams.get('keyword') || '';
    if (keywordFromURL) {
      setFilters(prev => ({ ...prev, keyword: keywordFromURL, bestseller: true }));
    }
  }, [setFilters]);

  useEffect(() => {
    if (filters.keyword || filters.bestseller) {
      performSearch();
    }
  }, [filters.keyword, filters.bestseller, performSearch]);

  return (
    <>
      <section className="bg-white m-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-normal text-gray-800 mb-8">SEARCH RESULTS</h2>
        <p className="text-center text-sm text-black mb-4">
          Results for "{filters.keyword}"
        </p>

        {results.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {results.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-md p-0 flex flex-col justify-between items-center text-center h-[500px]"
              >
                <div className="w-full h-auto overflow-hidden">
                  <Link to={`/skincare/product/${product.name}`}>
                    <img
                      src={product.imageUrl[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>
                </div>
                <div className="p-4 w-full flex flex-col justify-between flex-1">
                  <h3 className="text-sm font-medium text-gray-900 mt-2">
                    <Link to={`/skincare/product/${product.name}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </h3>

                  {/* Ratings */}
                  <div className="flex justify-center mt-10 my-2">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < product.rating ? 'text-black' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.674a1 1 0 00.95.69h4.908c.969 0 1.371 1.24.588 1.81l-3.976 2.89a1 1 0 00-.364 1.118l1.518 4.674c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.975 2.89c-.784.57-1.838-.197-1.539-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.976-2.89c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.95-.69l1.518-4.674z" />
                      </svg>
                    ))}
                  </div>

                  {/* Category */}
                  <p className="text-xs text-gray-600">{product.category}</p>

                  {/* Price */}
                  <p className="text-gray-800 text-sm mb-3">${product.price.toFixed(2)}</p>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full border border-black text-black text-sm px-4 py-2 hover:bg-[rgb(59,59,59)] hover:text-white transition"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default SearchResults;
