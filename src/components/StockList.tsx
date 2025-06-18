import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { stockData } from '../data/stocks';
import PortfolioSummary from './PortfolioSummary';

function StockList({ searchTerm }: { searchTerm: string }) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handleStockClick = (symbol: string) => {
    navigate(`/stock/${symbol}`);
  };

  const filteredStocks = stockData.filter(stock => 
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedStocks = filteredStocks.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Section */}
        <div className="lg:col-span-1">
          <PortfolioSummary />
        </div>

        {/* Market Overview Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Market Overview</h2>
              </div>
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-500 mb-2">
                <div>Symbol</div>
                <div>Name</div>
                <div className="text-right">Price</div>
                <div className="text-right">Change</div>
              </div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {displayedStocks.map((stock) => (
                <div
                  key={stock.symbol}
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleStockClick(stock.symbol)}
                >
                  <div className="grid grid-cols-4 gap-4 w-full items-center">
                    <div className="font-medium text-gray-900">{stock.symbol}</div>
                    <div className="text-gray-500">{stock.name}</div>
                    <div className="text-right font-medium text-gray-900">${stock.price}</div>
                    <div className={`text-right ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                      {stock.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredStocks.length)} of {filteredStocks.length} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded ${
                    currentPage === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StockList;