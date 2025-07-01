import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; 
import Newsletter from './Newsletter';
import Footer from './Footer';
import { slugToCategory } from '../utils/categorySlug';

const ProductCategoryPage = () => {
  const { category } = useParams();  // Get category slug from URL
  const [products, setProducts] = useState([]);  // Products list state
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  const categoryName = slugToCategory(category); // Convert slug to readable category name

  // Fetch products by category slug when component mounts or category changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        setProducts(res.data);
        setError(null);  // Clear previous errors on success
      } catch (err) {
        console.error('Error loading products', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Show loading message while fetching data
  if (loading) return <p className="text-center mt-12 text-lg">Loading products...</p>;

  // Show error message if fetch fails
  if (error) return <p className="text-center mt-12 text-black">{error}</p>;

  return (
    <>
      {/* Category title and product grid */}
      <section className="bg-white m-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-normal text-gray-800 mb-8 uppercase">{categoryName}</h2>

        {/* Show message if no products */}
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found in this category.</p>
        ) : (
          // Product cards grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer components */}
      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductCategoryPage;
