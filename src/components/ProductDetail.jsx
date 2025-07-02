import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import RelatedProducts from './RelatedProduct';
import Newsletter from './Newsletter';
import Footer from './Footer';
import FAQSection from './FAQSection';
import Price from './Price';

// Image gallery with thumbnails and main image
function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = React.useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex max-w-full mx-auto ">
      {/* Thumbnails vertical */}
      <div className="flex flex-col space-y-2 mr-11">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setSelectedImage(index)}
            className={`w-16 h-16 object-cover cursor-pointer border ${
              index === selectedImage ? 'border-black' : ''
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <img
          src={images[selectedImage]}
          alt={`Product image ${selectedImage + 1}`}
          className="object-cover w-full h-[500px]"
        />
      </div>
    </div>
  );
}

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useCart();

  // State to toggle ingredients and how to use sections
  const [showIngredients, setShowIngredients] = useState(false);
  const [showHowToUse, setShowHowToUse] = useState(false);

  // Product data and loading/error states
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product by slug when component mounts or slug changes
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/products/slug/${slug}`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load product');
        setLoading(false);
      });
  }, [slug]);

  // Loading state
  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading product...</p>;

  // Error state
  if (error) return <p className="text-center mt-10 text-black">{error}</p>;

  // If no product found
  if (!product)
    return <p className="text-center mt-10 text-gray-600">Product not found.</p>;

  return (
    <>
      <div className="max-w-7xl mx-auto mt-2 text-gray-900">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left side: Product images */}
          <div className="md:w-1/2">
            <ImageGallery images={product.imageUrl} />
          </div>

          {/* Right side: Product details */}
          <div className="md:w-1/2 flex flex-col">
            <h1 className="text-xl font-normal mb-10">{product.name}</h1>

            {/* Price with sale discount if applicable */}
            {product.onSale && product.discountPrice ? (
              <div>
                <span className="text-gray-700 text-xl">
                 <Price amount={product.discountPrice} />
                </span>
                <span className="line-through text-black font-normal ml-6 text-sm">
                  <Price amount={product.price} />
                </span>
              </div>
            ) : (
              <p className="text-lg"> <Price amount={product.price} /></p>
            )}

            {/* Add to Cart button */}
            <button
              onClick={() => addToCart(product)}
              className="inline-block w-full bg-[rgb(59,59,59)] text-white py-3 px-4 text-center transition mb-4 mt-8"
            >
              ADD TO CART
            </button>

            {/* Product description */}
            <p className="text-[15px] mt-5">{product.description}</p>

            {/* Ingredients toggle section */}
            <div className="border-t mt-12 border-gray-300 py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowIngredients(!showIngredients)}
              >
                <h2 className="text-base font-medium">INGREDIENTS</h2>
                <span className="text-xl font-light">
                  {showIngredients ? '−' : '+'}
                </span>
              </div>
              {showIngredients && (
                <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {product.ingredients}
                </p>
              )}
            </div>

            {/* How to Use toggle section */}
            <div className="border-t border-gray-300 py-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowHowToUse(!showHowToUse)}
              >
                <h2 className="text-base font-medium">HOW TO USE</h2>
                <span className="text-xl font-light">
                  {showHowToUse ? '−' : '+'}
                </span>
              </div>
              {showHowToUse && (
                <p className="mt-3 text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                  {product.howToUse}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Related products section */}
        <RelatedProducts productId={product._id} />
      </div>

      {/* FAQ, Newsletter, and Footer components */}
      <FAQSection />
      <Newsletter />
      <Footer />
    </>
  );
}
