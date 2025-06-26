import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; 
import Newsletter from './Newsletter';
import Footer from './Footer';
import { slugToCategory } from '../utils/categorySlug';

const ProductCategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categoryName = slugToCategory(category); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5000/api/products/category/${category}`);
        setProducts(res.data);
        setError(null);
      } catch (err) {
        console.error('Error loading products', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <p className="text-center mt-12 text-lg">Loading products...</p>;
  if (error) return <p className="text-center mt-12 text-black">{error}</p>;

  return (
    <>
      <section className="bg-white m-12 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-normal text-gray-800 mb-8 uppercase">{categoryName}</h2>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default ProductCategoryPage;
