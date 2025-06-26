import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Price from '../components/Price';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate()

  const clearCart = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems([]);  // clear locally too
    } catch (error) {
      console.error('Failed to clear cart', error);
    }
  };

  const [email, setEmail] = useState('');
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apt: '',
    city: '',
    state: '',
    postal: '',
    country: '',
  });
  const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};

  if (!email) newErrors.email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';

  if (!shipping.firstName) newErrors.firstName = 'First name is required';
  if (!shipping.lastName) newErrors.lastName = 'Last name is required';
  if (!shipping.address) newErrors.address = 'Address is required';
  if (!shipping.city) newErrors.city = 'City is required';
  if (!shipping.state) newErrors.state = 'State is required';
  if (!shipping.postal) newErrors.postal = 'Postal code is required';
  if (!shipping.country) newErrors.country = 'Country is required';

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  const handlePlaceOrder = async () => {
  if (!validateForm()) {
    alert('Please fill all required fields correctly.');
    return;
  }
    const token = localStorage.getItem('token');
    try {
      const res = await axios.post('http://localhost:5000/api/orders/place', {
        items: cartItems,               // array of { productId, title, price, quantity }
        totalAmount: totalPrice,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Order placed!');
      clearCart();  // optional
      navigate('/profile'); // optional: show user their order history
    } catch (err) {
      console.error('Error placing order:', err);
      alert('Could not place order');
    }
  };


  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error(t('errors.fetchCartFailed'), error);
      }
    };
    fetchCart();
  }, [t]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-normal mb-10 text-center md:text-left">
        {t('checkout.title')}
      </h1>

      <div className="md:flex md:space-x-12">
        {/* LEFT: Contact & Shipping */}
        <div className="flex-1 max-w-lg mx-auto md:mx-0">
          {/* Contact Email */}
          <section className="mb-10">
            <h2 className="text-lg font-semibold mb-4">{t('checkout.contact')}</h2>
            <input
              type="email"
              placeholder={t('checkout.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-3 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </section>

          {/* Shipping Address */}
          <section>
            <h2 className="text-lg font-semibold mb-6">{t('checkout.delivery')}</h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder={t('checkout.firstName')}
                value={shipping.firstName}
                onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                placeholder={t('checkout.lastName')}
                value={shipping.lastName}
                onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                placeholder={t('checkout.address')}
                value={shipping.address}
                onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                className="sm:col-span-2 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                placeholder={t('checkout.apt')}
                value={shipping.apt}
                onChange={(e) => setShipping({ ...shipping, apt: e.target.value })}
                className="sm:col-span-2 border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                placeholder={t('checkout.city')}
                value={shipping.city}
                onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                placeholder={t('checkout.state')}
                value={shipping.state}
                onChange={(e) => setShipping({ ...shipping, state: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                placeholder={t('checkout.postal')}
                value={shipping.postal}
                onChange={(e) => setShipping({ ...shipping, postal: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
              <input
                type="text"
                placeholder={t('checkout.country')}
                value={shipping.country}
                onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                className="border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </form>
          </section>
        </div>

        {/* RIGHT: Order Summary */}
        <div className="md:w-2/4 bg-gray-50 p-8 shadow-md sticky h-full md:mt-0">
          <div className="space-y-6 max-h-[60vh] overflow-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-700">{t('checkout.cartEmpty')}</p>
            ) : (
              cartItems.map((item) => (
                <div key={item._id} className="flex space-x-4 items-center">
                  <div className="relative w-16 h-16">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover rounded"
                    />
                    <span className="absolute -top-0 -right-2 bg-gray-700 text-[9px] text-white  w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-md">
                      {item.quantity || 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-normal text-sm text-black">{item.title}</p>
                  </div>
                  <p className="font-normal text-sm text-black">
                    <Price amount={item.price * (item.quantity || 1)} />
                  </p>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-300 mt-6 pt-6">
            <div className="flex justify-between text-sm font-normal mb-2">
              <span>{t('checkout.totalLabel')}</span>
              <span><Price amount={totalPrice} /></span>
            </div>

            <button onClick={handlePlaceOrder} className="w-full bg-[rgb(59,59,59)] text-white py-3 transition font-normal">
              {t('checkout.completeOrder')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
