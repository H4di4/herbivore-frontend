import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const [cartOpen, setCartOpen] = useState(false);
  const fetchCartItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/cart');
      setCartItems(res.data);
    } catch (err) {
      console.error('Failed to fetch cart items:', err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const addToCart = async (product, quantity = 1) => {
  const existingItem = cartItems.find(item => item.title === product.name);
  if (existingItem) {
    updateQuantity(existingItem._id, existingItem.quantity + quantity);
  } else {
    try {
      const res = await axios.post('http://localhost:5000/api/cart', {
        title: product.name,
        price: product.price,
        image: product.imageUrl[0],
        quantity,
      });
      setCartItems(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Failed to add item to cart:', err);
    }
    
  }
    setCartOpen(true);
};


  const removeFromCart = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCartItems(prev => prev.filter(item => item._id !== id));
    } catch (err) {
      console.error('Failed to remove item from cart:', err);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.patch(`http://localhost:5000/api/cart/${id}`, { quantity });
      setCartItems(prev =>
        prev.map(item =>
          item._id === id ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error('Failed to update quantity:', err);
    }
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalQuantity, totalPrice, fetchCartItems ,cartOpen , setCartOpen}}
    >
      {children}
    </CartContext.Provider>
  );
};
