'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useRideStore } from '@/store/useRideStore';

interface SeatProps {
  id: string;
  row: number;
  column: string;
  status: 'available' | 'booked' | 'selected' | 'blocked';
  price: number;
  isHovered?: boolean;
}

const SeatMapItem: React.FC<SeatProps> = ({ 
  id, 
  status, 
  column, 
  row, 
  price,
  isHovered 
}) => {
  const t = useTranslations('SeatMap');
  const { toggleSeatSelection, setHoveredSeat } = useRideStore();

  const getStatusColor = () => {
    switch (status) {
      case 'available':
        return 'bg-emerald-100 border-emerald-500 hover:bg-emerald-200 cursor-pointer';
      case 'booked':
        return 'bg-red-100 border-red-300 cursor-not-allowed opacity-60';
      case 'selected':
        return 'bg-orange-500 border-orange-600 cursor-pointer shadow-lg scale-105';
      case 'blocked':
        return 'bg-gray-200 border-gray-300 cursor-not-allowed';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getTooltipText = () => {
    if (status === 'booked') return t('booked');
    if (status === 'blocked') return t('blocked');
    if (status === 'selected') return `${t('selected')} - ৳${price}`;
    return `${t('available')} - ৳${price}`;
  };

  const handleClick = () => {
    if (status !== 'available' && status !== 'selected') return;
    toggleSeatSelection({ id, row, column, status: status === 'selected' ? 'available' : 'selected', price });
  };

  return (
    <div
      role="button"
      tabIndex={status === 'available' || status === 'selected' ? 0 : -1}
      aria-label={`${t('seat')} ${column}${row} - ${getTooltipText()}`}
      className={`
        relative w-12 h-14 md:w-16 md:h-20 
        border-2 rounded-t-xl rounded-b-md 
        flex items-center justify-center 
        transition-all duration-200 ease-in-out
        ${getStatusColor()}
        ${isHovered ? 'ring-2 ring-blue-400 z-10' : ''}
      `}
      onClick={handleClick}
      onMouseEnter={() => setHoveredSeat(id)}
      onMouseLeave={() => setHoveredSeat(null)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* Seat Number/Label */}
      <span className={`text-sm md:text-base font-bold ${
        status === 'selected' ? 'text-white' : 'text-gray-700'
      }`}>
        {column}{row}
      </span>

      {/* Price Badge (only on hover for available seats) */}
      {status === 'available' && isHovered && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-20">
          ৳{price}
        </div>
      )}

      {/* Selected Indicator */}
      {status === 'selected' && (
        <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default SeatMapItem;
