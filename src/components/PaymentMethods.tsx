import React, { useState } from 'react';
import { CreditCard, Building2, Plus, Trash2, CheckCircle, AlertCircle, Edit3, X } from 'lucide-react';

interface PaymentMethod {
  id: string;
  type: 'bank' | 'card';
  name: string;
  lastFour: string;
  isDefault: boolean;
  expiryDate?: string;
}

function PaymentMethods() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formType, setFormType] = useState<'bank' | 'card'>('bank');
  const [error, setError] = useState<string | null>(null);
  
  // Get payment methods from localStorage or set defaults
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(() => {
    const saved = localStorage.getItem('paymentMethods');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: '1',
        type: 'bank',
        name: 'Chase Bank',
        lastFour: '4567',
        isDefault: true
      },
      {
        id: '2',
        type: 'card',
        name: 'Visa',
        lastFour: '8901',
        isDefault: false,
        expiryDate: '12/25'
      }
    ];
  });

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      // Validate form data
      const name = formData.get('name') as string;
      const number = formData.get('number') as string;
      
      if (!name || !number) {
        throw new Error('Please fill in all required fields');
      }

      if (formType === 'card') {
        const expiry = formData.get('expiry') as string;
        const cvv = formData.get('cvv') as string;
        
        if (!expiry || !cvv) {
          throw new Error('Please fill in all card details');
        }

        if (!/^\d{3,4}$/.test(cvv)) {
          throw new Error('Invalid CVV');
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
          throw new Error('Invalid expiry date format (MM/YY)');
        }
      }

      // Create new payment method
      const newMethod: PaymentMethod = {
        id: Math.random().toString(36).substr(2, 9),
        type: formType,
        name,
        lastFour: number.slice(-4),
        isDefault: paymentMethods.length === 0,
        ...(formType === 'card' && {
          expiryDate: formData.get('expiry') as string
        })
      };

      const updatedMethods = [...paymentMethods, newMethod];
      setPaymentMethods(updatedMethods);
      localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
      
      setShowAddForm(false);
      setError(null);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleDelete = (id: string) => {
    const updatedMethods = paymentMethods.filter(method => method.id !== id);
    setPaymentMethods(updatedMethods);
    localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
  };

  const handleSetDefault = (id: string) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }));
    setPaymentMethods(updatedMethods);
    localStorage.setItem('paymentMethods', JSON.stringify(updatedMethods));
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Payment Methods</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage your payment methods for deposits and withdrawals
        </p>
      </div>

      <div className="p-6">
        {/* Existing Payment Methods */}
        <div className="space-y-4 mb-6">
          {paymentMethods.map(method => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {method.type === 'bank' ? (
                  <Building2 className="h-6 w-6 text-blue-600" />
                ) : (
                  <CreditCard className="h-6 w-6 text-blue-600" />
                )}
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium">{method.name}</p>
                    {method.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {method.type === 'bank' ? 'Account' : 'Card'} ending in {method.lastFour}
                    {method.expiryDate && ` • Expires ${method.expiryDate}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!method.isDefault && (
                  <button
                    onClick={() => handleSetDefault(method.id)}
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Set as default
                  </button>
                )}
                <button
                  onClick={() => handleDelete(method.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Payment Method */}
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          >
            <Plus className="h-5 w-5" />
            <span>Add payment method</span>
          </button>
        ) : (
          <div className="border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Add Payment Method</h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setError(null);
                }}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Method Type Selection */}
            <div className="flex space-x-4 mb-6">
              <button
                onClick={() => setFormType('bank')}
                className={`flex-1 p-4 border rounded-lg flex items-center justify-center space-x-2
                  ${formType === 'bank' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
              >
                <Building2 className={`h-5 w-5 ${formType === 'bank' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={formType === 'bank' ? 'text-blue-600' : 'text-gray-600'}>Bank Account</span>
              </button>
              <button
                onClick={() => setFormType('card')}
                className={`flex-1 p-4 border rounded-lg flex items-center justify-center space-x-2
                  ${formType === 'card' ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-300'}`}
              >
                <CreditCard className={`h-5 w-5 ${formType === 'card' ? 'text-blue-600' : 'text-gray-400'}`} />
                <span className={formType === 'card' ? 'text-blue-600' : 'text-gray-600'}>Credit Card</span>
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleAddMethod} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formType === 'bank' ? 'Bank Name' : 'Cardholder Name'}
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={formType === 'bank' ? 'Enter bank name' : 'Enter cardholder name'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {formType === 'bank' ? 'Account Number' : 'Card Number'}
                </label>
                <input
                  type="text"
                  name="number"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={formType === 'bank' ? 'Enter account number' : 'Enter card number'}
                />
              </div>

              {formType === 'card' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="Enter CVV"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setError(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add {formType === 'bank' ? 'Bank Account' : 'Card'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaymentMethods;