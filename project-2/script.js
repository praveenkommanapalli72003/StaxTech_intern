// Currency data with country codes and names
const countryList = {
  "USD": { country: "US", name: "US Dollar" },
  "EUR": { country: "EU", name: "Euro" },
  "GBP": { country: "GB", name: "British Pound" },
  "JPY": { country: "JP", name: "Japanese Yen" },
  "AUD": { country: "AU", name: "Australian Dollar" },
  "CAD": { country: "CA", name: "Canadian Dollar" },
  "INR": { country: "IN", name: "Indian Rupee" },
  "CNY": { country: "CN", name: "Chinese Yuan" },
  "BRL": { country: "BR", name: "Brazilian Real" },
  "RUB": { country: "RU", name: "Russian Ruble" },
  "KRW": { country: "KR", name: "South Korean Won" },
  "SGD": { country: "SG", name: "Singapore Dollar" },
  "HKD": { country: "HK", name: "Hong Kong Dollar" },
  "MXN": { country: "MX", name: "Mexican Peso" },
  "NZD": { country: "NZ", name: "New Zealand Dollar" },
  "SEK": { country: "SE", name: "Swedish Krona" },
  "NOK": { country: "NO", name: "Norwegian Krone" },
  "DKK": { country: "DK", name: "Danish Krone" },
  "CHF": { country: "CH", name: "Swiss Franc" },
  "AED": { country: "AE", name: "UAE Dirham" },
  "SAR": { country: "SA", name: "Saudi Riyal" },
  "THB": { country: "TH", name: "Thai Baht" },
  "PHP": { country: "PH", name: "Philippine Peso" },
  "IDR": { country: "ID", name: "Indonesian Rupiah" },
  "MYR": { country: "MY", name: "Malaysian Ringgit" },
  "ZAR": { country: "ZA", name: "South African Rand" },
  "TRY": { country: "TR", name: "Turkish Lira" },
  "PLN": { country: "PL", name: "Polish Zloty" },
  "CZK": { country: "CZ", name: "Czech Koruna" },
  "HUF": { country: "HU", name: "Hungarian Forint" },
  "ILS": { country: "IL", name: "Israeli Shekel" },
  "EGP": { country: "EG", name: "Egyptian Pound" },
  "VND": { country: "VN", name: "Vietnamese Dong" },
  "PKR": { country: "PK", name: "Pakistani Rupee" },
  "BDT": { country: "BD", name: "Bangladeshi Taka" },
  "NGN": { country: "NG", name: "Nigerian Naira" },
  "UAH": { country: "UA", name: "Ukrainian Hryvnia" },
  "CLP": { country: "CL", name: "Chilean Peso" },
  "COP": { country: "CO", name: "Colombian Peso" },
  "PEN": { country: "PE", name: "Peruvian Sol" },
  "ARS": { country: "AR", name: "Argentine Peso" },
  "TWD": { country: "TW", name: "Taiwan Dollar" },
  "AUD": { country: "AU", name: "Australian Dollar" }
};

// Currency symbol map
const currencySymbols = {
  "USD": "$",
  "EUR": "€",
  "GBP": "£",
  "JPY": "¥",
  "CNY": "¥",
  "INR": "₹",
  "AUD": "A$",
  "CAD": "C$",
  "CHF": "Fr",
  "KRW": "₩",
  "BRL": "R$",
  "RUB": "₽",
  "SGD": "S$",
  "HKD": "HK$",
  "MXN": "MX$",
  "NZD": "NZ$",
  "SEK": "kr",
  "NOK": "kr",
  "DKK": "kr",
  "AED": "د.إ",
  "SAR": "﷼",
  "THB": "฿",
  "PHP": "₱",
  "IDR": "Rp",
  "MYR": "RM",
  "ZAR": "R",
  "TRY": "₺",
  "PLN": "zł",
  "ILS": "₪",
  "EGP": "E£",
  "VND": "₫",
  "PKR": "₨",
  "BDT": "৳",
  "NGN": "₦",
  "UAH": "₴",
  "TWD": "NT$"
};

function getCurrencySymbol(code) {
  return currencySymbols[code] || code;
}

// State
let favorites = JSON.parse(localStorage.getItem('currencyFavorites')) || [];
let exchangeRates = {};
let lastFetch = null;
let targetCurrencies = ['EUR', 'GBP', 'JPY', 'INR'];
let isDarkMode = localStorage.getItem('currencyDarkMode') === 'true';
let currentPickerMode = 'multi';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  initSelects();
  loadRates('USD');
  renderFavorites();
  if (isDarkMode) document.body.classList.add('dark-mode');
  renderTargetCurrencies();
});

function initSelects() {
  const selects = ['fromCurrency', 'toCurrency', 'multiBaseCurrency'];
  selects.forEach(id => {
    const select = document.getElementById(id);
    Object.keys(countryList).forEach(code => {
      const opt = document.createElement('option');
      opt.value = code;
      opt.textContent = `${code} - ${countryList[code].name}`;
      if ((id === 'fromCurrency' && code === 'USD') ||
          (id === 'toCurrency' && code === 'INR') ||
          (id === 'multiBaseCurrency' && code === 'USD')) {
        opt.selected = true;
      }
      select.appendChild(opt);
    });
  });

  ['fromCurrency', 'toCurrency', 'multiBaseCurrency'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      updateFlag(id);
      if (id === 'fromCurrency' || id === 'toCurrency') convertCurrency();
      if (id === 'multiBaseCurrency') {
        updateFlag('multiBaseFlag', document.getElementById(id).value);
        convertMultiple();
      }
    });
  });
}

function updateFlag(selectId, value = null) {
  const select = document.getElementById(selectId);
  const code = value || select.value;
  const img = document.querySelector(`#${selectId}`).previousElementSibling ||
              document.querySelector(`#${selectId.replace('Currency', '')}Flag`) ||
              select.parentElement.querySelector('img');
  if (img && countryList[code]) {
    img.src = `https://flagcdn.com/48x36/${countryList[code].country.toLowerCase()}.png`;
  }
}

function toggleTheme() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('currencyDarkMode', isDarkMode);
}

function switchTab(tab) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById(tab + 'Tab').classList.add('active');
}

// API & Rates
async function loadRates(base = 'USD') {
  const url = `https://open.er-api.com/v6/latest/${base}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.result === 'success') {
      exchangeRates = data.rates;
      lastFetch = new Date();
      document.getElementById('apiStatus').innerHTML = '<i class="fas fa-circle" style="color:#00cc00"></i> Updated';
      convertCurrency();
    }
  } catch (err) {
    document.getElementById('apiStatus').innerHTML = '<i class="fas fa-circle" style="color:#ff4444"></i> Error';
    document.getElementById('exchangeRate').textContent = 'API Error';
  }
}

// Convert Single
function convertCurrency() {
  const amount = parseFloat(document.getElementById('amount').value) || 0;
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;

  if (!exchangeRates[from] || !exchangeRates[to]) {
    loadRates(from).then(() => convertCurrency());
    return;
  }

  const rate = exchangeRates[to] / exchangeRates[from];
  const result = (amount * rate).toFixed(2);
  const fromSymbol = getCurrencySymbol(from);
  const toSymbol = getCurrencySymbol(to);

  // Format result with Indian number system if INR
  let formattedResult = result;
  if (to === 'INR') {
    formattedResult = parseFloat(result).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  document.getElementById('exchangeRate').textContent = `1 ${from} (${fromSymbol}) = ${rate.toFixed(4)} ${to} (${toSymbol})`;
  document.getElementById('convertedResult').innerHTML = `<span class="currency-symbol">${toSymbol}</span>${formattedResult} <span class="currency-code-badge">${to}</span>`;
  document.getElementById('lastUpdated').textContent = lastFetch ? `Updated: ${lastFetch.toLocaleTimeString()}` : '';
}

function swapCurrencies() {
  const from = document.getElementById('fromCurrency');
  const to = document.getElementById('toCurrency');
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
  updateFlag('fromCurrency');
  updateFlag('toCurrency');
  convertCurrency();
}

// Multi Currency
function renderTargetCurrencies() {
  const container = document.getElementById('targetCurrencies');
  container.innerHTML = targetCurrencies.map(code => `
    <span class="currency-tag">
      ${code}
      <button onclick="removeTargetCurrency('${code}')">×</button>
    </span>
  `).join('');
}

function removeTargetCurrency(code) {
  targetCurrencies = targetCurrencies.filter(c => c !== code);
  renderTargetCurrencies();
}

function showCurrencyPicker(mode) {
  currentPickerMode = mode;
  const modal = document.getElementById('currencyPicker');
  modal.style.display = 'flex';
  filterCurrencies();
}

function closeCurrencyPicker() {
  document.getElementById('currencyPicker').style.display = 'none';
  document.getElementById('currencySearch').value = '';
}

function filterCurrencies() {
  const search = document.getElementById('currencySearch').value.toUpperCase();
  const list = document.getElementById('currencyList');
  list.innerHTML = Object.keys(countryList)
    .filter(code => code.includes(search) || countryList[code].name.toUpperCase().includes(search))
    .map(code => `
      <div class="currency-item" onclick="selectPickerCurrency('${code}')">
        <img src="https://flagcdn.com/32x24/${countryList[code].country.toLowerCase()}.png" />
        <span>${code}</span>
        <small>${countryList[code].name}</small>
      </div>
    `).join('');
}

function selectPickerCurrency(code) {
  if (currentPickerMode === 'multi' && !targetCurrencies.includes(code)) {
    targetCurrencies.push(code);
    renderTargetCurrencies();
  }
  closeCurrencyPicker();
}

function convertMultiple() {
  const amount = parseFloat(document.getElementById('multiAmount').value) || 0;
  const base = document.getElementById('multiBaseCurrency').value;
  const container = document.getElementById('multiResults');

  if (!exchangeRates[base]) {
    loadRates(base).then(() => convertMultiple());
    return;
  }

  container.innerHTML = targetCurrencies.map(code => {
    const rate = exchangeRates[code] / exchangeRates[base];
    const rawResult = (amount * rate).toFixed(2);
    const symbol = getCurrencySymbol(code);
    // Use Indian number format for INR
    const formattedResult = code === 'INR'
      ? parseFloat(rawResult).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : parseFloat(rawResult).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `
      <div class="multi-result-item">
        <div class="result-left">
          <img src="https://flagcdn.com/32x24/${countryList[code].country.toLowerCase()}.png" />
          <span class="currency-code">${code}</span>
          <span class="currency-name">${countryList[code].name}</span>
        </div>
        <span class="result-value">${symbol} ${formattedResult}</span>
      </div>
    `;
  }).join('');
}

// Favorites
function addToFavorites() {
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  const pair = { from, to, timestamp: Date.now() };

  const exists = favorites.some(f => f.from === from && f.to === to);
  if (!exists) {
    favorites.unshift(pair);
    if (favorites.length > 10) favorites.pop();
    localStorage.setItem('currencyFavorites', JSON.stringify(favorites));
    alert(`Saved ${from} → ${to}`);
  } else {
    alert('This pair is already saved!');
  }
}

function renderFavorites() {
  const container = document.getElementById('favoritesList');
  if (favorites.length === 0) {
    container.innerHTML = '<div class="empty-favorites">No saved currency pairs yet</div>';
    return;
  }

  container.innerHTML = favorites.map((f, i) => `
    <div class="favorite-item" onclick="loadFavoritePair(${i})">
      <div class="pair-info">
        <img src="https://flagcdn.com/32x24/${countryList[f.from]?.country.toLowerCase() || 'us'}.png" />
        <span>${f.from}</span>
        <i class="fas fa-arrow-right"></i>
        <img src="https://flagcdn.com/32x24/${countryList[f.to]?.country.toLowerCase() || 'us'}.png" />
        <span>${f.to}</span>
      </div>
      <button class="delete-fav" onclick="removeFavorite(event, ${i})">×</button>
    </div>
  `).join('');
}

function loadFavoritePair(index) {
  const f = favorites[index];
  document.getElementById('fromCurrency').value = f.from;
  document.getElementById('toCurrency').value = f.to;
  updateFlag('fromCurrency', f.from);
  updateFlag('toCurrency', f.to);
  switchTab(document.querySelector('.tab').click());
  convertCurrency();
}

function removeFavorite(e, index) {
  e.stopPropagation();
  favorites.splice(index, 1);
  localStorage.setItem('currencyFavorites', JSON.stringify(favorites));
  renderFavorites();
}

function clearFavorites() {
  if (confirm('Clear all favorites?')) {
    favorites = [];
    localStorage.removeItem('currencyFavorites');
    renderFavorites();
  }
}