// context/SearchContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    skinConcerns: [],
     bestseller: false,
  });

  const [results, setResults] = useState([]);

  const performSearch = async () => {
    const params = new URLSearchParams();

    if (filters.keyword) params.append('keyword', filters.keyword);
    if (filters.category) params.append('category', filters.category);
    if (filters.skinConcerns.length)
      params.append('skinConcerns', filters.skinConcerns.join(','));
    if (filters.bestseller) params.append('isBestSeller', 'true');


    const res = await axios.get(`http://localhost:5000/api/products/search?${params.toString()}`);
    setResults(res.data);
  };

  return (
    <SearchContext.Provider value={{ filters, setFilters, performSearch, results  }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
