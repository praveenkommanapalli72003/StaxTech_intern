// Currency data with country codes and names
export const currencyData: Record<string, { country: string; name: string; symbol: string; flag: string }> = {
  USD: { country: 'US', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { country: 'EU', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { country: 'GB', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  JPY: { country: 'JP', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  AUD: { country: 'AU', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { country: 'CA', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  INR: { country: 'IN', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  CNY: { country: 'CN', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
  BRL: { country: 'BR', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  RUB: { country: 'RU', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  KRW: { country: 'KR', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  SGD: { country: 'SG', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  HKD: { country: 'HK', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  MXN: { country: 'MX', name: 'Mexican Peso', symbol: 'MX$', flag: '🇲🇽' },
  NZD: { country: 'NZ', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  SEK: { country: 'SE', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  NOK: { country: 'NO', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  DKK: { country: 'DK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  CHF: { country: 'CH', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  AED: { country: 'AE', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  SAR: { country: 'SA', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  THB: { country: 'TH', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  PHP: { country: 'PH', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  IDR: { country: 'ID', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  MYR: { country: 'MY', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  ZAR: { country: 'ZA', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  TRY: { country: 'TR', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  PLN: { country: 'PL', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  CZK: { country: 'CZ', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  HUF: { country: 'HU', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  ILS: { country: 'IL', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  VND: { country: 'VN', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  PKR: { country: 'PK', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  BDT: { country: 'BD', name: 'Bangladeshi Taka', symbol: '৳', flag: '🇧🇩' },
  NGN: { country: 'NG', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  CLP: { country: 'CL', name: 'Chilean Peso', symbol: '$', flag: '🇨🇱' },
  COP: { country: 'CO', name: 'Colombian Peso', symbol: '$', flag: '🇨🇴' },
  PEN: { country: 'PE', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  TWD: { country: 'TW', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  BTC: { country: 'CR', name: 'Bitcoin', symbol: '₿', flag: '₿' },
  ETH: { country: 'ET', name: 'Ethereum', symbol: 'Ξ', flag: 'Ξ' },
};

// Mock exchange rates (in real app, fetch from API)
export const mockRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  AUD: 1.53,
  CAD: 1.36,
  INR: 83.12,
  CNY: 7.24,
  BRL: 4.97,
  RUB: 91.50,
  KRW: 1328.45,
  SGD: 1.34,
  HKD: 7.82,
  MXN: 17.15,
  NZD: 1.64,
  SEK: 10.42,
  NOK: 10.58,
  DKK: 6.87,
  CHF: 0.88,
  AED: 3.67,
  SAR: 3.75,
  THB: 35.68,
  PHP: 55.89,
  IDR: 15645,
  MYR: 4.72,
  ZAR: 18.92,
  TRY: 32.15,
  PLN: 4.02,
  CZK: 22.85,
  HUF: 356.12,
  ILS: 3.72,
  VND: 24385,
  PKR: 278.45,
  BDT: 109.75,
  NGN: 775.50,
  CLP: 878.45,
  COP: 3985.25,
  PEN: 3.72,
  TWD: 31.45,
  BTC: 0.000015,
  ETH: 0.00032,
};

// Historical data for charts (mock)
export const generateHistoricalData = (baseCurrency: string, targetCurrency: string) => {
  const baseRate = mockRates[baseCurrency] || 1;
  const targetRate = mockRates[targetCurrency] || 1;
  const ratio = targetRate / baseRate;

  const data = [];
  const now = new Date();
  for (let i = 30; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * 0.1 * ratio;
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      rate: (ratio + variation).toFixed(4),
      high: (ratio + variation + Math.random() * 0.02).toFixed(4),
      low: (ratio + variation - Math.random() * 0.02).toFixed(4),
    });
  }
  return data;
};

// Format currency
export function formatCurrency(amount: number, currency: string): string {
  const data = currencyData[currency];
  if (!data) return amount.toFixed(2);

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format large numbers
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
}

// Get currency list
export function getCurrencyList() {
  return Object.entries(currencyData).map(([code, data]) => ({
    code,
    ...data,
  }));
}