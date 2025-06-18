export type Profile = {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  timezone: string;
  currency: string;
  created_at: string;
  updated_at: string;
};

export type Portfolio = {
  id: string;
  user_id: string;
  symbol: string;
  shares: number;
  avg_price: number;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  type: 'stock_buy' | 'stock_sell' | 'deposit' | 'withdrawal';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  description: string;
  stock_symbol?: string;
  quantity?: number;
  price?: number;
  created_at: string;
};

export type PaymentMethod = {
  id: string;
  user_id: string;
  type: 'bank' | 'card';
  name: string;
  last_four: string;
  is_default: boolean;
  expiry_date?: string;
  created_at: string;
  updated_at: string;
};