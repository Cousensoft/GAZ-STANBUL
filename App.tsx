
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout';
import Home from './pages/home/Home';
import Companies from './pages/companies/Companies';
import CompanyProfile from './pages/companies/CompanyProfile';
import Market from './pages/market/Market';
import AllProducts from './pages/market/AllProducts'; 
import MarketStore from './pages/market/MarketStore';
import ProductDetail from './pages/market/ProductDetail';
import Requests from './pages/requests/Requests';
import RequestDetail from './pages/requests/RequestDetail';
import RequestQuote from './pages/requests/RequestQuote';
import Social from './pages/social/Social';
import SocialProfile from './pages/social/SocialProfile'; // Yeni Import
import Dashboard from './pages/dashboard/Dashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import Blog from './pages/blog/Blog';
import BlogPost from './pages/blog/BlogPost';
import Cart from './pages/market/Cart';
import Checkout from './pages/market/Checkout';
import News from './pages/news/News';
import NewsDetail from './pages/news/NewsDetail'; 
import Contact from './pages/contact/Contact';
import Membership from './pages/membership/Membership';
import Sectors from './pages/sectors/Sectors';
import Login from './pages/auth/Login';
import TechnicianLogin from './pages/auth/TechnicianLogin';
import Register from './pages/auth/Register';
import NotFound from './pages/general/NotFound';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { RequestProvider } from './context/RequestContext';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RequestProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/companies" element={<Companies />} />
                <Route path="/company/:id" element={<CompanyProfile />} />
                <Route path="/market" element={<Market />} />
                <Route path="/market/products" element={<AllProducts />} />
                <Route path="/market/store/:id" element={<MarketStore />} />
                <Route path="/market/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/requests/:id" element={<RequestDetail />} />
                <Route path="/create-request" element={<RequestQuote />} />
                <Route path="/social" element={<Social />} />
                <Route path="/social/profile/:username" element={<SocialProfile />} /> {/* Yeni Rota */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:id" element={<BlogPost />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<NewsDetail />} /> 
                <Route path="/services" element={<Home />} />
                <Route path="/sectors" element={<Sectors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/membership" element={<Membership />} />
                <Route path="/login" element={<Login />} />
                <Route path="/login/technician" element={<TechnicianLogin />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </Router>
        </RequestProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
