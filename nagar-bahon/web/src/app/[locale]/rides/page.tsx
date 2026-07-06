'use client';

import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/useAuthStore';

export default function MyRidesPage() {
  const t = useTranslations('Navigation');
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Please Login</h1>
          <p className="text-gray-600 mb-6">You need to be logged in to view your rides</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">{t('myRides')}</h1>
          <span className="text-sm text-gray-600">Welcome, {user.name}</span>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">Ride #{1000 + i}</h3>
                  <p className="text-sm text-gray-600 mt-1">Dhaka → Chittagong</p>
                  <p className="text-sm text-gray-500 mt-1">Today, 2:30 PM</p>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
