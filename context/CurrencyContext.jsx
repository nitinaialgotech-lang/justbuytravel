"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

const CURRENCY_STORAGE_KEY = "justbuytravel_currency";

export const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AED: 3.67,
  SAR: 3.75,
  INR: 83.12,
};

export const CURRENCY_LABELS = {
  USD: { symbol: "$", code: "USD", name: "US Dollar" },
  EUR: { symbol: "€", code: "EUR", name: "Euro" },
  GBP: { symbol: "£", code: "GBP", name: "British Pound" },
  AED: { symbol: "د.إ", code: "AED", name: "UAE Dirham" },
  SAR: { symbol: "﷼", code: "SAR", name: "Saudi Riyal" },
  INR: { symbol: "₹", code: "INR", name: "Indian Rupee" },
};

const SUPPORTED_CURRENCIES = Object.keys(CURRENCY_RATES);
const DEFAULT_CURRENCY = "USD";

const CurrencyContext = createContext(null);

function getInitialCurrency() {
  if (typeof window === "undefined") return DEFAULT_CURRENCY;
  const stored = localStorage.getItem(CURRENCY_STORAGE_KEY);
  return SUPPORTED_CURRENCIES.includes(stored) ? stored : DEFAULT_CURRENCY;
}

export function CurrencyProvider({ children }) {
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);

  useEffect(() => {
    setCurrencyState(getInitialCurrency());
  }, []);

  const setCurrency = useCallback((newCurrency) => {
    if (!SUPPORTED_CURRENCIES.includes(newCurrency)) return;
    setCurrencyState(newCurrency);
    if (typeof window !== "undefined") {
      localStorage.setItem(CURRENCY_STORAGE_KEY, newCurrency);
    }
  }, []);

  const formatPrice = useCallback(
    (amountUsd, options = {}) => {
      if (amountUsd == null || typeof amountUsd !== "number") return "";
      const rate = CURRENCY_RATES[currency] ?? 1;
      const value = amountUsd * rate;
      const { symbol } = CURRENCY_LABELS[currency] ?? { symbol: currency };
      const { decimals = 2 } = options;
      return `${symbol}${value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`;
    },
    [currency]
  );

  const convertFromUsd = useCallback(
    (amountUsd) => {
      if (amountUsd == null || typeof amountUsd !== "number") return 0;
      return amountUsd * (CURRENCY_RATES[currency] ?? 1);
    },
    [currency]
  );

  const value = {
    currency,
    setCurrency,
    formatPrice,
    convertFromUsd,
    supportedCurrencies: SUPPORTED_CURRENCIES,
    currencyLabels: CURRENCY_LABELS,
  };

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
