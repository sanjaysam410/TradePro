import React, { useState, useEffect } from 'react';
import { ChevronRight, Plus, ArrowDownCircle, ArrowUpCircle, X, AlertCircle } from 'lucide-react';
import PaymentMethods from './PaymentMethods';

interface FundsData {
  totalCash: number;
  availableToTrade: number;
  marginUsed: number;
  unavailableToTrade: number;
}

function Funds() {
  const [showModal, setShowModal] = useState(false);
  const [transactionType, setTransactionType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const [fundsData, setFundsData] = useState<FundsData>(() => {
    const savedFunds = localStorage.getItem('fundsData');
    return savedFunds ? JSON.parse(savedFunds) : {
      totalCash: 10000.00,
      availableToTrade: 8500.00,
      marginUsed: 1000.00,
      unavailableToTrade: 500.00
    };
  });

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedFunds = localStorage.getItem('fundsData');
      if (updatedFunds) {
        setFundsData(JSON.parse(updatedFunds));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Funds Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 space-y-6">
              {/* Total Cash */}
              <div>
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Total cash</h2>
                    <p className="text-sm text-gray-500">All segments</p>
                  </div>
                  <span className="text-2xl font-semibold">{formatCurrency(fundsData.totalCash)}</span>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Fund Details */}
              <div className="space-y-4">
                {/* Available to trade */}
                <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                  <div>
                    <span className="text-gray-900">Available to trade</span>
                    <p className="text-xs text-gray-500">Amount available for new positions</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900 mr-2">{formatCurrency(fundsData.availableToTrade)}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Margin used */}
                <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                  <div>
                    <span className="text-gray-900">Margin used</span>
                    <p className="text-xs text-gray-500">Funds utilized for margin positions</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900 mr-2">{formatCurrency(fundsData.marginUsed)}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>

                {/* Unavailable to trade */}
                <div className="flex items-center justify-between py-2 cursor-pointer hover:bg-gray-50 rounded-lg px-2">
                  <div>
                    <span className="text-gray-900">Unavailable to trade</span>
                    <p className="text-xs text-gray-500">Funds reserved for pending orders</p>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-900 mr-2">{formatCurrency(fundsData.unavailableToTrade)}</span>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button 
                  onClick={() => {
                    setTransactionType('deposit');
                    setError(null);
                    setShowModal(true);
                  }}
                  className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add funds</span>
                </button>
                <button 
                  onClick={() => {
                    setTransactionType('withdrawal');
                    setError(null);
                    setShowModal(true);
                  }}
                  className="w-full py-3 px-4 bg-white text-gray-900 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
                >
                  <ArrowUpCircle className="h-5 w-5" />
                  <span>Withdraw funds</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {JSON.parse(localStorage.getItem('transactions') || '[]')
                .slice(0, 5)
                .map((transaction: any) => (
                  <div 
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {transaction.type === 'deposit' ? (
                        <ArrowDownCircle className="h-5 w-5 text-green-500" />
                      ) : transaction.type === 'withdrawal' ? (
                        <ArrowUpCircle className="h-5 w-5 text-red-500" />
                      ) : transaction.type === 'stock_buy' ? (
                        <ArrowUpCircle className="h-5 w-5 text-blue-500" />
                      ) : (
                        <ArrowDownCircle className="h-5 w-5 text-purple-500" />
                      )}
                      <div>
                        <p className="font-medium text-gray-900">
                          {transaction.description}
                        </p>
                        <p className="text-sm text-gray-500">
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
                    <div className="text-right">
                      <p className={`font-medium ${
                        transaction.type === 'deposit' || transaction.type === 'stock_sell'
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'deposit' || transaction.type === 'stock_sell' ? '+' : '-'}
                        {formatCurrency(transaction.amount)}
                      </p>
                      <p className={`text-sm ${
                        transaction.status === 'completed' ? 'text-green-600' : 
                        transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="mt-6">
        <PaymentMethods />
      </div>
    </div>
  );
}

export default Funds;