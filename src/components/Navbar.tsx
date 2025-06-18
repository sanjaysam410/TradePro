import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  TrendingUp, Search, Bell, User, PieChart, Wallet, 
  Settings, X, CheckCircle, AlertTriangle, DollarSign, 
  LogOut, UserCircle, HelpCircle, Mail 
} from 'lucide-react';
import { stockData } from '../data/stocks';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  userProfile: any;
  onLogout: () => void;
}

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info';
  message: string;
  timestamp: Date;
  read: boolean;
}

function Navbar({ searchTerm, onSearchChange, userProfile, onLogout }: NavbarProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Get notifications from localStorage or set defaults
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('notifications');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((n: any) => ({
        ...n,
        timestamp: new Date(n.timestamp)
      }));
    }
    return [
      {
        id: '1',
        type: 'success',
        message: 'Your last trade was successful',
        timestamp: new Date(),
        read: false
      },
      {
        id: '2',
        type: 'warning',
        message: 'AAPL stock is down by 5%',
        timestamp: new Date(Date.now() - 3600000),
        read: false
      },
      {
        id: '3',
        type: 'info',
        message: 'New market analysis available',
        timestamp: new Date(Date.now() - 7200000),
        read: false
      }
    ];
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredStocks = stockData
    .filter(stock => 
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5);

  const handleStockSelect = (symbol: string) => {
    navigate(`/stock/${symbol}`);
    setShowDropdown(false);
    onSearchChange('');
  };

  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const removeNotification = (id: string) => {
    const updatedNotifications = notifications.filter(n => n.id !== id);
    setNotifications(updatedNotifications);
    localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <DollarSign className="h-5 w-5 text-blue-500" />;
    }
  };

  const navItems = [
    { path: '/', label: 'Market', icon: TrendingUp },
    { path: '/portfolio', label: 'Portfolio', icon: PieChart },
    { path: '/funds', label: 'Funds', icon: Wallet },
  ];

  return (
    <nav className="bg-white shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TradePro</span>
            </Link>
            
            {/* Navigation Items */}
            <div className="hidden md:flex space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isActive
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-1.5" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search stocks..."
                value={searchTerm}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              
              {/* Search Results Dropdown */}
              {showDropdown && searchTerm && (
                <div
                  ref={dropdownRef}
                  className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                >
                  {filteredStocks.length > 0 ? (
                    filteredStocks.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleStockSelect(stock.symbol)}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium text-gray-900">{stock.symbol}</div>
                            <div className="text-sm text-gray-500">{stock.name}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">${stock.price}</div>
                            <div className={`text-sm ${stock.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {stock.change}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500">No results found</div>
                  )}
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell className="h-6 w-6 text-gray-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div
                  ref={notificationsRef}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-500">
                        No notifications
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3">
                              {getNotificationIcon(notification.type)}
                              <div>
                                <p className="text-sm text-gray-900">{notification.message}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {formatTimestamp(new Date(notification.timestamp))}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => removeNotification(notification.id)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/account"
              className="p-2 rounded-full hover:bg-gray-100"
              title="Account Settings"
            >
              <Settings className="h-6 w-6 text-gray-600" />
            </Link>

            {/* Profile Menu */}
            <div className="relative">
              <button
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <User className="h-6 w-6 text-gray-600" />
              </button>

              {showProfileMenu && (
                <div
                  ref={profileMenuRef}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center space-x-3">
                      <UserCircle className="h-10 w-10 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-900">{userProfile?.name}</p>
                        <p className="text-sm text-gray-500">{userProfile?.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/account"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Settings className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Account Settings</span>
                    </Link>
                    <a
                      href="mailto:support@tradepro.com"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <Mail className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Contact Support</span>
                    </a>
                    <Link
                      to="/help"
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <HelpCircle className="h-5 w-5 mr-3 text-gray-400" />
                      <span>Help Center</span>
                    </Link>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onLogout();
                        navigate('/login');
                      }}
                      className="flex items-center w-full px-4 py-3 text-left text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;