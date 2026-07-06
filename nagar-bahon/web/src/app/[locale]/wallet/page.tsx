'use client';

import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';

export default function WalletPage() {
  const t = useTranslations('Wallet');
  const navT = useTranslations('Navigation');
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your wallet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{navT('wallet')}</h1>
          <span className="text-sm text-gray-600">Welcome, {user.name}</span>
        </div>
        
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-xl shadow-lg p-6 text-white mb-6">
          <p className="text-sm opacity-90">{t('currentBalance')}</p>
          <p className="text-4xl font-bold mt-2">৳2,500.00</p>
          <button className="mt-4 bg-white text-blue-900 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {t('addMoney')}
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{t('recentTransactions')}</h2>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-800">{t('ridePayment')}</p>
                  <p className="text-sm text-gray-500">Today, 2:30 PM</p>
                </div>
                <span className="font-semibold text-red-600">-৳150.00</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
