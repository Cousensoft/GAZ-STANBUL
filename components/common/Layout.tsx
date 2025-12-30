
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  // Automatically scroll to top whenever the pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Hide layout elements for specific pages that have their own custom navigation
  const hideLayout = 
    location.pathname === '/login' || 
    location.pathname === '/register' || 
    location.pathname === '/social' ||
    location.pathname === '/cart' ||
    location.pathname.startsWith('/market') ||
    location.pathname.startsWith('/dashboard') ||
    location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default Layout;
