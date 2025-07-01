import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Breadcrumbs = () => {
  // Get current URL path from react-router
  const location = useLocation();

  // Split path into segments, removing empty strings (from leading/trailing slashes)
  const pathnames = location.pathname.split('/').filter(Boolean);

  // State to store fetched product name (for product pages)
  const [productName, setProductName] = useState(null);

  // Find if the URL contains "product" segment and get the slug after it
  const productIndex = pathnames.findIndex(seg => seg === 'product');
  const productSlug = productIndex !== -1 && pathnames[productIndex + 1] ? pathnames[productIndex + 1] : null;

  // Fetch product name from API whenever productSlug changes
  useEffect(() => {
    if (productSlug) {
      axios
        .get(`http://localhost:5000/api/products/slug/${productSlug}`)
        .then(res => setProductName(res.data.name))  // Store product name
        .catch(() => setProductName(null));          // Reset on error
    } else {
      setProductName(null); // Reset if no productSlug
    }
  }, [productSlug]);

  // If not on a product page, do not show breadcrumbs
  if (!productSlug) return null;

  // Filter out 'product' and the productSlug from pathnames for breadcrumb links
  const filteredPathnames = pathnames.filter(x => x !== 'product' && x !== productSlug);

  return (
    <nav className="breadcrumb-container p-6 mt-6 bg-white text-[11px]">
      <ol className="flex flex-wrap items-center space-x-2 text-[10px] text-black">
        {filteredPathnames.map((value, index) => {
          const isLast = index === filteredPathnames.length - 1;
          // Construct the URL for each breadcrumb link
          const to = `/${filteredPathnames.slice(0, index + 1).join('/')}`;
          // Format the label (replace dashes with spaces and uppercase)
          const label = value.replace(/-/g, ' ').toUpperCase();

          return (
            <React.Fragment key={to}>
              <li className="flex items-center">
                {/* 
                  If last breadcrumb and productName exists, render link.
                  Otherwise, render span if last or link if not last.
                */}
                {isLast && productName ? (
                  <Link to={to} className="uppercase">{label}</Link>
                ) : isLast ? (
                  <span className="uppercase">{label}</span>
                ) : (
                  <Link to={to} className="uppercase">{label}</Link>
                )}
              </li>
              {/* Separator between breadcrumbs */}
              {!isLast && <li>/</li>}
            </React.Fragment>
          );
        })}

        {/* Show product name at the end if available */}
        {productName && (
          <>
            <li>/</li>
            <li className="flex items-center uppercase">{productName}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
