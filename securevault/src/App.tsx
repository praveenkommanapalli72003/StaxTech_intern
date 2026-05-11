import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore, categories } from './hooks/useStore';
import {
  generatePassword,
  generatePassphrase,
  generatePIN,
  calculateStrength,
  checkBreach,
  calculateSecurityScore,
  wordList,
  type PasswordOptions,
} from './utils/passwordUtils';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from './components/ui/Card';
import { Input } from './components/ui/Input';
import { Slider } from './components/ui/Slider';
import { Checkbox } from './components/ui/Checkbox';
import { Progress } from './components/ui/Progress';
import {
  Shield,
  Key,
  Lock,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Star,
  Trash2,
  Plus,
  Search,
  Settings,
  BarChart3,
  LayoutGrid,
  Users,
  CreditCard,
  ShoppingCart,
  Gamepad2,
  Folder,
  Activity,
  Download,
  Upload,
  Moon,
  Sun,
  Sparkles,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  QrCode,
  Share2,
  Clock,
  Zap,
  Brain,
  Fingerprint,
  Cloud,
  Globe,
  ChevronRight,
  Menu,
  X,
  MoreHorizontal,
  Copy as CopyIcon,
  Save,
} from 'lucide-react';
import { cn } from './utils/cn';

// ==================== COMPONENTS ====================

// Animated Background
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 animated-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}

// Header Component
function Header() {
  const { isDarkMode, toggleTheme, activeView, setActiveView } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'generator', label: 'Generator', icon: Key },
    { id: 'vault', label: 'Vault', icon: Lock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 opacity-30 blur animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">SecureVault</h1>
              <p className="text-xs text-muted-foreground -mt-0.5">Premium Password Manager</p>
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
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-secondary/50 text-sm text-muted-foreground hover:border-primary/50 transition-colors">
              <Search className="w-4 h-4" />
              <span>Search...</span>
              <kbd className="hidden lg:inline-flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span className="text-xs">⌘</span>K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <nav className="p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={cn(
                    'flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    activeView === item.id
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-secondary/50'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Password Generator Component
function PasswordGenerator() {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
    customChars: '',
  });
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState(calculateStrength('', 0));
  const [activeTab, setActiveTab] = useState<'password' | 'passphrase' | 'pin'>('password');
  const [passphraseWords, setPassphraseWords] = useState(4);
  const [passphraseSeparator, setPassphraseSeparator] = useState('-');
  const [passphraseCapitalize, setPassphraseCapitalize] = useState(true);
  const [pinLength, setPinLength] = useState(6);
  const [pinNoRepeat, setPinNoRepeat] = useState(false);
  const [breachResult, setBreachResult] = useState<{ breached: boolean; count: number } | null>(null);
  const [checkingBreach, setCheckingBreach] = useState(false);

  const generate = () => {
    let password = '';
    if (activeTab === 'password') {
      password = generatePassword(options);
    } else if (activeTab === 'passphrase') {
      password = generatePassphrase(passphraseWords, passphraseCapitalize, passphraseSeparator);
    } else {
      password = generatePIN(pinLength, pinNoRepeat, true);
    }
    setGeneratedPassword(password);
    setStrength(calculateStrength(password, password.length));
    setBreachResult(null);
  };

  useEffect(() => {
    generate();
  }, []);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const checkPasswordBreach = async () => {
    setCheckingBreach(true);
    const result = await checkBreach(generatedPassword);
    setBreachResult(result);
    setCheckingBreach(false);
  };

  const tabs = [
    { id: 'password', label: 'Password', icon: Key },
    { id: 'passphrase', label: 'Passphrase', icon: Cloud },
    { id: 'pin', label: 'PIN', icon: Fingerprint },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
          Generate Secure Passwords
        </h2>
        <p className="text-muted-foreground mt-2">
          Create strong, unique passwords with advanced options
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex items-center p-1 bg-secondary/50 rounded-xl">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Options Panel */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Generation Options
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {activeTab === 'password' && (
              <>
                <Slider
                  label="Password Length"
                  value={options.length}
                  onChange={(v) => setOptions({ ...options, length: v })}
                  min={4}
                  max={64}
                />

                <div className="space-y-3">
                  <Checkbox
                    checked={options.uppercase}
                    onChange={(v) => setOptions({ ...options, uppercase: v })}
                    label="Uppercase Letters (A-Z)"
                  />
                  <Checkbox
                    checked={options.lowercase}
                    onChange={(v) => setOptions({ ...options, lowercase: v })}
                    label="Lowercase Letters (a-z)"
                  />
                  <Checkbox
                    checked={options.numbers}
                    onChange={(v) => setOptions({ ...options, numbers: v })}
                    label="Numbers (0-9)"
                  />
                  <Checkbox
                    checked={options.symbols}
                    onChange={(v) => setOptions({ ...options, symbols: v })}
                    label="Symbols (!@#$%^&*)"
                  />
                  <Checkbox
                    checked={options.excludeAmbiguous}
                    onChange={(v) => setOptions({ ...options, excludeAmbiguous: v })}
                    label="Exclude Ambiguous (0, O, l, 1)"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Custom Characters</label>
                  <Input
                    placeholder="Additional characters to include"
                    value={options.customChars}
                    onChange={(e) => setOptions({ ...options, customChars: e.target.value })}
                  />
                </div>
              </>
            )}

            {activeTab === 'passphrase' && (
              <>
                <Slider
                  label="Number of Words"
                  value={passphraseWords}
                  onChange={setPassphraseWords}
                  min={2}
                  max={10}
                />

                <div className="space-y-3">
                  <Checkbox
                    checked={passphraseCapitalize}
                    onChange={setPassphraseCapitalize}
                    label="Capitalize First Letter"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Separator</label>
                  <select
                    value={passphraseSeparator}
                    onChange={(e) => setPassphraseSeparator(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border-2 border-border bg-background"
                  >
                    <option value="-">Hyphen (-)</option>
                    <option value="_">Underscore (_)</option>
                    <option value=".">Dot (.)</option>
                    <option value=" ">Space</option>
                    <option value="">None</option>
                  </select>
                </div>
              </>
            )}

            {activeTab === 'pin' && (
              <>
                <Slider
                  label="PIN Length"
                  value={pinLength}
                  onChange={setPinLength}
                  min={4}
                  max={12}
                />

                <div className="space-y-3">
                  <Checkbox
                    checked={pinNoRepeat}
                    onChange={setPinNoRepeat}
                    label="No Repeated Digits"
                  />
                </div>
              </>
            )}

            <Button onClick={generate} className="w-full" size="lg">
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New
            </Button>
          </CardContent>
        </Card>

        {/* Result Panel */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Generated Password
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Display */}
            <div className="relative">
              <div className="p-4 rounded-xl bg-secondary/50 border-2 border-border/50 font-mono text-lg tracking-wider break-all min-h-[80px] flex items-center">
                {showPassword ? generatedPassword : '•'.repeat(Math.min(generatedPassword.length, 24))}
              </div>
              <div className="absolute right-2 top-2 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                  {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* Strength Meter */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Password Strength</span>
                <span
                  className="text-sm font-bold"
                  style={{ color: strength.color }}
                >
                  {strength.label}
                </span>
              </div>
              <Progress value={(strength.score / 7) * 100} />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Entropy: {strength.entropy} bits</span>
                <span>{generatedPassword.length} characters</span>
              </div>
            </div>

            {/* Breach Check */}
            <div className="space-y-3">
              {breachResult ? (
                <div className={cn(
                  'p-4 rounded-xl flex items-center gap-3',
                  breachResult.breached ? 'bg-red-500/10 border border-red-500/20' : 'bg-green-500/10 border border-green-500/20'
                )}>
                  {breachResult.breached ? (
                    <>
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium text-red-500">Password Found in Breaches!</p>
                        <p className="text-sm text-muted-foreground">
                          Found in {breachResult.count.toLocaleString()} data breaches
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-500">No Breaches Found</p>
                        <p className="text-sm text-muted-foreground">
                          This password hasn't been found in known breaches
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={checkPasswordBreach}
                  disabled={checkingBreach}
                  className="w-full"
                >
                  {checkingBreach ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-4 h-4 mr-2 border-2 border-primary border-t-transparent rounded-full"
                      />
                      Checking...
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Check for Breaches
                    </>
                  )}
                </Button>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="gradient" className="flex-1">
                  <Save className="w-4 h-4 mr-2" />
                  Save to Vault
                </Button>
                <Button variant="outline">
                  <QrCode className="w-4 h-4" />
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Dashboard Component
function Dashboard() {
  const { passwords, stats, activityLog, isDarkMode } = useStore();

  const securityScore = calculateSecurityScore(
    passwords.map(p => ({ password: p.password, createdAt: p.createdAt }))
  );

  const quickStats = [
    { label: 'Total Passwords', value: stats.totalPasswords || 0, icon: Key, color: 'from-violet-600 to-purple-600' },
    { label: 'Strong Passwords', value: stats.strongPasswords || 0, icon: Shield, color: 'from-emerald-500 to-green-500' },
    { label: 'Security Score', value: `${securityScore}%`, icon: TrendingUp, color: 'from-cyan-500 to-blue-500' },
    { label: 'This Week', value: activityLog.length, icon: Activity, color: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold">
          Welcome to <span className="gradient-text">SecureVault</span>
        </h2>
        <p className="text-muted-foreground mt-2">
          Your digital security command center
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card variant="glass" hover className="relative overflow-hidden">
              <div className={cn(
                'absolute inset-0 bg-gradient-to-br opacity-10',
                stat.color
              )} />
              <CardContent className="p-4 relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={cn(
                    'w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center',
                    stat.color
                  )}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Security Score */}
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Security Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="relative">
                <svg className="w-32 h-32" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-secondary"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${securityScore * 2.83} 283`}
                    transform="rotate(-90 50 50)"
                    initial={{ strokeDasharray: '0 283' }}
                    animate={{ strokeDasharray: `${securityScore * 2.83} 283` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold">{securityScore}</span>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">Strong encryption (AES-256)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-500" />
                  <span className="text-sm">Local-only storage</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-purple-500" />
                  <span className="text-sm">Zero-knowledge architecture</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="text-sm">Auto-lock enabled</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[300px] overflow-y-auto">
            {activityLog.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No recent activity
              </p>
            ) : (
              activityLog.slice(0, 5).map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Key className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{activity.details}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card variant="glass">
        <CardContent className="p-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Generate Password', icon: Key, action: 'generator' },
              { label: 'Add Password', icon: Plus, action: 'vault' },
              { label: 'Export Data', icon: Download, action: 'settings' },
              { label: 'Security Audit', icon: Shield, action: 'analytics' },
            ].map((action) => (
              <Button
                key={action.label}
                variant="outline"
                className="h-auto py-4 flex-col gap-2"
                onClick={() => useStore.getState().setActiveView(action.action)}
              >
                <action.icon className="w-6 h-6" />
                <span className="text-sm">{action.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Vault Component
function Vault() {
  const { passwords, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, toggleFavorite, deletePassword } = useStore();
  const [selectedPassword, setSelectedPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});

  const filteredPasswords = passwords.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.website?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const togglePasswordVisibility = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyPassword = (password: string) => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            icon={<Search className="w-5 h-5" />}
            placeholder="Search passwords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <Button
              key={cat.id}
              variant={selectedCategory === cat.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="whitespace-nowrap"
            >
              {cat.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Passwords Grid */}
      {filteredPasswords.length === 0 ? (
        <Card variant="glass" className="p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-secondary/50 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No passwords found</h3>
          <p className="text-muted-foreground mt-2">
            {searchQuery ? 'Try a different search term' : 'Generate your first password to get started'}
          </p>
          <Button className="mt-4">
            <Plus className="w-4 h-4 mr-2" />
            Add Password
          </Button>
        </Card>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPasswords.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card variant="glass" hover className="cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/20 to-purple-600/20 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{entry.name}</h4>
                        {entry.website && (
                          <p className="text-xs text-muted-foreground">{entry.website}</p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(entry.id)}
                      className="p-1 hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      <Star
                        className={cn(
                          'w-4 h-4',
                          entry.favorite ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground'
                        )}
                      />
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-secondary/50 font-mono text-sm mb-3 flex items-center gap-2">
                    <span className="flex-1 truncate">
                      {showPassword[entry.id] ? entry.password : '••••••••••••'}
                    </span>
                    <button
                      onClick={() => togglePasswordVisibility(entry.id)}
                      className="p-1 hover:bg-background rounded"
                    >
                      {showPassword[entry.id] ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => copyPassword(entry.password)}
                      className="p-1 hover:bg-background rounded"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => deletePassword(entry.id)}
                      className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Password FAB */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-purple-500/30 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

// Analytics Component
function Analytics() {
  const { passwords, stats } = useStore();

  const passwordLengths = passwords.map(p => p.password.length);
  const avgLength = passwordLengths.length
    ? Math.round(passwordLengths.reduce((a, b) => a + b, 0) / passwordLengths.length)
    : 0;

  const categoryData = categories.slice(1).map(cat => ({
    name: cat.name,
    value: passwords.filter(p => p.category === cat.id).length,
    color: cat.color,
  }));

  const strengthDistribution = [
    { name: 'Strong', value: stats.strongPasswords || 0, color: '#10b981' },
    { name: 'Weak', value: stats.weakPasswords || 0, color: '#ef4444' },
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-cyan-500 bg-clip-text text-transparent">
          Security Analytics
        </h2>
        <p className="text-muted-foreground mt-2">
          Monitor your password security health
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Password Health */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Password Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-sm text-muted-foreground">Strong</p>
                <p className="text-2xl font-bold text-emerald-500">{stats.strongPasswords || 0}</p>
              </div>
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20">
                <p className="text-sm text-muted-foreground">Weak</p>
                <p className="text-2xl font-bold text-red-500">{stats.weakPasswords || 0}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Average Length</span>
                <span className="font-semibold">{avgLength} characters</span>
              </div>
              <Progress value={(avgLength / 20) * 100} />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Reused Passwords</span>
                <span className="font-semibold text-amber-500">{stats.reusedPasswords || 0}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Using unique passwords for each account is recommended
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card variant="glass">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-primary" />
              Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryData.map((cat) => (
                <div key={cat.name} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{cat.name}</span>
                    <span className="font-semibold">{cat.value}</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${passwords.length ? (cat.value / passwords.length) * 100 : 0}%`,
                        backgroundColor: cat.color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Security Recommendations */}
        <Card variant="glass" className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-primary" />
              AI Security Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Use Passphrases',
                  description: 'Consider using word-based passphrases for critical accounts',
                  icon: Cloud,
                  color: 'from-cyan-500 to-blue-500',
                },
                {
                  title: 'Enable 2FA',
                  description: 'Add two-factor authentication where available',
                  icon: Shield,
                  color: 'from-violet-600 to-purple-600',
                },
                {
                  title: 'Regular Updates',
                  description: 'Rotate passwords for critical accounts every 90 days',
                  icon: RefreshCw,
                  color: 'from-emerald-500 to-green-500',
                },
              ].map((rec) => (
                <div
                  key={rec.title}
                  className="p-4 rounded-xl bg-secondary/50 border border-border/50 hover:border-primary/30 transition-colors"
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center mb-3',
                    rec.color
                  )}>
                    <rec.icon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-semibold mb-1">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function PieChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
      <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
  );
}

// Settings Component
function Settings() {
  const { isDarkMode, toggleTheme, autoLockTimeout, setAutoLockTimeout, clearHistory } = useStore();

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold">Settings</h2>
        <p className="text-muted-foreground mt-2">
          Customize your experience
        </p>
      </motion.div>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Toggle dark theme</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={cn(
                'w-12 h-6 rounded-full transition-colors relative',
                isDarkMode ? 'bg-primary' : 'bg-secondary'
              )}
            >
              <motion.div
                className="w-5 h-5 rounded-full bg-white shadow"
                animate={{ x: isDarkMode ? 24 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <label className="text-sm font-medium">Auto-lock Timeout</label>
            <select
              value={autoLockTimeout}
              onChange={(e) => setAutoLockTimeout(Number(e.target.value))}
              className="w-full h-10 px-3 rounded-lg border-2 border-border bg-background"
            >
              <option value={1}>1 minute</option>
              <option value={5}>5 minutes</option>
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
            </select>
            <p className="text-sm text-muted-foreground">
              Automatically lock vault after inactivity
            </p>
          </div>
        </CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full justify-start">
            <Download className="w-4 h-4 mr-3" />
            Export Passwords
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Upload className="w-4 h-4 mr-3" />
            Import Passwords
          </Button>
          <Button variant="destructive" className="w-full justify-start" onClick={clearHistory}>
            <Trash2 className="w-4 h-4 mr-3" />
            Clear Generation History
          </Button>
        </CardContent>
      </Card>

      <Card variant="glass">
        <CardHeader>
          <CardTitle>About</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            SecureVault v1.0.0
          </p>
          <p className="text-xs text-muted-foreground">
            A premium password manager built with React, TypeScript, and Tailwind CSS
          </p>
        </CardContent>
      </Card>
    </div>
  );
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
      case 'dashboard':
        return <Dashboard />;
      case 'generator':
        return <PasswordGenerator />;
      case 'vault':
        return <Vault />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={cn('min-h-screen transition-colors duration-300', isDarkMode ? 'dark' : '')}>
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