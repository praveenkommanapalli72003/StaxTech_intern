// Word list for passphrases
const wordList = [
  "apple", "banana", "cherry", "dragon", "eagle", "forest", "galaxy", "harbor",
  "island", "jungle", "knight", "lemon", "mountain", "nebula", "ocean", "phoenix",
  "quantum", "river", "sunset", "thunder", "umbrella", "velvet", "winter", "yellow",
  "zebra", "anchor", "breeze", "castle", "diamond", "ember", "falcon", "glacier",
  "horizon", "ivory", "jasper", "kingdom", "lantern", "marble", "night", "orbit",
  "pebble", "quartz", "rainbow", "silver", "tiger", "unique", "voyage", "willow",
  "xenon", "yacht", "zephyr", "armor", "blaze", "cloud", "dawn", "echo", "flame",
  "garden", "hawk", "iceberg", "joker", "komodo", "lunar", "meadow", "ninja", "olive",
  "panda", "quest", "rocket", "storm", "trident", "ultra", "vortex", "wolf", "xray",
  "yogurt", "zenith", "basil", "coral", "delta", "enigma", "frost", "giant", "honey",
  "index", "jelly", "karma", "lotus", "magic", "nectar", "omega", "prism", "radar"
];

// State
let savedPasswords = JSON.parse(localStorage.getItem('passwordHistory')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) document.body.classList.add('dark-mode');

// Initialize
renderHistory();
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.ctrlKey) generatePassword();
});

// Theme toggle
function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Tab switching
function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tab + 'Tab').classList.add('active');
}

// Presets
function applyPreset(preset) {
  const presets = {
    weak: { length: 8, upper: false, lower: true, numbers: true, symbols: false, exclude: false },
    medium: { length: 12, upper: true, lower: true, numbers: true, symbols: false, exclude: false },
    strong: { length: 16, upper: true, lower: true, numbers: true, symbols: true, exclude: false },
    maximum: { length: 32, upper: true, lower: true, numbers: true, symbols: true, exclude: true }
  };
  const p = presets[preset];
  document.getElementById('length').value = p.length;
  document.getElementById('lengthValue').textContent = p.length;
  document.getElementById('uppercase').checked = p.upper;
  document.getElementById('lowercase').checked = p.lower;
  document.getElementById('numbers').checked = p.numbers;
  document.getElementById('symbols').checked = p.symbols;
  document.getElementById('excludeAmbiguous').checked = p.exclude;
}

// Secure random
function getSecureRandom(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

// Generate Password
function generatePassword() {
  const length = parseInt(document.getElementById('length').value);
  const hasUpper = document.getElementById('uppercase').checked;
  const hasLower = document.getElementById('lowercase').checked;
  const hasNumber = document.getElementById('numbers').checked;
  const hasSymbol = document.getElementById('symbols').checked;
  const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;
  const customChars = document.getElementById('customChars').value;

  const upper = excludeAmbiguous ? "ABCDEFGHJKLMNPQRSTUVWXYZ" : "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = excludeAmbiguous ? "abcdefghjkmnpqrstuvwxyz" : "abcdefghijklmnopqrstuvwxyz";
  const numbers = excludeAmbiguous ? "23456789" : "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";

  let allChars = "";
  if (hasUpper) allChars += upper;
  if (hasLower) allChars += lower;
  if (hasNumber) allChars += numbers;
  if (hasSymbol) allChars += symbols;
  if (customChars) allChars += customChars;

  if (allChars === "") {
    alert("Please select at least one character type!");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += allChars[getSecureRandom(allChars.length)];
  }

  // Ensure required character types
  password = ensureCharTypes(password, { hasUpper, hasLower, hasNumber, hasSymbol, customChars: !!customChars }, allChars);

  document.getElementById('password').value = password;
  calculateStrength(password);
}

// Ensure character types
function ensureCharTypes(password, options, allChars) {
  let chars = password.split('');
  const required = [];

  if (options.hasUpper) required.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  if (options.hasLower) required.push("abcdefghijklmnopqrstuvwxyz");
  if (options.hasNumber) required.push("0123456789");
  if (options.customChars) required.push(document.getElementById('customChars').value);

  for (let i = 0; i < required.length; i++) {
    if (!chars.some(c => required[i].includes(c))) {
      const pos = getSecureRandom(chars.length);
      chars[pos] = required[i][getSecureRandom(required[i].length)];
    }
  }
  return chars.join('');
}

// Calculate strength and entropy
function calculateStrength(password) {
  const length = password.length;
  let charsetSize = 0;

  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^A-Za-z0-9]/.test(password)) charsetSize += 32;

  const entropy = Math.floor(Math.log2(Math.pow(charsetSize, length)));
  let strength = 0;

  if (length >= 8) strength++;
  if (length >= 12) strength++;
  if (length >= 16) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  const fill = document.getElementById('strengthFill');
  const text = document.getElementById('strengthText');
  const entropyText = document.getElementById('entropyText');

  entropyText.textContent = `Entropy: ${entropy} bits`;

  if (strength <= 2) {
    fill.style.width = "33%";
    fill.style.backgroundColor = "#ff4444";
    text.textContent = "Weak";
  } else if (strength <= 4) {
    fill.style.width = "66%";
    fill.style.backgroundColor = "#ffaa00";
    text.textContent = "Medium";
  } else if (strength <= 6) {
    fill.style.width = "85%";
    fill.style.backgroundColor = "#00cc66";
    text.textContent = "Strong";
  } else {
    fill.style.width = "100%";
    fill.style.backgroundColor = "#00ff00";
    text.textContent = "Maximum";
  }
}

// Toggle password visibility
function togglePasswordVisibility() {
  const input = document.getElementById('password');
  input.type = input.type === 'password' ? 'text' : 'password';
}

// Copy password
function copyPassword() {
  const password = document.getElementById('password').value;
  if (!password) { alert("Generate a password first!"); return; }
  navigator.clipboard.writeText(password).then(() => alert("Password copied!"));
}

// Save password
function savePassword() {
  const password = document.getElementById('password').value;
  if (!password) { alert("Generate a password first!"); return; }

  savedPasswords.unshift({ password, timestamp: new Date().toLocaleString(), type: 'password' });
  if (savedPasswords.length > 50) savedPasswords.pop();
  localStorage.setItem('passwordHistory', JSON.stringify(savedPasswords));
  renderHistory();
  alert("Password saved!");
}

// ==================== PASSPHRASE ====================
function generatePassphrase() {
  const wordCount = parseInt(document.getElementById('wordCount').value);
  const capitalize = document.getElementById('capitalizeWords').checked;
  const includeNumber = document.getElementById('includeNumber').checked;
  const includeSymbol = document.getElementById('includeSymbol').checked;
  const separator = document.getElementById('separator').value;

  let words = [];
  for (let i = 0; i < wordCount; i++) {
    let word = wordList[getSecureRandom(wordList.length)];
    if (capitalize) word = word.charAt(0).toUpperCase() + word.slice(1);
    words.push(word);
  }

  if (includeNumber) {
    words.push(getSecureRandom(100).toString());
  }
  if (includeSymbol) {
    const syms = "!@#$%&*";
    words.push(syms[getSecureRandom(syms.length)]);
  }

  const passphrase = words.join(separator);
  document.getElementById('passphrase').value = passphrase;
  document.getElementById('passphrase').dataset.strength = words.length < 4 ? 'weak' : words.length < 6 ? 'medium' : 'strong';
}

function togglePhraseVisibility() {
  const input = document.getElementById('passphrase');
  input.type = input.type === 'password' ? 'text' : 'password';
}

function copyPassphrase() {
  const p = document.getElementById('passphrase').value;
  if (!p) { alert("Generate a passphrase first!"); return; }
  navigator.clipboard.writeText(p).then(() => alert("Passphrase copied!"));
}

// ==================== PIN ====================
function generatePIN() {
  const length = parseInt(document.getElementById('pinLength').value);
  const noRepeat = document.getElementById('pinNoRepeat').checked;
  const noSequential = document.getElementById('pinNoSequential').checked;

  let pin = "";
  let attempts = 0;
  const maxAttempts = 100;

  do {
    pin = "";
    const digits = [];
    for (let i = 0; i < 10; i++) digits.push(i.toString());

    for (let i = 0; i < length; i++) {
      const idx = getSecureRandom(digits.length);
      pin += digits[idx];
      if (noRepeat) digits.splice(idx, 1);
    }
    attempts++;
  } while (noSequential && isSequential(pin) && attempts < maxAttempts);

  if (attempts >= maxAttempts) {
    alert("Could not generate PIN with these constraints. Try relaxing them.");
    return;
  }

  document.getElementById('pin').value = pin;
}

function isSequential(pin) {
  const ascending = "0123456789";
  const descending = "9876543210";
  for (let i = 0; i < pin.length - 2; i++) {
    if (ascending.includes(pin.slice(i, i + 3)) || descending.includes(pin.slice(i, i + 3))) {
      return true;
    }
  }
  return false;
}

function copyPIN() {
  const pin = document.getElementById('pin').value;
  if (!pin) { alert("Generate a PIN first!"); return; }
  navigator.clipboard.writeText(pin).then(() => alert("PIN copied!"));
}

// ==================== BULK ====================
function generateBulk() {
  const count = parseInt(document.getElementById('bulkCount').value);
  const length = parseInt(document.getElementById('bulkLength').value);

  const hasUpper = true, hasLower = true, hasNumber = true, hasSymbol = true;
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+[]{}|;:,.<>?";
  const allChars = upper + lower + numbers + symbols;

  let passwords = [];
  for (let i = 0; i < count; i++) {
    let p = "";
    for (let j = 0; j < length; j++) {
      p += allChars[getSecureRandom(allChars.length)];
    }
    passwords.push(p);
  }

  document.getElementById('bulkOutput').value = passwords.join('\n');
}

function copyBulk() {
  const output = document.getElementById('bulkOutput').value;
  if (!output) { alert("Generate passwords first!"); return; }
  navigator.clipboard.writeText(output).then(() => alert("All passwords copied!"));
}

// ==================== HISTORY ====================
function renderHistory() {
  const list = document.getElementById('passwordHistory');
  if (savedPasswords.length === 0) {
    list.innerHTML = "<li class='empty'>No saved passwords</li>";
    return;
  }
  list.innerHTML = savedPasswords.map((entry, i) => `
    <li>
      <span class="pwd">${entry.password}</span>
      <small>${entry.timestamp}</small>
      <button onclick="copySaved(${i})" title="Copy">📋</button>
      <button onclick="deletePassword(${i})" title="Delete">×</button>
    </li>
  `).join('');
}

function copySaved(index) {
  navigator.clipboard.writeText(savedPasswords[index].password).then(() => alert("Copied!"));
}

function deletePassword(index) {
  savedPasswords.splice(index, 1);
  localStorage.setItem('passwordHistory', JSON.stringify(savedPasswords));
  renderHistory();
}

function clearHistory() {
  if (confirm("Clear all saved passwords?")) {
    savedPasswords = [];
    localStorage.removeItem('passwordHistory');
    renderHistory();
  }
}

// Export/Import
function exportPasswords() {
  const data = JSON.stringify(savedPasswords, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'passwords-backup.json';
  a.click();
  URL.revokeObjectURL(url);
}

function importPasswords() {
  document.getElementById('importFile').click();
}

function handleImport(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const imported = JSON.parse(e.target.result);
      if (Array.isArray(imported)) {
        savedPasswords = [...imported, ...savedPasswords].slice(0, 50);
        localStorage.setItem('passwordHistory', JSON.stringify(savedPasswords));
        renderHistory();
        alert(`Imported ${imported.length} passwords!`);
      }
    } catch (err) {
      alert("Invalid file format!");
    }
  };
  reader.readAsText(file);
  event.target.value = '';
}