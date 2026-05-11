import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './hooks/useStore';
import {
  currencyData,
  mockRates,
  generateHistoricalData,
  formatCurrency,
  formatNumber,
  getCurrencyList,
} from './utils/currencyData';
import { cn } from './utils/cn';
import {
  ArrowRightLeft,
  TrendingUp,
  TrendingDown,
  Star,
  StarOff,
  Settings,
  BarChart3,
  Wallet,
  Bell,
  Globe,
  Search,
  Moon,
  Sun,
  Copy,
  Check,
  RefreshCw,
  Plus,
  Minus,
  X,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  Bitcoin,
  Coins,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  Volume2,
  Globe2,
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

// ==================== COMPONENTS ====================

// Animated Background
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 fintech-bg" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-fintech-primary/10 rounded-full blur-3xl floating-card" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fintech-accent/10 rounded-full blur-3xl floating-card" style={{ animationDelay: '-3s' }} />
    </div>
  );
}

// Header Component
function Header() {
  const { isDarkMode, toggleTheme, activeView, setActiveView } = useStore();

  const navItems = [
    { id: 'convert', label: 'Convert', icon: ArrowRightLeft },
    { id: 'multi', label: 'Multi', icon: Coins },
    { id: 'charts', label: 'Charts', icon: LineChart },
    { id: 'portfolio', label: 'Portfolio', icon: Wallet },
    { id: 'alerts', label: 'Alerts', icon: Bell },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-dark-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-fintech-primary to-fintech-accent flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">CurrencyFlow</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Premium Exchange</p>
            </div>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  activeView === item.id
                    ? 'bg-fintech-primary/20 text-fintech-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

// Button Component
function Button({
  className,
  variant = 'default',
  size = 'default',
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}) {
  const baseStyles = 'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200';
  const variants = {
    default: 'bg-fintech-primary text-dark-900 hover:bg-fintech-primary/90',
    outline: 'border-2 border-fintech-primary/30 text-fintech-primary hover:bg-fintech-primary/10',
    ghost: 'hover:bg-white/10 text-muted-foreground hover:text-foreground',
    gradient: 'bg-gradient-to-r from-fintech-primary to-fintech-accent text-white',
  };
  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-8 px-3 text-xs',
    lg: 'h-12 px-8 text-base',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

// Input Component
function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'flex h-12 w-full rounded-xl border-2 border-white/10 bg-white/5 px-4 py-2 text-sm transition-all duration-200',
        'focus:border-fintech-primary focus:outline-none focus:ring-2 focus:ring-fintech-primary/20',
        'placeholder:text-muted-foreground',
        className
      )}
      {...props}
    />
  );
}

// Currency Selector Component
function CurrencySelector({
  value,
  onChange,
  label,
  flag,
}: {
  value: string;
  onChange: (currency: string) => void;
  label?: string;
  flag?: string;
}) {
  const currencyList = getCurrencyList();

  return (
    <div className="space-y-2">
      {label && <label className="text-sm text-muted-foreground">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-14 pl-4 pr-12 rounded-xl border-2 border-white/10 bg-white/5 appearance-none cursor-pointer focus:border-fintech-primary focus:outline-none focus:ring-2 focus:ring-fintech-primary/20"
        >
          {currencyList.map((c) => (
            <option key={c.code} value={c.code} className="bg-dark-800">
              {c.code} - {c.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
          <span className="text-2xl">{currencyData[value]?.flag || '🌐'}</span>
        </div>
      </div>
    </div>
  );
}

// Convert View
function ConvertView() {
  const {
    fromCurrency,
    toCurrency,
    amount,
    setFromCurrency,
    setToCurrency,
    setAmount,
    swapCurrencies,
    rates,
    favoritePairs,
    addFavorite,
    removeFavorite,
  } = useStore();

  const [copied, setCopied] = useState(false);

  const rate = useMemo(() => {
    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;
    return toRate / fromRate;
  }, [fromCurrency, toCurrency, rates]);

  const convertedAmount = amount * rate;

  const copyResult = () => {
    navigator.clipboard.writeText(convertedAmount.toFixed(2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isFavorite = favoritePairs.some(p => p.from === fromCurrency && p.to === toCurrency);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold gradient-text">Currency Converter</h2>
        <p className="text-muted-foreground mt-2">Convert between 40+ currencies instantly</p>
      </motion.div>

      {/* Main Converter Card */}
      <Card variant="glass" className="max-w-2xl mx-auto">
        <CardContent className="p-6 space-y-6">
          {/* Amount Input */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="text-3xl font-bold font-mono h-16"
              placeholder="0.00"
            />
          </div>

          {/* Currency Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <CurrencySelector
              value={fromCurrency}
              onChange={setFromCurrency}
              label="From"
            />

            <div className="flex justify-center">
              <Button
                variant="outline"
                size="icon"
                onClick={swapCurrencies}
                className="rounded-full w-12 h-12 border-fintech-primary/30 hover:bg-fintech-primary/20"
              >
                <ArrowRightLeft className="w-5 h-5 text-fintech-primary" />
              </Button>
            </div>

            <CurrencySelector
              value={toCurrency}
              onChange={setToCurrency}
              label="To"
            />
          </div>

          {/* Result */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-fintech-primary/20 to-fintech-accent/20 border border-fintech-primary/30">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                {amount} {fromCurrency} =
              </span>
              <button
                onClick={() => isFavorite ? removeFavorite(fromCurrency, toCurrency) : addFavorite(fromCurrency, toCurrency)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Star className={cn('w-5 h-5', isFavorite ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground')} />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold animate-number">
                {formatCurrency(convertedAmount, toCurrency)}
              </span>
              <Button variant="ghost" size="icon" onClick={copyResult}>
                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Rate Info */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-fintech-primary" />
              <span>1 {fromCurrency} = {rate.toFixed(4)} {toCurrency}</span>
            </div>
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Live Rate
            </span>
          </div>

          {/* Quick Convert Buttons */}
          <div className="flex gap-2 flex-wrap">
            {[100, 500, 1000, 5000].map((val) => (
              <Button
                key={val}
                variant="outline"
                size="sm"
                onClick={() => setAmount(val)}
                className="text-xs"
              >
                {val}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'USD/EUR', value: '0.9200', trend: 'up' },
          { label: 'USD/GBP', value: '0.7900', trend: 'up' },
          { label: 'USD/JPY', value: '149.50', trend: 'down' },
          { label: 'USD/INR', value: '83.12', trend: 'up' },
        ].map((stat) => (
          <Card key={stat.label} variant="glass" className="p-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-lg font-bold">{stat.value}</span>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Multi Currency View
function MultiView() {
  const {
    fromCurrency,
    amount,
    setFromCurrency,
    targetCurrencies,
    addTargetCurrency,
    removeTargetCurrency,
    rates,
  } = useStore();

  const currencyList = getCurrencyList();
  const availableCurrencies = currencyList.filter(c => !targetCurrencies.includes(c.code));

  const results = useMemo(() => {
    const fromRate = rates[fromCurrency] || 1;
    return targetCurrencies.map(currency => {
      const toRate = rates[currency] || 1;
      return {
        currency,
        amount: amount * (toRate / fromRate),
        rate: toRate / fromRate,
      };
    });
  }, [fromCurrency, amount, targetCurrencies, rates]);

  const total = results.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold gradient-text">Multi-Currency</h2>
        <p className="text-muted-foreground mt-2">Convert to multiple currencies at once</p>
      </motion.div>

      {/* Setup */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card variant="glass">
          <CardContent className="p-4">
            <label className="text-sm text-muted-foreground mb-2 block">Base Currency</label>
            <CurrencySelector value={fromCurrency} onChange={setFromCurrency} />
          </CardContent>
        </Card>

        <Card variant="glass">
          <CardContent className="p-4">
            <label className="text-sm text-muted-foreground mb-2 block">Amount</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => useStore.getState().setAmount(Number(e.target.value))}
              className="text-2xl font-bold font-mono"
            />
          </CardContent>
        </Card>
      </div>

      {/* Target Currencies */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Target Currencies ({targetCurrencies.length})</h3>
            <div className="relative group">
              <Button variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
              <div className="absolute right-0 top-full mt-2 w-64 p-2 rounded-xl bg-dark-800 border border-white/10 shadow-xl hidden group-hover:block z-10 max-h-64 overflow-y-auto">
                {availableCurrencies.map(c => (
                  <button
                    key={c.code}
                    onClick={() => addTargetCurrency(c.code)}
                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-white/10 text-left"
                  >
                    <span>{c.flag}</span>
                    <span className="font-medium">{c.code}</span>
                    <span className="text-xs text-muted-foreground truncate">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((result) => (
              <div
                key={result.currency}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currencyData[result.currency]?.flag}</span>
                  <div>
                    <p className="font-semibold">{result.currency}</p>
                    <p className="text-xs text-muted-foreground">
                      1 {fromCurrency} = {result.rate.toFixed(4)} {result.currency}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold font-mono">
                    {formatCurrency(result.amount, result.currency)}
                  </span>
                  <button
                    onClick={() => removeTargetCurrency(result.currency)}
                    className="p-2 hover:bg-red-500/20 text-muted-foreground hover:text-red-500 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Total Value</span>
              <span className="text-2xl font-bold">{formatCurrency(total, 'USD')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Charts View
function ChartsView() {
  const { fromCurrency, toCurrency, setFromCurrency, setToCurrency, rates } = useStore();
  const [period, setPeriod] = useState('30D');

  const historicalData = useMemo(() => {
    return generateHistoricalData(fromCurrency, toCurrency);
  }, [fromCurrency, toCurrency]);

  const rate = useMemo(() => {
    const fromRate = rates[fromCurrency] || 1;
    const toRate = rates[toCurrency] || 1;
    return toRate / fromRate;
  }, [fromCurrency, toCurrency, rates]);

  const change = useMemo(() => {
    if (historicalData.length < 2) return 0;
    const first = parseFloat(historicalData[0].rate);
    const last = parseFloat(historicalData[historicalData.length - 1].rate);
    return ((last - first) / first) * 100;
  }, [historicalData]);

  const periods = ['7D', '30D', '90D', '1Y'];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold gradient-text">Exchange Rate Charts</h2>
        <p className="text-muted-foreground mt-2">Track currency movements over time</p>
      </motion.div>

      {/* Currency Pair Selector */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card variant="glass">
          <CardContent className="p-4">
            <CurrencySelector value={fromCurrency} onChange={setFromCurrency} label="From" />
          </CardContent>
        </Card>
        <Card variant="glass">
          <CardContent className="p-4">
            <CurrencySelector value={toCurrency} onChange={setToCurrency} label="To" />
          </CardContent>
        </Card>
      </div>

      {/* Chart Card */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {currencyData[fromCurrency]?.flag} {fromCurrency}
                </span>
                <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
                <span className="text-3xl font-bold">
                  {currencyData[toCurrency]?.flag} {toCurrency}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-bold font-mono">{rate.toFixed(4)}</span>
                <span className={cn('flex items-center gap-1 text-sm', change >= 0 ? 'text-green-500' : 'text-red-500')}>
                  {change >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {Math.abs(change).toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="flex gap-1 bg-white/5 rounded-lg p-1">
              {periods.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={cn(
                    'px-3 py-1 rounded-md text-sm transition-colors',
                    period === p ? 'bg-fintech-primary text-dark-900' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00D4AA" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00D4AA" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis
                  dataKey="date"
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                />
                <YAxis
                  stroke="rgba(255,255,255,0.3)"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                  domain={['auto', 'auto']}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="rate"
                  stroke="#00D4AA"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRate)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
            {[
              { label: 'High', value: Math.max(...historicalData.map(d => parseFloat(d.high))).toFixed(4) },
              { label: 'Low', value: Math.min(...historicalData.map(d => parseFloat(d.low))).toFixed(4) },
              { label: 'Avg', value: (historicalData.reduce((sum, d) => sum + parseFloat(d.rate), 0) / historicalData.length).toFixed(4) },
              { label: 'Change', value: `${change >= 0 ? '+' : ''}${change.toFixed(2)}%`, color: change >= 0 ? 'text-green-500' : 'text-red-500' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className={cn('text-lg font-bold font-mono', stat.color)}>{stat.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Popular Pairs */}
      <Card variant="glass">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Popular Pairs</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { from: 'USD', to: 'EUR', rate: rates.EUR / rates.USD },
              { from: 'USD', to: 'GBP', rate: rates.GBP / rates.USD },
              { from: 'USD', to: 'JPY', rate: rates.JPY / rates.USD },
              { from: 'EUR', to: 'GBP', rate: rates.GBP / rates.EUR },
            ].map((pair) => (
              <button
                key={`${pair.from}${pair.to}`}
                onClick={() => { setFromCurrency(pair.from); setToCurrency(pair.to); }}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span>{currencyData[pair.from]?.flag}</span>
                  <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                  <span>{currencyData[pair.to]?.flag}</span>
                </div>
                <p className="font-semibold">{pair.from}/{pair.to}</p>
                <p className="text-sm font-mono text-muted-foreground">{pair.rate.toFixed(4)}</p>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Portfolio View
function PortfolioView() {
  const { portfolio, watchlist, addToWatchlist, removeFromWatchlist, rates } = useStore();

  const portfolioValue = useMemo(() => {
    return portfolio.reduce((sum, item) => {
      const rate = rates[item.currency] || 1;
      const usdRate = rates.USD || 1;
      return sum + (item.amount * rate / usdRate);
    }, 0);
  }, [portfolio, rates]);

  const watchlistData = useMemo(() => {
    return watchlist.map(currency => {
      const rate = rates[currency] || 1;
      const change = (Math.random() - 0.5) * 2;
      return { currency, rate, change };
    });
  }, [watchlist, rates]);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold gradient-text">Portfolio & Watchlist</h2>
        <p className="text-muted-foreground mt-2">Track your currency holdings and watchlist</p>
      </motion.div>

      {/* Portfolio Value */}
      <Card variant="glass" className="bg-gradient-to-r from-fintech-primary/20 to-fintech-accent/20">
        <CardContent className="p-6">
          <p className="text-sm text-muted-foreground mb-2">Total Portfolio Value</p>
          <p className="text-4xl font-bold">${portfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-green-500 flex items-center gap-1">
              <ArrowUpRight className="w-4 h-4" />
              +2.4%
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Watchlist */}
        <Card variant="glass">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500" />
              Watchlist
            </h3>

            {watchlistData.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No currencies in watchlist
              </p>
            ) : (
              <div className="space-y-3">
                {watchlistData.map((item) => (
                  <div
                    key={item.currency}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{currencyData[item.currency]?.flag}</span>
                      <div>
                        <p className="font-semibold">{item.currency}</p>
                        <p className="text-xs text-muted-foreground">
                          {currencyData[item.currency]?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold font-mono">
                        ${item.rate.toFixed(4)}
                      </p>
                      <p className={cn('text-sm flex items-center gap-1', item.change >= 0 ? 'text-green-500' : 'text-red-500')}>
                        {item.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {Math.abs(item.change).toFixed(2)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Market Overview */}
        <Card variant="glass">
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-5 h-5 text-fintech-primary" />
              Market Overview
            </h3>

            <div className="space-y-3">
              {['USD', 'EUR', 'GBP', 'JPY', 'BTC', 'ETH'].map((currency) => {
                const rate = rates[currency] || 1;
                const change = (Math.random() - 0.5) * 3;
                return (
                  <div
                    key={currency}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{currencyData[currency]?.flag}</span>
                      <span className="font-medium">{currency}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono">${rate.toFixed(2)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Crypto Section */}
      <Card variant="glass">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-500" />
            Crypto Currencies
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { code: 'BTC', name: 'Bitcoin', price: 67500, change: 2.5 },
              { code: 'ETH', name: 'Ethereum', price: 3450, change: 1.8 },
              { code: 'BNB', name: 'Binance Coin', price: 605, change: -0.5 },
              { code: 'SOL', name: 'Solana', price: 145, change: 3.2 },
            ].map((crypto) => (
              <div
                key={crypto.code}
                className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center">
                    <Bitcoin className="w-4 h-4 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-semibold">{crypto.code}</p>
                    <p className="text-xs text-muted-foreground">{crypto.name}</p>
                  </div>
                </div>
                <p className="text-lg font-bold font-mono">${crypto.price.toLocaleString()}</p>
                <p className={cn('text-sm', crypto.change >= 0 ? 'text-green-500' : 'text-red-500')}>
                  {crypto.change >= 0 ? '+' : ''}{crypto.change}%
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Alerts View
function AlertsView() {
  const { alerts, removeAlert, addAlert } = useStore();
  const [newAlert, setNewAlert] = useState({ from: 'USD', to: 'EUR', targetRate: 1.0 });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold gradient-text">Rate Alerts</h2>
        <p className="text-muted-foreground mt-2">Get notified when rates hit your target</p>
      </motion.div>

      {/* Create Alert */}
      <Card variant="glass">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Create New Alert</h3>
          <div className="grid md:grid-cols-4 gap-4 items-end">
            <CurrencySelector
              value={newAlert.from}
              onChange={(v) => setNewAlert({ ...newAlert, from: v })}
              label="From"
            />
            <CurrencySelector
              value={newAlert.to}
              onChange={(v) => setNewAlert({ ...newAlert, to: v })}
              label="To"
            />
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Target Rate</label>
              <Input
                type="number"
                step="0.0001"
                value={newAlert.targetRate}
                onChange={(e) => setNewAlert({ ...newAlert, targetRate: Number(e.target.value) })}
              />
            </div>
            <Button onClick={() => { addAlert(newAlert.from, newAlert.to, newAlert.targetRate); setNewAlert({ from: 'USD', to: 'EUR', targetRate: 1.0 }); }}>
              <Bell className="w-4 h-4 mr-2" />
              Create Alert
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Active Alerts */}
      <Card variant="glass">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Active Alerts ({alerts.length})</h3>

          {alerts.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No active alerts</p>
              <p className="text-sm text-muted-foreground">Create an alert to get notified when rates change</p>
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-fintech-primary/20 flex items-center justify-center">
                      <Bell className="w-5 h-5 text-fintech-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">
                        {currencyData[alert.from]?.flag} {alert.from} → {currencyData[alert.to]?.flag} {alert.to}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Target: {alert.targetRate.toFixed(4)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeAlert(alert.id)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Card Components
function Card({ className, variant = 'default', children, ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'glass' }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-dark-800/50 backdrop-blur-xl card-hover',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('', className)} {...props}>{children}</div>;
}

// ==================== MAIN APP ====================

function App() {
  const { isDarkMode, activeView } = useStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const renderView = () => {
    switch (activeView) {
      case 'convert':
        return <ConvertView />;
      case 'multi':
        return <MultiView />;
      case 'charts':
        return <ChartsView />;
      case 'portfolio':
        return <PortfolioView />;
      case 'alerts':
        return <AlertsView />;
      default:
        return <ConvertView />;
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <div className="relative z-10 min-h-screen">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;