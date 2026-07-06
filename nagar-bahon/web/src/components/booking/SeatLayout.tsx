'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { useRideStore } from '@/store/useRideStore';
import SeatMapItem from './SeatMapItem';

interface SeatLayoutProps {
  rideId: string;
  vehicleType?: 'sedan' | 'suv' | 'microbus';
  initialSeats?: Array<{
    id: string;
    row: number;
    column: string;
    status: 'available' | 'booked' | 'blocked';
    price: number;
  }>;
}

const SeatLayout: React.FC<SeatLayoutProps> = ({ 
  vehicleType = 'sedan', 
  initialSeats = [] 
}) => {
  const t = useTranslations('SeatMap');
  const { selectedSeats, hoveredSeatId } = useRideStore();

  // Generate seat layout based on vehicle type
  const seats = useMemo(() => {
    if (initialSeats.length > 0) {
      return initialSeats.map(seat => ({
        ...seat,
        status: selectedSeats.find(s => s.id === seat.id) ? 'selected' : seat.status
      }));
    }

    // Default mock data generation
    const layouts: Record<string, { rows: number; cols: string[] }> = {
      sedan: { rows: 2, cols: ['A', 'B', 'C', 'D'] }, // 4 seater
      suv: { rows: 3, cols: ['A', 'B', 'C', 'D', 'E', 'F'] }, // 6 seater (2+2+2 or 2+3)
      microbus: { rows: 4, cols: ['A', 'B', 'C', 'D'] } // 4 per row
    };

    const layout = layouts[vehicleType];
    const generatedSeats = [];

    for (let row = 1; row <= layout.rows; row++) {
      for (const col of layout.cols) {
        // Randomly mark some seats as booked for demo
        const isBooked = Math.random() < 0.3;
        const isBlocked = Math.random() < 0.1;
        
        generatedSeats.push({
          id: `${vehicleType}-${row}-${col}`,
          row,
          column: col,
          status: isBooked ? 'booked' : isBlocked ? 'blocked' : 'available',
          price: Math.floor(Math.random() * 50) + 100 // Random price 100-150
        });
      }
    }

    return generatedSeats;
  }, [vehicleType, initialSeats, selectedSeats]);

  // Group seats by rows
  const seatsByRow = useMemo(() => {
    return seats.reduce((acc, seat) => {
      if (!acc[seat.row]) acc[seat.row] = [];
      acc[seat.row].push(seat);
      return acc;
    }, {} as Record<number, typeof seats>);
  }, [seats]);

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">{t('selectSeats')}</h2>
        <p className="text-gray-500 text-sm mt-1">{t('instruction')}</p>
      </div>

      {/* Car Diagram Container */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        
        {/* Driver Cabin Indicator */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-900 text-white px-6 py-3 rounded-t-2xl w-3/4 text-center font-semibold shadow-md">
            {t('driverFront')} 🚗
          </div>
        </div>

        {/* Seats Grid */}
        <div className="space-y-4">
          {Object.entries(seatsByRow).map(([rowNum, rowSeats]) => (
            <div key={rowNum} className="flex justify-center gap-3 md:gap-4">
              {rowSeats.map((seat) => (
                <SeatMapItem
                  key={seat.id}
                  {...seat}
                  isHovered={hoveredSeatId === seat.id}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Rear Label */}
        <div className="text-center mt-6 text-gray-400 text-xs uppercase tracking-widest">
          {t('rear')}
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.length > 0 && (
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-center justify-between animate-fade-in">
          <div>
            <p className="font-semibold text-orange-900">
              {selectedSeats.length} {t('seatsSelected')}
            </p>
            <p className="text-sm text-orange-700">
              {selectedSeats.map(s => `${s.column}${s.row}`).join(', ')}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-orange-600">
              ৳{selectedSeats.reduce((sum, s) => sum + s.price, 0)}
            </p>
            <button className="text-sm text-orange-700 underline hover:text-orange-900">
              {t('proceedToBook')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatLayout;
