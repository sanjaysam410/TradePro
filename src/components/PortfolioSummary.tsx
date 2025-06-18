import React from 'react';
import { useNavigate } from 'react-router-dom';
import { stockData } from '../data/stocks';
import { TrendingUp, TrendingDown, Star } from 'lucide-react';

interface PortfolioSummaryProps {
  className?: string;
}

function PortfolioSummary({ className = '' }: PortfolioSummaryProps) {
  const navigate = useNavigate();

  // Get portfolio data from localStorage
  const portfolio = JSON.parse(localStorage.getItem('portfolio') || '[]');

  const handleStockClick = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

  const calculateValue = (shares: number, currentPrice: number) => shares * currentPrice;
  const calculateGain = (shares: number, avgPrice: number, currentPrice: number) => 
    ((currentPrice - avgPrice) * shares).toFixed(2);
  const calculateGainPercentage = (avgPrice: number, currentPrice: number) =>
    (((currentPrice - avgPrice) / avgPrice) * 100).toFixed(2);

  // Calculate portfolio summary
  const portfolioSummary = portfolio.reduce((acc: any, position: any) => {
    const stock = stockData.find(s => s.symbol === position.symbol)!;
    const currentValue = calculateValue(position.shares, stock.price);
    const totalCost = position.shares * position.avgPrice;
    const gainLoss = Number(calculateGain(position.shares, position.avgPrice, stock.price));
    
    return {
      totalValue: acc.totalValue + currentValue,
      totalCost: acc.totalCost + totalCost,
      totalGainLoss: acc.totalGainLoss + gainLoss
    };
  }, { totalValue: 0, totalCost: 0, totalGainLoss: 0 });

  const portfolioGainPercentage = portfolioSummary.totalCost === 0 ? 0 :
    ((portfolioSummary.totalGainLoss / portfolioSummary.totalCost) * 100).toFixed(2);
  const isPortfolioPositive = portfolioSummary.totalGainLoss >= 0;

  return (
    <div className={`bg-white rounded-lg shadow ${className}`}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">My Portfolio</h2>
        
        {/* Portfolio Summary */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500">Invested Amount</p>
              <p className="text-xl font-semibold">${portfolioSummary.totalCost.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Present Value</p>
              <div className="flex items-center justify-end">
                <p className="text-xl font-semibold">
                  ${portfolioSummary.totalValue.toFixed(2)}
                  <span className={`text-sm ml-2 ${isPortfolioPositive ? 'text-green-500' : 'text-red-500'}`}>
                    ({isPortfolioPositive ? '+' : ''}{portfolioGainPercentage}%)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {portfolio.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No stocks in portfolio. Start trading to build your portfolio!
            </div>
          ) : (
            portfolio.map((position: any) => {
              const stock = stockData.find(s => s.symbol === position.symbol)!;
              const currentValue = calculateValue(position.shares, stock.price);
              const gainLoss = calculateGain(position.shares, position.avgPrice, stock.price);
              const gainLossPercentage = calculateGainPercentage(position.avgPrice, stock.price);
              const isPositive = Number(gainLoss) >= 0;

              return (
                <div key={position.symbol} 
                  className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => handleStockClick(position.symbol)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Star className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-900">{position.symbol}</h3>
                          <span className="text-sm text-gray-500 ml-2">{position.shares} shares</span>
                        </div>
                        <p className="text-sm text-gray-500">${currentValue.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        {isPositive ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <p className={`font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {isPositive ? '+' : ''}{gainLossPercentage}%
                        </p>
                      </div>
                      <p className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : '-'}${Math.abs(Number(gainLoss))}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default PortfolioSummary;