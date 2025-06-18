export const stockData = [
  // Technology
  { symbol: 'AAPL', name: 'Apple Inc.', price: 173.50, change: '+2.5%' },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 415.30, change: '+1.8%' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 147.60, change: '+1.5%' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.90, change: '+0.9%' },
  { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.30, change: '+4.1%' },
  { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.90, change: '+3.2%' },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.20, change: '-1.2%' },
  { symbol: 'AMD', name: 'Advanced Micro Devices', price: 178.40, change: '-0.8%' },
  { symbol: 'INTC', name: 'Intel Corporation', price: 43.75, change: '+1.2%' },
  { symbol: 'CRM', name: 'Salesforce Inc.', price: 298.50, change: '+2.1%' },
  { symbol: 'ADBE', name: 'Adobe Inc.', price: 572.80, change: '+1.7%' },
  { symbol: 'CSCO', name: 'Cisco Systems Inc.', price: 49.85, change: '-0.3%' },
  { symbol: 'ORCL', name: 'Oracle Corporation', price: 125.90, change: '+0.8%' },
  { symbol: 'IBM', name: 'IBM Corporation', price: 188.25, change: '+1.1%' },
  { symbol: 'QCOM', name: 'Qualcomm Inc.', price: 167.40, change: '-0.5%' },

  // Communication Services
  { symbol: 'NFLX', name: 'Netflix Inc.', price: 605.70, change: '+2.3%' },
  { symbol: 'DIS', name: 'Walt Disney Co.', price: 111.20, change: '-0.5%' },
  { symbol: 'CMCSA', name: 'Comcast Corporation', price: 42.85, change: '+0.7%' },
  { symbol: 'VZ', name: 'Verizon Communications', price: 39.95, change: '-0.2%' },
  { symbol: 'T', name: 'AT&T Inc.', price: 17.25, change: '+0.4%' },

  // Financial Services
  { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 185.40, change: '+1.4%' },
  { symbol: 'BAC', name: 'Bank of America Corp.', price: 35.75, change: '-0.6%' },
  { symbol: 'WFC', name: 'Wells Fargo & Co.', price: 57.80, change: '+0.9%' },
  { symbol: 'V', name: 'Visa Inc.', price: 278.90, change: '+1.6%' },
  { symbol: 'MA', name: 'Mastercard Inc.', price: 475.60, change: '+2.1%' },
  { symbol: 'GS', name: 'Goldman Sachs Group', price: 385.70, change: '+1.8%' },
  { symbol: 'MS', name: 'Morgan Stanley', price: 87.90, change: '-0.4%' },
  { symbol: 'BLK', name: 'BlackRock Inc.', price: 815.30, change: '+2.2%' },
  { symbol: 'C', name: 'Citigroup Inc.', price: 57.85, change: '-0.7%' },
  { symbol: 'AXP', name: 'American Express Co.', price: 218.40, change: '+1.5%' },

  // Healthcare
  { symbol: 'JNJ', name: 'Johnson & Johnson', price: 157.90, change: '+0.6%' },
  { symbol: 'UNH', name: 'UnitedHealth Group', price: 492.75, change: '+1.9%' },
  { symbol: 'PFE', name: 'Pfizer Inc.', price: 27.85, change: '-1.1%' },
  { symbol: 'ABBV', name: 'AbbVie Inc.', price: 178.90, change: '+2.4%' },
  { symbol: 'MRK', name: 'Merck & Co.', price: 125.80, change: '+1.2%' },
  { symbol: 'LLY', name: 'Eli Lilly and Co.', price: 768.90, change: '+3.1%' },
  { symbol: 'TMO', name: 'Thermo Fisher Scientific', price: 598.40, change: '+1.7%' },
  { symbol: 'ABT', name: 'Abbott Laboratories', price: 112.30, change: '-0.3%' },
  { symbol: 'DHR', name: 'Danaher Corporation', price: 248.90, change: '+0.9%' },
  { symbol: 'BMY', name: 'Bristol-Myers Squibb', price: 52.40, change: '-0.8%' },

  // Consumer Goods
  { symbol: 'PG', name: 'Procter & Gamble', price: 158.90, change: '+0.7%' },
  { symbol: 'KO', name: 'Coca-Cola Company', price: 59.85, change: '+0.5%' },
  { symbol: 'PEP', name: 'PepsiCo Inc.', price: 168.75, change: '+0.8%' },
  { symbol: 'COST', name: 'Costco Wholesale', price: 725.90, change: '+2.6%' },
  { symbol: 'WMT', name: 'Walmart Inc.', price: 175.80, change: '+1.3%' },
  { symbol: 'NKE', name: 'Nike Inc.', price: 98.90, change: '-0.9%' },
  { symbol: 'MCD', name: "McDonald's Corp.", price: 295.40, change: '+1.1%' },
  { symbol: 'SBUX', name: 'Starbucks Corp.', price: 92.75, change: '-0.4%' },
  { symbol: 'HD', name: 'Home Depot Inc.', price: 378.90, change: '+1.8%' },
  { symbol: 'TGT', name: 'Target Corporation', price: 168.40, change: '-0.6%' },

  // Industrial
  { symbol: 'BA', name: 'Boeing Company', price: 198.75, change: '+1.4%' },
  { symbol: 'CAT', name: 'Caterpillar Inc.', price: 345.90, change: '+2.2%' },
  { symbol: 'GE', name: 'General Electric', price: 175.80, change: '+1.9%' },
  { symbol: 'HON', name: 'Honeywell International', price: 198.40, change: '+0.8%' },
  { symbol: 'UPS', name: 'United Parcel Service', price: 148.90, change: '-0.5%' },
  { symbol: 'MMM', name: '3M Company', price: 92.40, change: '-1.1%' },
  { symbol: 'LMT', name: 'Lockheed Martin', price: 438.90, change: '+1.6%' },
  { symbol: 'RTX', name: 'RTX Corporation', price: 92.75, change: '+0.7%' },
  { symbol: 'DE', name: 'Deere & Company', price: 385.90, change: '+2.1%' },
  { symbol: 'FDX', name: 'FedEx Corporation', price: 248.75, change: '+1.2%' },

  // Energy
  { symbol: 'XOM', name: 'Exxon Mobil Corp.', price: 108.90, change: '+1.5%' },
  { symbol: 'CVX', name: 'Chevron Corporation', price: 152.40, change: '+1.8%' },
  { symbol: 'COP', name: 'ConocoPhillips', price: 115.80, change: '+2.1%' },
  { symbol: 'SLB', name: 'Schlumberger NV', price: 52.90, change: '+1.2%' },
  { symbol: 'EOG', name: 'EOG Resources', price: 118.75, change: '+1.7%' },

  // Real Estate
  { symbol: 'AMT', name: 'American Tower Corp.', price: 192.40, change: '+0.9%' },
  { symbol: 'PLD', name: 'Prologis Inc.', price: 128.90, change: '+1.1%' },
  { symbol: 'CCI', name: 'Crown Castle Inc.', price: 105.80, change: '-0.7%' },
  { symbol: 'EQIX', name: 'Equinix Inc.', price: 785.90, change: '+2.3%' },
  { symbol: 'SPG', name: 'Simon Property Group', price: 148.75, change: '+1.4%' },

  // Materials
  { symbol: 'LIN', name: 'Linde plc', price: 448.90, change: '+1.9%' },
  { symbol: 'APD', name: 'Air Products', price: 238.75, change: '+1.2%' },
  { symbol: 'ECL', name: 'Ecolab Inc.', price: 218.90, change: '+1.5%' },
  { symbol: 'SHW', name: 'Sherwin-Williams', price: 328.40, change: '+1.7%' },
  { symbol: 'FCX', name: 'Freeport-McMoRan', price: 42.90, change: '+2.4%' },

  // Utilities
  { symbol: 'NEE', name: 'NextEra Energy', price: 58.90, change: '+0.6%' },
  { symbol: 'DUK', name: 'Duke Energy', price: 94.75, change: '+0.4%' },
  { symbol: 'SO', name: 'Southern Company', price: 68.90, change: '+0.5%' },
  { symbol: 'D', name: 'Dominion Energy', price: 47.80, change: '-0.3%' },
  { symbol: 'AEP', name: 'American Electric Power', price: 82.90, change: '+0.7%' },

  // Additional Tech Companies
  { symbol: 'ZM', name: 'Zoom Video Communications', price: 68.90, change: '-1.2%' },
  { symbol: 'SNOW', name: 'Snowflake Inc.', price: 188.75, change: '+2.8%' },
  { symbol: 'PLTR', name: 'Palantir Technologies', price: 24.90, change: '+3.4%' },
  { symbol: 'NET', name: 'Cloudflare Inc.', price: 98.40, change: '+2.9%' },
  { symbol: 'CRWD', name: 'CrowdStrike Holdings', price: 318.90, change: '+3.6%' },
  { symbol: 'DDOG', name: 'Datadog Inc.', price: 128.75, change: '+2.7%' },
  { symbol: 'TEAM', name: 'Atlassian Corporation', price: 198.90, change: '+1.9%' },
  { symbol: 'OKTA', name: 'Okta Inc.', price: 92.40, change: '-0.8%' },
  { symbol: 'TTD', name: 'The Trade Desk', price: 85.90, change: '+2.2%' },
  { symbol: 'U', name: 'Unity Software', price: 32.75, change: '-1.4%' },

  // Growth Tech
  { symbol: 'SQ', name: 'Block Inc.', price: 78.90, change: '+2.8%' },
  { symbol: 'SHOP', name: 'Shopify Inc.', price: 78.75, change: '+3.1%' },
  { symbol: 'PYPL', name: 'PayPal Holdings', price: 62.90, change: '-0.9%' },
  { symbol: 'ABNB', name: 'Airbnb Inc.', price: 158.40, change: '+1.8%' },
  { symbol: 'UBER', name: 'Uber Technologies', price: 75.90, change: '+2.4%' },

  // Emerging Tech
  { symbol: 'AI', name: 'C3.ai Inc.', price: 28.90, change: '+4.2%' },
  { symbol: 'PATH', name: 'UiPath Inc.', price: 22.75, change: '+1.8%' },
  { symbol: 'GTLB', name: 'GitLab Inc.', price: 68.90, change: '+2.9%' },
  { symbol: 'CFLT', name: 'Confluent Inc.', price: 32.40, change: '+1.7%' },
  { symbol: 'MDB', name: 'MongoDB Inc.', price: 428.90, change: '+3.2%' }
];

export type DateRange = '1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL';

// Generate mock chart data based on date range
export function getStockChartData(range: DateRange = '1M') {
  const data = [];
  const now = new Date();
  let points: number;
  let interval: number;
  
  switch (range) {
    case '1D':
      points = 24;
      interval = 1;
      break;
    case '1W':
      points = 7;
      interval = 1;
      break;
    case '1M':
      points = 30;
      interval = 1;
      break;
    case '3M':
      points = 90;
      interval = 3;
      break;
    case '1Y':
      points = 12;
      interval = 30;
      break;
    case 'ALL':
      points = 60;
      interval = 30;
      break;
  }

  const basePrice = 150;
  let lastPrice = basePrice;

  for (let i = points; i >= 0; i--) {
    const date = new Date(now);
    if (range === '1D') {
      date.setHours(date.getHours() - i);
      const hour = date.getHours();
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      data.push({
        date: `${formattedHour}${ampm}`,
        price: lastPrice + (Math.random() - 0.5) * 2
      });
    } else {
      date.setDate(date.getDate() - i * interval);
      const formatOptions: Intl.DateTimeFormatOptions = range === '1W' 
        ? { weekday: 'short' }
        : range === '1Y' || range === 'ALL'
          ? { month: 'short', year: '2-digit' }
          : { month: 'short', day: 'numeric' };
      
      lastPrice += (Math.random() - 0.5) * 5;
      data.push({
        date: date.toLocaleDateString('en-US', formatOptions),
        price: lastPrice
      });
    }
  }
  return data;
}