import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(Boolean);

  // Declare hooks first
  const [productName, setProductName] = useState(null);

  const productIndex = pathnames.findIndex(seg => seg === 'product');
  const productSlug = productIndex !== -1 && pathnames[productIndex + 1] ? pathnames[productIndex + 1] : null;

  useEffect(() => {
    if (productSlug) {
      axios
        .get(`http://localhost:5000/api/products/slug/${productSlug}`)
        .then(res => setProductName(res.data.name))
        .catch(() => setProductName(null));
    } else {
      setProductName(null);
    }
  }, [productSlug]);

  // Now conditionally return null if not on a product page
  if (!productSlug) return null;

  // Filter out product segments to build breadcrumb links
  const filteredPathnames = pathnames.filter(x => x !== 'product' && x !== productSlug);

  return (
    <nav className="breadcrumb-container p-6 mt-6 bg-white text-[11px]">
      <ol className="flex flex-wrap items-center space-x-2 text-[10px] text-black">
        {filteredPathnames.map((value, index) => {
          const isLast = index === filteredPathnames.length - 1;
          const to = `/${filteredPathnames.slice(0, index + 1).join('/')}`;
          const label = value.replace(/-/g, ' ').toUpperCase();

          return (
            <React.Fragment key={to}>
              <li className="flex items-center">
                {isLast && productName ? (
                  <Link to={to} className="uppercase">{label}</Link>
                ) : isLast ? (
                  <span className="uppercase">{label}</span>
                ) : (
                  <Link to={to} className="uppercase">{label}</Link>
                )}
              </li>
              {!isLast && <li>/</li>}
            </React.Fragment>
          );
        })}

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
