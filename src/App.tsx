import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import StockList from './components/StockList';
import StockDetail from './components/StockDetail';
import Portfolio from './components/Portfolio';
import Funds from './components/Funds';
import AccountSettings from './components/AccountSettings';
import HelpCenter from './components/HelpCenter';
import Login from './components/Auth/Login';
import SignUp from './components/Auth/SignUp';
import { useAuthContext } from './context/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { user, profile, loading, signOut } = useAuthContext();
  const [searchTerm, setSearchTerm] = React.useState('');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {user && (
        <Navbar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          userProfile={profile}
          onLogout={signOut}
        />
      )}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={
          user ? <Navigate to="/" /> : <Login />
        } />
        <Route path="/signup" element={
          user ? <Navigate to="/" /> : <SignUp />
        } />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <StockList searchTerm={searchTerm} />
          </ProtectedRoute>
        } />
        <Route path="/stock/:symbol" element={
          <ProtectedRoute>
            <StockDetail />
          </ProtectedRoute>
        } />
        <Route path="/portfolio" element={
          <ProtectedRoute>
            <Portfolio />
          </ProtectedRoute>
        } />
        <Route path="/funds" element={
          <ProtectedRoute>
            <Funds />
          </ProtectedRoute>
        } />
        <Route path="/account" element={
          <ProtectedRoute>
            <AccountSettings />
          </ProtectedRoute>
        } />
        <Route path="/help" element={
          <ProtectedRoute>
            <HelpCenter />
          </ProtectedRoute>
        } />

        {/* Catch all - redirect to login or home */}
        <Route path="*" element={
          user ? <Navigate to="/" /> : <Navigate to="/login" />
        } />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;