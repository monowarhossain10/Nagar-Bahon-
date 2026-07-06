'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import LanguageToggle from './LanguageToggle';

const Navigation: React.FC = () => {
  const t = useTranslations('Navigation');
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('home'), path: '/' },
    { id: 'bookRide', label: t('bookRide'), path: '/book' },
    { id: 'myRides', label: t('myRides'), path: '/rides' },
    { id: 'wallet', label: t('wallet'), path: '/wallet' },
    { id: 'profile', label: t('profile'), path: '/profile' },
  ];

  // Only show admin link for admin users
  if (isAuthenticated && user?.role === 'admin') {
    navItems.push({ id: 'admin', label: t('admin'), path: '/admin' });
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="bg-blue-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => router.push('/')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img src="/logo.svg" alt="Nagar Bahon Logo" className="h-10 w-auto" />
              <span className="text-xl font-bold">Nagar Bahon</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                  ${pathname === item.path 
                    ? 'bg-white text-blue-900 shadow-md' 
                    : 'hover:bg-blue-800'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="ml-4 flex items-center space-x-2">
                  <span className="text-sm text-gray-300">
                    {user?.name}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="ml-4 flex items-center space-x-2">
                <button
                  onClick={() => router.push('/login')}
                  className="px-4 py-2 bg-white text-blue-900 hover:bg-gray-100 rounded-lg text-sm font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => router.push('/signup')}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign Up
                </button>
              </div>
            )}
            
            <div className="ml-4">
              <LanguageToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 border-t border-blue-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  router.push(item.path);
                  setIsMenuOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${pathname === item.path 
                    ? 'bg-white text-blue-900' 
                    : 'hover:bg-blue-700'
                  }
                `}
              >
                {item.label}
              </button>
            ))}
            
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 text-sm text-gray-300">
                  {user?.name}
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    router.push('/login');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-white text-blue-900 hover:bg-gray-100 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    router.push('/signup');
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium bg-orange-500 hover:bg-orange-600 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
