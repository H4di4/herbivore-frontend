// context/CurrencyContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CurrencyContext = createContext();
export const useCurrency = () => {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
};


export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('USD');
    const [exchangeRates, setExchangeRates] = useState({});

    useEffect(() => {
        console.log("Exchange rates:", exchangeRates);
        console.log("Selected currency:", currency);
    }, [exchangeRates, currency]);


    useEffect(() => {
        console.log("CurrencyProvider mounted, initial currency:", currency);
        const fetchRates = async () => {
            try {
                const res = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
                setExchangeRates(res.data.rates);
                console.log("CurrencyProvider mounted, initial currency:", currency);
            } catch (err) {
                console.error('Failed to fetch exchange rates:', err);
            }
        };

        fetchRates();
    }, []);

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRates }}>
            {children}
        </CurrencyContext.Provider>
    );
};
