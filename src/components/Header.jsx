import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigation = [
    { path: '/', label: 'Главная' },
    { path: '/chat', label: 'AI Ассистент' },
    { path: '/events', label: 'Мероприятия' },
    { path: '/calendar', label: 'Календарь' },
  ];

  const NavLink = ({ to, children }) => (
    <Link 
      to={to}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive(to) 
          ? 'bg-gradient-to-r from-rose-400 to-amber-400 text-white shadow-lg' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 p-[2px] transition-transform duration-200 group-hover:scale-110">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    d="M12 20V10M12 10L7 6M12 10L17 6" 
                    stroke="url(#grad1)" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
              FamilyAI
            </span>
          </Link>

          {/* Навигация */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigation.map(({ path, label }) => (
              <NavLink key={path} to={path}>{label}</NavLink>
            ))}
          </nav>

          {/* Мобильное меню */}
          <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Профиль */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/profile"
              className={`w-10 h-10 rounded-full bg-gradient-to-r from-rose-400 to-amber-400 p-[2px] hover:scale-105 transition-transform duration-200 ${
                isActive('/profile') ? 'scale-105 shadow-lg' : ''
              }`}
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="url(#grad1)" strokeWidth="2">
                  <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Градиенты */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>
      </svg>
    </header>
  );
};

export default Header; 