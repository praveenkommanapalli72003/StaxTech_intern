import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockRates } from '../utils/currencyData';

interface CurrencyState {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Converter
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  setAmount: (amount: number) => void;
  swapCurrencies: () => void;

  // Exchange rates
  rates: Record<string, number>;
  lastUpdated: Date | null;
  setRates: (rates: Record<string, number>) => void;

  // Favorites
  favoritePairs: { from: string; to: string }[];
  addFavorite: (from: string, to: string) => void;
  removeFavorite: (from: string, to: string) => void;

  // Multi currency
  targetCurrencies: string[];
  addTargetCurrency: (currency: string) => void;
  removeTargetCurrency: (currency: string) => void;

  // Watchlist
  watchlist: string[];
  addToWatchlist: (currency: string) => void;
  removeFromWatchlist: (currency: string) => void;

  // Portfolio
  portfolio: { currency: string; amount: number; avgPrice: number }[];
  addToPortfolio: (currency: string, amount: number, avgPrice: number) => void;
  updatePortfolio: (currency: string, amount: number, avgPrice: number) => void;
  removeFromPortfolio: (currency: string) => void;

  // Alerts
  alerts: { id: string; from: string; to: string; targetRate: number; createdAt: number }[];
  addAlert: (from: string, to: string, targetRate: number) => void;
  removeAlert: (id: string) => void;

  // Active view
  activeView: string;
  setActiveView: (view: string) => void;
}

export const useStore = create<CurrencyState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: true,
      toggleTheme: () => set(state => ({ isDarkMode: !state.isDarkMode })),

      // Converter
      fromCurrency: 'USD',
      toCurrency: 'EUR',
      amount: 100,
      setFromCurrency: (currency) => set({ fromCurrency: currency }),
      setToCurrency: (currency) => set({ toCurrency: currency }),
      setAmount: (amount) => set({ amount }),
      swapCurrencies: () => set(state => ({
        fromCurrency: state.toCurrency,
        toCurrency: state.fromCurrency,
      })),

      // Exchange rates
      rates: mockRates,
      lastUpdated: null,
      setRates: (rates) => set({ rates, lastUpdated: new Date() }),

      // Favorites
      favoritePairs: [],
      addFavorite: (from, to) => set(state => {
        const exists = state.favoritePairs.some(p => p.from === from && p.to === to);
        if (exists) return state;
        return { favoritePairs: [...state.favoritePairs, { from, to }].slice(0, 10) };
      }),
      removeFavorite: (from, to) => set(state => ({
        favoritePairs: state.favoritePairs.filter(p => !(p.from === from && p.to === to)),
      })),

      // Multi currency
      targetCurrencies: ['EUR', 'GBP', 'JPY', 'INR'],
      addTargetCurrency: (currency) => set(state => {
        if (state.targetCurrencies.includes(currency)) return state;
        return { targetCurrencies: [...state.targetCurrencies, currency].slice(0, 10) };
      }),
      removeTargetCurrency: (currency) => set(state => ({
        targetCurrencies: state.targetCurrencies.filter(c => c !== currency),
      })),

      // Watchlist
      watchlist: ['EUR', 'GBP', 'JPY', 'BTC', 'ETH'],
      addToWatchlist: (currency) => set(state => {
        if (state.watchlist.includes(currency)) return state;
        return { watchlist: [...state.watchlist, currency].slice(0, 20) };
      }),
      removeFromWatchlist: (currency) => set(state => ({
        watchlist: state.watchlist.filter(c => c !== currency),
      })),

      // Portfolio
      portfolio: [],
      addToPortfolio: (currency, amount, avgPrice) => set(state => {
        const exists = state.portfolio.find(p => p.currency === currency);
        if (exists) return state;
        return { portfolio: [...state.portfolio, { currency, amount, avgPrice }] };
      }),
      updatePortfolio: (currency, amount, avgPrice) => set(state => ({
        portfolio: state.portfolio.map(p =>
          p.currency === currency ? { ...p, amount: p.amount + amount, avgPrice } : p
        ),
      })),
      removeFromPortfolio: (currency) => set(state => ({
        portfolio: state.portfolio.filter(p => p.currency !== currency),
      })),

      // Alerts
      alerts: [],
      addAlert: (from, to, targetRate) => set(state => ({
        alerts: [...state.alerts, {
          id: crypto.randomUUID(),
          from,
          to,
          targetRate,
          createdAt: Date.now(),
        }],
      })),
      removeAlert: (id) => set(state => ({
        alerts: state.alerts.filter(a => a.id !== id),
      })),

      // Active view
      activeView: 'convert',
      setActiveView: (view) => set({ activeView: view }),
    }),
    {
      name: 'currencyflow-storage',
    }
  )
);