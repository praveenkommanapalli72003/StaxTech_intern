import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PasswordEntry {
  id: string;
  password: string;
  name: string;
  category: string;
  website?: string;
  username?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
  favorite: boolean;
}

export interface ActivityLog {
  id: string;
  action: string;
  details: string;
  timestamp: number;
}

interface AppState {
  // Theme
  isDarkMode: boolean;
  toggleTheme: () => void;

  // Vault
  passwords: PasswordEntry[];
  addPassword: (entry: Omit<PasswordEntry, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePassword: (id: string, updates: Partial<PasswordEntry>) => void;
  deletePassword: (id: string) => void;
  toggleFavorite: (id: string) => void;

  // Generated password history
  generatedHistory: { password: string; type: string; timestamp: number }[];
  addToHistory: (password: string, type: string) => void;
  clearHistory: () => void;

  // Settings
  autoLockTimeout: number;
  setAutoLockTimeout: (minutes: number) => void;

  // Activity log
  activityLog: ActivityLog[];
  addActivity: (action: string, details: string) => void;

  // UI State
  activeView: string;
  setActiveView: (view: string) => void;

  // Analytics
  stats: {
    totalPasswords: number;
    strongPasswords: number;
    weakPasswords: number;
    reusedPasswords: number;
  };
  updateStats: () => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Selected category
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      isDarkMode: true,
      toggleTheme: () => set(state => ({ isDarkMode: !state.isDarkMode })),

      // Vault
      passwords: [],
      addPassword: (entry) => set(state => {
        const newEntry: PasswordEntry = {
          ...entry,
          id: crypto.randomUUID(),
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        get().addActivity('Created', `New password: ${entry.name}`);
        get().updateStats();
        return { passwords: [newEntry, ...state.passwords] };
      }),
      updatePassword: (id, updates) => set(state => ({
        passwords: state.passwords.map(p =>
          p.id === id ? { ...p, ...updates, updatedAt: Date.now() } : p
        ),
      })),
      deletePassword: (id) => set(state => {
        const entry = state.passwords.find(p => p.id === id);
        if (entry) get().addActivity('Deleted', `Password: ${entry.name}`);
        get().updateStats();
        return { passwords: state.passwords.filter(p => p.id !== id) };
      }),
      toggleFavorite: (id) => set(state => ({
        passwords: state.passwords.map(p =>
          p.id === id ? { ...p, favorite: !p.favorite } : p
        ),
      })),

      // Generated History
      generatedHistory: [],
      addToHistory: (password, type) => set(state => ({
        generatedHistory: [
          { password, type, timestamp: Date.now() },
          ...state.generatedHistory.slice(0, 49),
        ],
      })),
      clearHistory: () => set({ generatedHistory: [] }),

      // Settings
      autoLockTimeout: 5,
      setAutoLockTimeout: (minutes) => set({ autoLockTimeout: minutes }),

      // Activity
      activityLog: [],
      addActivity: (action, details) => set(state => ({
        activityLog: [
          { id: crypto.randomUUID(), action, details, timestamp: Date.now() },
          ...state.activityLog.slice(0, 99),
        ],
      })),

      // UI
      activeView: 'dashboard',
      setActiveView: (view) => set({ activeView: view }),

      // Stats
      stats: {
        totalPasswords: 0,
        strongPasswords: 0,
        weakPasswords: 0,
        reusedPasswords: 0,
      },
      updateStats: () => {
        const passwords = get().passwords;
        const strengths = passwords.map(p => {
          const hasUpper = /[A-Z]/.test(p.password);
          const hasLower = /[a-z]/.test(p.password);
          const hasNumber = /[0-9]/.test(p.password);
          const hasSymbol = /[^A-Za-z0-9]/.test(p.password);
          const length = p.password.length;
          return (hasUpper && hasLower && hasNumber && hasSymbol && length >= 12) ? 'strong' : 'weak';
        });

        const uniquePasswords = new Set(passwords.map(p => p.password));

        set({
          stats: {
            totalPasswords: passwords.length,
            strongPasswords: strengths.filter(s => s === 'strong').length,
            weakPasswords: strengths.filter(s => s === 'weak').length,
            reusedPasswords: passwords.length - uniquePasswords.size,
          },
        });
      },

      // Search
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // Category
      selectedCategory: 'all',
      setSelectedCategory: (category) => set({ selectedCategory: category }),
    }),
    {
      name: 'securevault-storage',
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        passwords: state.passwords,
        generatedHistory: state.generatedHistory,
        activityLog: state.activityLog,
        autoLockTimeout: state.autoLockTimeout,
      }),
    }
  )
);

// Categories
export const categories = [
  { id: 'all', name: 'All Passwords', icon: 'LayoutGrid', color: '#8b5cf6' },
  { id: 'social', name: 'Social', icon: 'Users', color: '#ec4899' },
  { id: 'work', name: 'Work', icon: 'Briefcase', color: '#06b6d4' },
  { id: 'finance', name: 'Finance', icon: 'CreditCard', color: '#10b981' },
  { id: 'shopping', name: 'Shopping', icon: 'ShoppingCart', color: '#f59e0b' },
  { id: 'entertainment', name: 'Entertainment', icon: 'Gamepad2', color: '#6366f1' },
  { id: 'other', name: 'Other', icon: 'Folder', color: '#64748b' },
];