import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { stockData, getStockChartData, DateRange } from '../data/stocks';
import { AlertCircle } from 'lucide-react';

function StockDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const [quantity, setQuantity] = useState(1);
  const [dateRange, setDateRange] = useState<DateRange>('1M');
  const [error, setError] = useState<string | null>(null);
  const stock = stockData.find(s => s.symbol === symbol);
  const chartData = getStockChartData(dateRange);

  useEffect(() => {
    // Initialize portfolio with 9 stocks if not already initialized
    if (!localStorage.getItem('portfolio')) {
      const initialPortfolio = [
        { symbol: 'AAPL', shares: 15, avgPrice: 160.75 },
        { symbol: 'MSFT', shares: 10, avgPrice: 420.50 },
        { symbol: 'GOOGL', shares: 12, avgPrice: 140.25 },
        { symbol: 'NVDA', shares: 8, avgPrice: 850.30 },
        { symbol: 'JPM', shares: 20, avgPrice: 190.25 },
        { symbol: 'TSLA', shares: 25, avgPrice: 265.40 },
        { symbol: 'AMZN', shares: 18, avgPrice: 170.25 },
        { symbol: 'META', shares: 15, avgPrice: 460.30 },
        { symbol: 'NFLX', shares: 12, avgPrice: 620.40 }
      ];

      localStorage.setItem('portfolio', JSON.stringify(initialPortfolio));
    }

    // Initialize funds data if not already initialized
    if (!localStorage.getItem('fundsData')) {
      const initialFunds = {
        totalCash: 10000.00,
        availableToTrade: 8500.00,
        marginUsed: 1000.00,
        unavailableToTrade: 500.00
      };
      localStorage.setItem('fundsData', JSON.stringify(initialFunds));
    }
  }, []);

  if (!stock) {
    return <div>Stock not found</div>;
  }

  const handleTrade = (type: 'buy' | 'sell') => {
    const totalCost = stock.price * quantity;
    const fundsData = JSON.parse(localStorage.getItem('fundsData') || '{}');
    const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');
    
    // Validate the trade
    if (type === 'buy') {
      if (totalCost > fundsData.availableToTrade) {
        setError('Insufficient funds available for trading');
        return;
      }
    } else {
      const existingPosition = portfolio.find((p: any) => p.symbol === symbol);
      if (!existingPosition || existingPosition.shares < quantity) {
        setError('Insufficient shares available to sell');
        return;
      }
    }

    // Clear any previous errors
    setError(null);

    // Update portfolio
    const existingPosition = portfolio.find((p: any) => p.symbol === symbol);
    let updatedPortfolio;

    if (type === 'buy') {
      if (existingPosition) {
        // Update existing position
        const newShares = existingPosition.shares + quantity;
        const newAvgPrice = ((existingPosition.shares * existingPosition.avgPrice) + (quantity * stock.price)) / newShares;
        updatedPortfolio = portfolio.map((p: any) =>
          p.symbol === symbol ? { ...p, shares: newShares, avgPrice: newAvgPrice } : p
        );
      } else {
        // Add new position
        updatedPortfolio = [...portfolio, {
          symbol,
          shares: quantity,
          avgPrice: stock.price
        }];
      }
    } else {
      // Selling
      const remainingShares = existingPosition.shares - quantity;
      if (remainingShares > 0) {
        updatedPortfolio = portfolio.map((p: any) =>
          p.symbol === symbol ? { ...p, shares: remainingShares } : p
        );
      } else {
        updatedPortfolio = portfolio.filter((p: any) => p.symbol !== symbol);
      }
    }

    // Update funds
    const updatedFunds = {
      ...fundsData,
      totalCash: type === 'buy' 
        ? fundsData.totalCash - totalCost 
        : fundsData.totalCash + totalCost,
      availableToTrade: type === 'buy'
        ? fundsData.availableToTrade - totalCost
        : fundsData.availableToTrade + totalCost,
      marginUsed: type === 'buy'
        ? fundsData.marginUsed + totalCost
        : fundsData.marginUsed - totalCost
    };

    // Add transaction record
    const transactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const newTransaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: type === 'buy' ? 'stock_buy' : 'stock_sell',
      amount: totalCost,
      status: 'completed',
      date: new Date(),
      description: `${type === 'buy' ? 'Bought' : 'Sold'} ${quantity} shares of ${symbol} at $${stock.price}`,
      stockSymbol: symbol,
      quantity,
      price: stock.price
    };

    // Save all updates
    localStorage.setItem('portfolio', JSON.stringify(updatedPortfolio));
    localStorage.setItem('fundsData', JSON.stringify(updatedFunds));
    localStorage.setItem('transactions', JSON.stringify([newTransaction, ...transactions]));

    // Reset quantity
    setQuantity(1);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-lg rounded">
          <p className="text-gray-600">{label}</p>
          <p className="text-blue-600 font-semibold">
            ${Number(payload[0].value).toFixed(2)}
          </p>
        </div>
      );
    }
    return null;
  };

  const dateRanges: DateRange[] = ['1D', '1W', '1M', '3M', '1Y', 'ALL'];

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Info and Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold">{stock.name} ({stock.symbol})</h1>
              <p className="text-gray-500">NASDAQ</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold">${stock.price}</p>
              <p className={stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                {stock.change}
              </p>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['auto', 'auto']} />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap justify-between mt-4 gap-2">
            {dateRanges.map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 text-sm font-medium rounded transition-colors
                  ${dateRange === range 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Trading Panel */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Trade {symbol}</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => {
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1));
                  setError(null);
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            {error && (
              <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div className="flex space-x-2">
              <button 
                onClick={() => handleTrade('buy')}
                className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
              >
                Buy
              </button>
              <button 
                onClick={() => handleTrade('sell')}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Sell
              </button>
            </div>
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Order Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Market Price</span>
                  <span className="font-medium">${stock.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quantity</span>
                  <span className="font-medium">{quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Estimated Cost</span>
                  <span className="font-medium">${(stock.price * quantity).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default StockDetail;