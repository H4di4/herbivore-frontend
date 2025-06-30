import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';
import Cart from './pages/Cart';
import AboutUs from './components/AboutUs';
import AllSkincare from './components/AllSkincare';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Contact from './components/Contact';
import { CartProvider } from './context/CartContext';
import Bestsellers from './components/Bestsellers';
import ProductDetail from './components/ProductDetail';
import BlogList from './pages/BlogList';
import BlogDetail from './pages/BlogDetail';
import { SearchProvider } from './context/SearchContext';
import SearchResults from './pages/SearchResults';
import usePageTitle from './hooks/PageTitle';
import ProductCategoryPage from './components/ProductsCategoryPage';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import Breadcrumbs from './components/Breadcrums';
import { TranslateProvider } from './context/TranslateProvider';
import { AuthContext, AuthProvider } from './context/AuthContext';

import "./i18n";
import FAQSection from './components/FAQSection';
import AdminLogin from './pages/AdminLogin';
import OrderDetails from './components/OrderDetails';

const App = () => {
  usePageTitle();

  return (
    <AuthProvider>
     
  
    <TranslateProvider>
      <SearchProvider>
        <CartProvider>
        
            <Navbar />
            <main className='pt-20'>
              <Breadcrumbs />
            </main>

            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/skincare" element={<AllSkincare />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/skincare/bestsellers" element={<Bestsellers />} />
              <Route path="/skincare/:category/product/:slug" element={<ProductDetail />} />
              <Route path="/blog/news" element={<BlogList />} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/skincare/:category" element={<ProductCategoryPage />} />
              <Route path="/edit-profile" element={<EditProfile />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/faq" element={<FAQSection/>} />
              <Route path="/admin/login" element={<AdminLogin/>} />
              <Route path="/orders/:id" element={<OrderDetails />} />


              
              

            </Routes>
       
        </CartProvider>
      </SearchProvider>
    </TranslateProvider>
      </AuthProvider>
  );
};

export default App;
