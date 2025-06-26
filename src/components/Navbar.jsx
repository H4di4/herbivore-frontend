import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import headerImg from '../assets/header.jpg';
import dpImg1 from '../assets/dropdownimg1.avif';
import dpImg2 from '../assets/dropdownimg2.avif';
import dpImg3 from '../assets/dropdownimg3.avif';
import dpImg4 from '../assets/dropdownimg4.avif';
import CartDrawer from './CartDrawer';
import { useCart } from '../context/CartContext';
import { useSearch } from '../context/SearchContext';
import { useTranslation } from 'react-i18next';
import axios from 'axios'
import { categoryToSlug } from '../utils/categorySlug';
import LanguageSelector from './LanguageSelector';
import CurrencySelector from './CurrencySelector';

const Navbar = () => {
  const { cartItems, removeFromCart, updateQuantity, totalQuantity, totalPrice, cartOpen, setCartOpen } = useCart();
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [bestsellersDropdownOpen, setBestsellersDropdownOpen] = useState(false);
  const bestsellersDropdownRef = useRef(null);

  const dropdownRef = useRef(null);
  const { setFilters, performSearch } = useSearch();
  const [searchOpen, setSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();
  const closeTimeout = useRef(null);


  const defaultBestsellers = [
    { id: '684222c72349fc5b09479235', name: 'NOVA Brightening Serum', slug: 'nova-brightening-serum' },
    { id: '6842237b2349fc5b0947923d', name: 'MOON FRUIT Retinol Alternative', slug: 'moon-fruit-retinol-alternative' },
    { id: '6842231e2349fc5b09479239', name: 'LAPIS Balancing Facial Oil', slug: 'lapis-balancing-facial-oil' },
    { id: '684221342349fc5b09479231', name: 'PHOENIX Deep Renewal Facial Oil', slug: 'phoenix-deep-renewal-facial-oil' },
  ]
  const [bestsellers, setBestsellers] = useState(defaultBestsellers);




  useEffect(() => {
    async function fetchBestsellers() {
      try {
        const res = await axios.get('http://localhost:5000/api/products/bestsellers');
        setBestsellers(res.data);
      } catch (err) {
        console.error('Error fetching bestsellers:', err);
      }
    }

    fetchBestsellers();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, keyword: inputValue }));
    await performSearch();
    navigate(`/search?keyword=${encodeURIComponent(inputValue)}`);
  };

  const skincareItems = [
    { name: t('serums'), to: '/skincare/Serums' },
    { name: t('oils'), to: '/skincare/oils' },
    { name: t('cleansers'), to: '/skincare/cleansers' },
    { name: t('eye_creams'), to: '/skincare/eye-creams' },
    { name: t('moisturizers'), to: '/skincare/moisturizers' },
    { name: t('lip_care'), to: '/skincare/lip-care' },
  ];

  const bathAndBodyItems = [
    { name: t('bath_body'), to: `/skincare/${categoryToSlug('Bath + Body')}` },
    { name: t('scrubs'), to: '/skincare/scrubs' },
    { name: t('body_moisturizers'), to: '/skincare/body-moisturizers' },
    { name: t('soaps'), to: '/skincare/soaps' },
    { name: t('all'), to: '/skincare' },
    { name: t('new'), to: '/skincare/new' },
    { name: t('sets'), to: '/skincare/sets' },
  ];

  const concernsItems = [
    { name: t('fine_lines'), to: '/skincare/fine-lines' },
    { name: t('dullness'), to: '/skincare/dullness' },
    { name: t('dryness'), to: '/skincare/dryness' },
    { name: t('acne'), to: '/skincare/acne' },
    { name: t('redness'), to: '/skincare/redness' },
  ];





  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShopDropdownOpen(false);
      }
    };
    if (shopDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [shopDropdownOpen]);

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setShopDropdownOpen(true);
    setBestsellersDropdownOpen(false)
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (bestsellersDropdownRef.current && !bestsellersDropdownRef.current.contains(event.target)) {
        setBestsellersDropdownOpen(false);
      }
    };
    if (bestsellersDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [bestsellersDropdownOpen]);


  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setShopDropdownOpen(false);
      setBestsellersDropdownOpen(false)

    }, 200);
  };
  const handleBestsellersMouseEnter = () => {
    console.log('Bestsellers mouse enter');
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setBestsellersDropdownOpen(true);
    setShopDropdownOpen(false)
  };

  const handleBestsellersMouseLeave = () => {
    console.log('Bestsellers mouse leaves');
    closeTimeout.current = setTimeout(() => {
      setBestsellersDropdownOpen(false);
      setShopDropdownOpen(false)
    }, 200);
  };


  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white  border-b border-gray-300">


        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img src={headerImg} className="w-64 -ml-7" alt="Logo" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-10 font-bold text-black relative">
              {/* SHOP Dropdown */}

              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Link to="/skincare" className="relative text-[13px] tracking-wider after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">

                  {t("shop")}

                </Link>


                {shopDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="fixed left-0 top-[95px] bg-white border border-gray-200 shadow-lg z-40 min-h-[200px] w-screen px-20 py-8"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex gap-12">
                      {/* Column 1: Skincare */}
                      <div className="min-w-[180px] pl-8">
                        <div  className="text-black font-bold tracking-tighter text-sm mb-4">
                          {t('skincare').toUpperCase()}
                        </div>
                        <ul className="space-y-2 text-sm font-normal" onClick={() => setShopDropdownOpen(false)}>
                          {skincareItems.map(category => (
                            <li key={category.name}>
                              <Link to={category.to} className="tracking-tighter">
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Divider */}
                      <div className="border-l border-gray-300 h-56"></div>

                      {/* Column 2: Bath + Body */}
                      <div className="min-w-[180px] pl-3">
                        <div className="text-black font-bold tracking-tighter text-sm mb-4">
                          {t('bath_body').toUpperCase()}
                        </div>
                        {/* First list: main Bath + Body categories */}
                        <ul className="space-y-2 text-sm font-normal" onClick={() => setShopDropdownOpen(false)}>
                          {bathAndBodyItems.slice(0, -3).map(category => (
                            <li key={category.name}>
                              <Link to={category.to} className="tracking-tighter">
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {/* Separate list with margin top for SHOP ALL, NEW ARRIVALS, SETS + BUNDLES */}
                        <ul className="space-y-1 mt-6 text-[13px] font-normal" onClick={() => setShopDropdownOpen(false)}>
                          <li>
                            <Link to="/skincare" className="font-bold uppercase tracking-tight leading-tight">
                              {t('shop_all').toUpperCase()}
                            </Link>
                          </li>
                          <li>
                            <Link to="/skincare/new" className="font-bold uppercase tracking-tight leading-tight">
                              {t('new_arrivals').toUpperCase()}
                            </Link>
                          </li>
                          <li>
                            <Link to="/skincare/sets" className="font-bold uppercase tracking-tight leading-tight">
                              {t('sets_bundles').toUpperCase()}
                            </Link>
                          </li>
                        </ul>

                      </div>

                      {/* Divider */}
                      <div className="border-l border-gray-300 h-56"></div>

                      {/* Column 3: By Concern */}
                      <div className="min-w-[180px] pl-2">
                        <div className="text-black font-bold tracking-tighter text-sm mb-4">{t("by_concern")}</div>
                        <ul className="space-y-2 text-sm font-normal" onClick={() => setShopDropdownOpen(false)}>
                          {concernsItems.map(category => (
                            <li key={category.name}>
                              <Link to={category.to} className="tracking-tighter">
                                {category.name}
                              </Link>
                            </li>
                          ))}
                        </ul>




                      </div>
                      <div className='pl-8 gap-x-8'>
                        <Link to='/skincare/bestsellers' onClick={() => setShopDropdownOpen(false)}>
                          <img src={dpImg1} className="w-64  " alt="Logo" />
                          <p className='pl-4 text-center text-[13px] m-4'>{t("shop_bestsellers")}</p>
                        </Link>


                        <Link to='/skincare' onClick={() => setShopDropdownOpen(false)}>
                          <img src={dpImg2} className="w-64 " alt="Logo" />
                          <p className='pl-4 text-center text-[13px] m-4 mb-0'>{t("new_tremella")}</p>
                        </Link>



                      </div>
                    </div>
                  </div>

                )}
              </div>


              <div
                className="relative"
                onMouseEnter={handleBestsellersMouseEnter}
                onMouseLeave={handleBestsellersMouseLeave}
              >
                <Link
                  to="/skincare/bestsellers"
                  className="relative text-[13px] tracking-wider after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
                >
                  {t("bestsellers")}
                </Link>

                {bestsellersDropdownOpen && (
                  <div
                    ref={bestsellersDropdownRef}
                    className="fixed left-0 top-[95px] bg-white border border-gray-200 shadow-lg z-100 min-h-[320px] w-screen px-20 py-16"
                  >
                    <div className="flex gap-12">
                      <div className="pl-20">
                        <div className="text-black font-bold tracking-wide text-[15px] mb-4" onClick={() => setBestsellersDropdownOpen(false)}
                        ><Link to='/skincare/bestsellers'>{t("all_bestsellers")}</Link></div>
                        <ul className="space-y-2 text-[16px] font-normal ">
                          {bestsellers.map(product => (
                            <li key={product.id}>
                              <Link
                                to={`/skincare/${product.category}/product/${product.slug}`}
                                onClick={() => setBestsellersDropdownOpen(false)}
                              >
                                {product.name}
                              </Link>
                            </li>
                          ))}
                        </ul>

                      </div>



                      <div className="pl-8">
                        <img src={dpImg3} alt="Bestseller" className="max-w-[100%] h-auto" />
                        <p className="text-sm text-center mt-2 uppercase text-gray-900">{t("lightweight_hydration")}</p>
                      </div>

                      <div className="pl-8">
                        <img src={dpImg4} alt="Bestseller" className="max-w-[100%] h-auto" />
                        <p className="text-sm text-center mt-2 uppercase text-gray-900">{t("brightening_collection")}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className='relative'>
                <Link to="/contact" className="relative text-[13px] tracking-wider after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                  {t("contact")}
                </Link>
              </div>
              <div className='relative'>
                <Link to="/about" className="relative text-[13px] tracking-wider after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full">
                  {t("about_us")}
                </Link>

              </div>
            </div>
          </div>



          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <CurrencySelector />
            {/* Admin login icon */}
            <Link to="/login" className="hidden md:inline-block text-black" aria-label="Admin Login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor"
                strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>

            {/* Search icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="none" stroke="currentColor " className='hover:cursor-pointer'
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Search" onClick={() => setSearchOpen(!searchOpen)}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>

            {searchOpen && (

              <form onSubmit={handleSearchSubmit} className="absolute top-full -left-4 w-full bg-white shadow-md h-20 flex items-center px-4 z-40 ">
                <div className='relative flex-grow'>
                  <input
                    type="text"
                    className="w-full  px-4 py-4 text-sm focus:outline-none pr-10 "
                    placeholder="SEARCH FOR"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}

                  />
                  <button
                    onClick={() => setSearchOpen(false)}

                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-800 hover:text-gray-900 text-4xl font-normal"
                    aria-label="Close Search"
                  >
                    ×
                  </button>

                </div>
                <button type="submit" className="ml-2 text-sm font-medium text-black"> <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" fill="none" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-label="Search" >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                </button>

              </form>
            )}

            {/* Cart button */}
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="px-0 py-1 flex items-center relative"
              aria-label="Open Cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalQuantity > 0 && (
                <span className="ml-1 text-sm font-semibold text-black">{totalQuantity}</span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden focus:outline-none" aria-label="Toggle menu">
              <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
  {menuOpen && (
  <div className="md:hidden bg-white shadow-inner px-6 py-4 space-y-4 font-medium text-black">
    <Link to="/" onClick={() => setMenuOpen(false)} className="block">{t("nav.home")}</Link>
    <Link to="/about" onClick={() => setMenuOpen(false)} className="block">{t("nav.about")}</Link>
    <Link to="/blog" onClick={() => setMenuOpen(false)} className="block">{t("nav.blog")}</Link>
    <Link to="/contact" onClick={() => setMenuOpen(false)} className="block">{t("nav.contact")}</Link>
    <Link to="/admin" onClick={() => setMenuOpen(false)} className="block font-semibold">{t("nav.admin")}</Link>
    <Link to="/cart" onClick={() => setMenuOpen(false)} className="block text-2xl">🛒</Link>
  </div>
)}
</nav>

{/* Cart Drawer */}
<CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)}>
  <div className="flex flex-col h-full overflow-hidden">
    <h2 className="flex items-center justify-center text-sm font-bold mb-2">{t("cart.yourCart")}</h2>

    {cartItems.length === 0 ? (
      <>
        <p className="flex items-center justify-center flex-grow">{t("cart.empty")}</p>
        <Link
          to="/skincare"
          onClick={() => setCartOpen(false)}
          className="flex flex-col flex-1 items-center justify-center mt-4 px-4 py-4 bg-[rgb(59,59,59)] text-white text-center"
        >
          {t("cart.continueShopping")}
        </Link>
      </>
    ) : (
      <>
        {/* Scrollable Cart Items List */}
        <div className="flex-grow overflow-y-auto px-4">
          <p className="text-center text-xs">{t("cart.promo")}</p>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-around gap-1 bg-white rounded-md mb-4 p-4 relative"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-cover"
              />
              <div className="flex flex-col flex-1 ml-4">
                <h3 className="text-xs font-semibold text-gray-900">{item.title}</h3>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-1 py-1"
                    aria-label={t("cart.decreaseQuantity", { title: item.title })}
                  >
                    -
                  </button>
                  <span className="text-lg text-black">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-1 py-1"
                    aria-label={t("cart.increaseQuantity", { title: item.title })}
                  >
                    +
                  </button>
                </div>
              </div>

              <p className="text-xs font-normal text-black ml-4">
                ${item.price }
              </p>

              <button
                onClick={() => removeFromCart(item._id)}
                className="absolute top-3 right-4"
                aria-label={t("cart.removeItem", { title: item.title })}
              >
                {/* SVG icon unchanged */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
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
          ))}
        </div>

        {/* Subtotal Section fixed at bottom */}
        <div className="shrink-0 px-4 py-6 border-t border-gray-300 bg-white">
          <div className="flex justify-between text-sm font-semibold text-black mb-2">
            <span>
              {t("cart.subtotal")} ({totalQuantity} {totalQuantity === 1 ? t("cart.item") : t("cart.items")})
            </span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <Link
            to="/checkout"
            onClick={() => setCartOpen(false)}
            className="inline-block w-full bg-[rgb(59,59,59)] text-white py-3 px-4 text-center transition"
          >
            {t("cart.checkout")}
          </Link>
          <Link
            to="/cart"
            onClick={() => setCartOpen(false)}
            className="mt-2 inline-block w-full border-2 border-[rgb(59,59,59)] text-black py-3 px-4 text-center transition"
          >
            {t("cart.viewCart")}
          </Link>
          <Link
            to="/skincare"
            onClick={() => setCartOpen(false)}
            className="mt-2 text-sm inline-block w-full text-black py-3 px-4 text-center transition"
          >
            {t("cart.continueShopping")}
          </Link>
          <hr className="w-3 h-2 b" />
        </div>
      </>
    )}
  </div>
</CartDrawer>


    </>
  );
};

export default Navbar;
