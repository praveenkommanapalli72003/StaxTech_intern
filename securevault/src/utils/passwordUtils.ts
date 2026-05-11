// Secure random number generator using crypto API
export function getSecureRandom(max: number): number {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Character sets
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWER = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+[]{}|;:,.<>?';
const AMBIGUOUS = '0O1lI';

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  excludeAmbiguous: boolean;
  customChars?: string;
}

// Word list for passphrases
export const wordList = [
  'apple', 'banana', 'cherry', 'dragon', 'eagle', 'forest', 'galaxy', 'harbor',
  'island', 'jungle', 'knight', 'lemon', 'mountain', 'nebula', 'ocean', 'phoenix',
  'quantum', 'river', 'sunset', 'thunder', 'umbrella', 'velvet', 'winter', 'yellow',
  'zebra', 'anchor', 'breeze', 'castle', 'diamond', 'ember', 'falcon', 'glacier',
  'horizon', 'ivory', 'jasper', 'kingdom', 'lantern', 'marble', 'night', 'orbit',
  'pebble', 'quartz', 'rainbow', 'silver', 'tiger', 'unique', 'voyage', 'willow',
  'xenon', 'yacht', 'zephyr', 'armor', 'blaze', 'cloud', 'dawn', 'echo', 'flame',
  'garden', 'hawk', 'iceberg', 'joker', 'komodo', 'lunar', 'meadow', 'ninja', 'olive',
  'panda', 'quest', 'rocket', 'storm', 'trident', 'ultra', 'vortex', 'wolf', 'xray'
];

// Generate password based on options
export function generatePassword(options: PasswordOptions): string {
  const { length, uppercase, lowercase, numbers, symbols, excludeAmbiguous, customChars } = options;

  let chars = '';
  if (uppercase) chars += excludeAmbiguous ? UPPER.replace(/[OI]/g, '') : UPPER;
  if (lowercase) chars += excludeAmbiguous ? LOWER.replace(/[lo]/g, '') : LOWER;
  if (numbers) chars += excludeAmbiguous ? NUMBERS.replace(/[01]/g, '') : NUMBERS;
  if (symbols) chars += SYMBOLS;
  if (customChars) chars += customChars;

  if (chars.length === 0) return '';

  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[getSecureRandom(chars.length)];
  }

  // Ensure at least one character from each selected type
  password = ensureCharTypes(password, options, chars);

  return password;
}

// Ensure required character types are present
function ensureCharTypes(password: string, options: PasswordOptions, allChars: string): string {
  const chars = password.split('');
  const required: string[] = [];

  if (options.uppercase) required.push(UPPER);
  if (options.lowercase) required.push(LOWER);
  if (options.numbers) required.push(NUMBERS);
  if (options.symbols) required.push(SYMBOLS);

  for (let i = 0; i < required.length; i++) {
    if (!chars.some(c => required[i].includes(c))) {
      const pos = getSecureRandom(chars.length);
      chars[pos] = required[i][getSecureRandom(required[i].length)];
    }
  }

  return chars.join('');
}

// Generate passphrase
export function generatePassphrase(wordCount: number, capitalize: boolean, separator: string): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    let word = wordList[getSecureRandom(wordList.length)];
    if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1);
    words.push(word);
  }
  return words.join(separator);
}

// Generate PIN
export function generatePIN(length: number, noRepeat: boolean, noSequential: boolean): string {
  let pin = '';
  let attempts = 0;
  const maxAttempts = 100;

  do {
    pin = '';
    const digits = '0123456789'.split('');

    for (let i = 0; i < length; i++) {
      const idx = getSecureRandom(digits.length);
      pin += digits[idx];
      if (noRepeat) digits.splice(idx, 1);
    }
    attempts++;
  } while (noSequential && isSequential(pin) && attempts < maxAttempts);

  return pin;
}

function isSequential(pin: string): boolean {
  const ascending = '0123456789';
  const descending = '9876543210';
  for (let i = 0; i < pin.length - 2; i++) {
    if (ascending.includes(pin.slice(i, i + 3)) || descending.includes(pin.slice(i, i + 3))) {
      return true;
    }
  }
  return false;
}

// Calculate password strength and entropy
export interface StrengthResult {
  score: number;
  label: string;
  color: string;
  entropy: number;
  suggestions: string[];
}

export function calculateStrength(password: string, length: number): StrengthResult {
  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;

  const entropy = Math.floor(Math.log2(Math.pow(charsetSize || 1, password.length)));

  let score = 0;
  const suggestions: string[] = [];

  if (password.length >= 8) score += 1;
  else suggestions.push('Use at least 8 characters');

  if (password.length >= 12) score += 1;
  if (password.length >= 16) score += 1;

  if (/[A-Z]/.test(password)) score += 1;
  else suggestions.push('Add uppercase letters');

  if (/[a-z]/.test(password)) score += 1;
  else suggestions.push('Add lowercase letters');

  if (/[0-9]/.test(password)) score += 1;
  else suggestions.push('Add numbers');

  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  else suggestions.push('Add special characters');

  // Check for common patterns
  if (/^[a-z]+$/i.test(password)) {
    score = Math.max(0, score - 2);
    suggestions.push('Avoid using only letters');
  }

  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1);
    suggestions.push('Avoid repeated characters');
  }

  let label: string;
  let color: string;

  if (score <= 2) {
    label = 'Weak';
    color = '#ef4444';
  } else if (score <= 4) {
    label = 'Fair';
    color = '#f59e0b';
  } else if (score <= 6) {
    label = 'Good';
    color = '#10b981';
  } else {
    label = 'Strong';
    color = '#8b5cf6';
  }

  return { score, label, color, entropy, suggestions };
}

// Mock breach detection
export async function checkBreach(password: string): Promise<{ breached: boolean; count: number }> {
  // Simulated API call - in production, use HaveIBeenPwned API
  await new Promise(resolve => setTimeout(resolve, 500));

  // Simple mock - check for common weak passwords
  const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein'];
  const isCommon = commonPasswords.some(p => password.toLowerCase().includes(p));

  return {
    breached: isCommon,
    count: isCommon ? Math.floor(Math.random() * 1000) + 100 : 0
  };
}

// Generate security score
export function calculateSecurityScore(passwords: { password: string; createdAt: number }[]): number {
  if (passwords.length === 0) return 0;

  let score = 50; // Base score

  // Length variety
  const lengths = passwords.map(p => p.password.length);
  const avgLength = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  if (avgLength >= 16) score += 20;
  else if (avgLength >= 12) score += 15;
  else if (avgLength >= 8) score += 10;

  // Character variety
  const variety = passwords.filter(p =>
    /[A-Z]/.test(p.password) &&
    /[a-z]/.test(p.password) &&
    /[0-9]/.test(p.password) &&
    /[^A-Za-z0-9]/.test(p.password)
  ).length;
  score += (variety / passwords.length) * 20;

  // Recency bonus
  const now = Date.now();
  const recentPasswords = passwords.filter(p => now - p.createdAt < 30 * 24 * 60 * 60 * 1000);
  score += Math.min(10, recentPasswords.length * 2);

  return Math.min(100, score);
}

// Generate random avatar
export function generateAvatar(seed: string): string {
  const colors = ['8b5cf6', '06b6d4', '10b981', 'f59e0b', 'ec4899', '6366f1'];
  const color = colors[seed.charCodeAt(0) % colors.length];
  return `https://api.dicebear.com/7.x/identicon/svg?seed=${seed}&backgroundColor=${color}`;
}

// Format time ago
export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return new Date(timestamp).toLocaleDateString();
}