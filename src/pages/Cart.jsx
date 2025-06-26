import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Price from '../components/Price';
import { useTranslation } from 'react-i18next';

const Cart = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error(t('error.fetchCartFailed'), error);
      }
    };

    fetchCartItems();
  }, [t]);

  const totalPrice = cartItems.reduce((total, item) => {
    const qty = item.quantity || 1;
    return total + item.price * qty;
  }, 0);

  const totalQuantity = cartItems.reduce((total, item) => {
    return total + (item.quantity || 1);
  }, 0);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error(t('error.removeFailed'), error);
    }
  };

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await axios.patch(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity });
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error(t('error.updateQuantityFailed'), error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 mt-20">
      <h1 className="text-3xl font-normal mb-10 text-center md:text-left">{t('carts.yourCart')}</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-700 text-lg">{t('carts.empty')}</p>
      ) : (
        <div className="md:flex md:space-x-10">
          {/* Cart Items List */}
          <div className="flex-1">
            {/* Header row */}
            <div className="hidden md:flex justify-between font-normal text-xs border-b border-gray-300 pb-3 mb-6 text-gray-700">
              <div className="w-2/5">{t('carts.product')}</div>
              <div className="w-1/5 text-center">{t('carts.quantity')}</div>
              <div className="w-1/5"></div> {/* for remove button */}
              <div className="w-1/5 text-right">{t('carts.total')}</div>
            </div>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col md:flex-row items-start md:items-center border-b border-gray-300 py-6"
              >
                {/* Product Info */}
                <div className="md:w-2/3 flex items-start md:items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover flex-shrink-0 rounded"
                  />
                  <div className="ml-4">
                    <h3 className="text-sm font-normal text-black">{item.title}</h3>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="md:w-1/5 flex items-center justify-center mt-4 md:mt-0">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-3 py-1"
                    aria-label={t('carts.decreaseQuantity', { title: item.title })}
                  >
                    −
                  </button>
                  <span className="px-4 py-1 font-semibold text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 "
                    aria-label={t('carts.increaseQuantity', { title: item.title })}
                  >
                    +
                  </button>
                </div>

                {/* Remove button */}
                <div className="md:w-1/5 flex justify-center mt-4 md:mt-0">
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-gray-500 "
                    aria-label={t('carts.removeItem', { title: item.title })}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    </svg>
                  </button>
                </div>

                {/* Total Price */}
                <div className="md:w-1/5 text-right font-normal text-gray-900 mt-4 md:mt-0">
                  <Price amount={item.price * item.quantity} />
                </div>

              </div>
            ))}
          </div>

          {/* Summary & Checkout */}
          <div className="mt-10 md:mt-0 md:w-96 sticky top-24 self-start border border-gray-300 rounded p-6 shadow-sm">
            <div className="flex justify-between text-lg font-normal mb-4">
              <span>{t('carts.totalItems')}:</span>
              <span>{totalQuantity}</span>
            </div>
            <div className="flex justify-between text-xl font-normal mb-6">
              <span>{t('carts.totalPrice')}:</span>
              <Price amount={totalPrice} />
            </div>
            <p className="text-xs text-gray-500 mb-6">{t('carts.taxesShipping')}</p>
            <Link
              to="/checkout"
              className="block text-center bg-[rgb(59,59,59)] text-white py-3 text-sm font-normal"
            >
              {t('carts.checkout')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
