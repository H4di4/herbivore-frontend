import react from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageTitle() {
  const location = useLocation();

  useEffect(() => {
   
    switch (location.pathname) {
      case '/':
        document.title = 'Plant-Powered, Clinically Effective Skincare';
        break;
      case '/collections':
        document.title = 'Plant-Powered Skincare Products';
        break;
      case '/collections/bestsellers':
        document.title = 'Bestseller Herbivore Products';
        break;
        case '/about':
        document.title = 'About Us';
        break;
        case '/contact':
        document.title = 'Contact Us | Customer Support';
        break;
         case '/blog/news':
        document.title = 'NATURALLY SPEAKING';
        break;
  
      default:
        document.title = 'Plant-Powered, Cllinically Effective Skincare';
    }
  }, [location]);
}

export default usePageTitle;
