import React, { useState } from 'react';
import { 
  BookOpen, 
  DollarSign, 
  Shield, 
  TrendingUp, 
  Wallet, 
  HelpCircle,
  ChevronRight,
  Search,
  AlertCircle,
  Newspaper,
  GraduationCap
} from 'lucide-react';

interface HelpCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  description: string;
  articles: HelpArticle[];
}

interface HelpArticle {
  id: string;
  title: string;
  content: string;
}

function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  const helpCategories: HelpCategory[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: BookOpen,
      description: 'New to TradePro? Learn the basics of trading and platform navigation.',
      articles: [
        {
          id: 'account-setup',
          title: 'How to Set Up Your Account',
          content: `
            Setting up your TradePro account is quick and easy:
            
            1. Complete your profile information
            2. Verify your email address
            3. Add funds to your account
            4. Start trading!
            
            Remember to keep your account information secure and never share your credentials.
          `
        },
        {
          id: 'platform-overview',
          title: 'Platform Overview',
          content: `
            TradePro offers a comprehensive trading platform with:
            
            - Real-time market data
            - Advanced charting tools
            - Portfolio management
            - Fund tracking
            - Trade history
            
            Navigate using the main menu to access different sections of the platform.
          `
        }
      ]
    },
    {
      id: 'trading',
      title: 'Trading',
      icon: TrendingUp,
      description: 'Learn about different order types and trading strategies.',
      articles: [
        {
          id: 'order-types',
          title: 'Understanding Order Types',
          content: `
            TradePro supports various order types:
            
            1. Market Orders: Execute immediately at current market price
            2. Limit Orders: Set your desired price for execution
            3. Stop Orders: Trigger when stock reaches specified price
            4. Stop-Limit Orders: Combine features of stop and limit orders
            
            Choose the right order type based on your trading strategy.
          `
        },
        {
          id: 'trading-strategies',
          title: 'Basic Trading Strategies',
          content: `
            Common trading strategies include:
            
            - Day Trading: Open and close positions within same day
            - Swing Trading: Hold positions for days to weeks
            - Position Trading: Long-term investment approach
            - Dollar-Cost Averaging: Regular investments over time
            
            Always research and understand a strategy before implementing it.
          `
        }
      ]
    },
    {
      id: 'funds',
      title: 'Funds Management',
      icon: Wallet,
      description: 'Information about deposits, withdrawals, and fund security.',
      articles: [
        {
          id: 'deposit-withdrawal',
          title: 'Deposits and Withdrawals',
          content: `
            Managing your funds:
            
            Deposits:
            - Minimum deposit: $100
            - Maximum deposit: $1,000,000
            - Processing time: Instant to 2 business days
            
            Withdrawals:
            - Minimum withdrawal: $100
            - Processing time: 1-3 business days
            - Verification required for large withdrawals
          `
        },
        {
          id: 'fund-security',
          title: 'Fund Security',
          content: `
            Your funds are protected by:
            
            - Bank-level encryption
            - Two-factor authentication
            - Regular security audits
            - Insurance coverage
            
            We never share your financial information with third parties.
          `
        }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Learn about account security and privacy measures.',
      articles: [
        {
          id: 'account-security',
          title: 'Account Security Best Practices',
          content: `
            Protect your account:
            
            1. Use a strong, unique password
            2. Enable two-factor authentication
            3. Never share login credentials
            4. Monitor account activity regularly
            5. Use secure internet connections
            
            Contact support immediately if you suspect unauthorized access.
          `
        },
        {
          id: 'privacy',
          title: 'Privacy Policy',
          content: `
            We protect your privacy:
            
            - Data encryption in transit and at rest
            - Strict access controls
            - Regular security updates
            - Compliance with data protection regulations
            
            Review our full privacy policy for detailed information.
          `
        }
      ]
    },
    {
      id: 'education',
      title: 'Education',
      icon: GraduationCap,
      description: 'Educational resources and trading tutorials.',
      articles: [
        {
          id: 'market-basics',
          title: 'Stock Market Basics',
          content: `
            Understanding the market:
            
            - What are stocks and how they work
            - Market hours and trading sessions
            - Reading stock charts
            - Understanding market indicators
            - Basic technical analysis
            
            Start with these fundamentals before advanced trading.
          `
        },
        {
          id: 'risk-management',
          title: 'Risk Management',
          content: `
            Essential risk management principles:
            
            1. Never invest more than you can afford to lose
            2. Diversify your portfolio
            3. Use stop-loss orders
            4. Understand position sizing
            5. Monitor market conditions
            
            Successful trading requires proper risk management.
          `
        }
      ]
    }
  ];

  const filteredCategories = helpCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.articles.some(article =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Help Center</h1>
            </div>
            <a
              href="mailto:support@tradepro.com"
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Contact Support
            </a>
          </div>
          
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="p-6">
          {selectedArticle ? (
            // Article View
            <div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
              >
                <ChevronRight className="h-4 w-4 transform rotate-180 mr-1" />
                Back to {selectedCategory ? helpCategories.find(c => c.id === selectedCategory)?.title : 'Categories'}
              </button>
              <h2 className="text-xl font-semibold mb-4">{selectedArticle.title}</h2>
              <div className="prose max-w-none">
                {selectedArticle.content.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 text-gray-700">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>
            </div>
          ) : selectedCategory ? (
            // Category Articles View
            <div>
              <button
                onClick={() => setSelectedCategory(null)}
                className="flex items-center text-blue-600 hover:text-blue-700 mb-4"
              >
                <ChevronRight className="h-4 w-4 transform rotate-180 mr-1" />
                Back to Categories
              </button>
              <h2 className="text-xl font-semibold mb-4">
                {helpCategories.find(c => c.id === selectedCategory)?.title}
              </h2>
              <div className="space-y-4">
                {helpCategories
                  .find(c => c.id === selectedCategory)
                  ?.articles.map(article => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                    >
                      <h3 className="font-medium text-gray-900">{article.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {article.content.split('\n')[0]}
                      </p>
                    </button>
                  ))}
              </div>
            </div>
          ) : (
            // Categories View
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCategories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className="text-left p-6 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon className="h-6 w-6 text-blue-600" />
                      <h2 className="text-lg font-medium text-gray-900">
                        {category.title}
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500">{category.description}</p>
                    <div className="flex items-center text-blue-600 mt-4 text-sm">
                      <span>View articles</span>
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;