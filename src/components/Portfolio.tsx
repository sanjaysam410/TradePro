import React from 'react';
import PortfolioSummary from './PortfolioSummary';

function Portfolio() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Summary */}
        <div className="lg:col-span-2">
          <PortfolioSummary />
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {JSON.parse(localStorage.getItem('transactions') || '[]')
                .slice(0, 5)
                .map((transaction: any) => (
                  <div key={transaction.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'stock_buy' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm font-medium ${
                        transaction.type === 'stock_buy' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'stock_buy' ? 'B' : 'S'}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {transaction.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(transaction.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;