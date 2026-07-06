import { create } from 'zustand';

interface Seat {
  id: string;
  row: number;
  column: string; // A, B, C...
  status: 'available' | 'booked' | 'selected' | 'blocked';
  price: number;
}

interface RideStore {
  selectedSeats: Seat[];
  hoveredSeatId: string | null;
  totalPrice: number;
  
  // Actions
  toggleSeatSelection: (seat: Seat) => void;
  setHoveredSeat: (seatId: string | null) => void;
  clearSelection: () => void;
  calculateTotal: () => number;
}

export const useRideStore = create<RideStore>((set, get) => ({
  selectedSeats: [],
  hoveredSeatId: null,
  totalPrice: 0,

  toggleSeatSelection: (seat) => {
    const { selectedSeats } = get();
    
    if (seat.status === 'booked' || seat.status === 'blocked') return;

    const isSelected = selectedSeats.find(s => s.id === seat.id);
    
    if (isSelected) {
      // Remove from selection
      set({ 
        selectedSeats: selectedSeats.filter(s => s.id !== seat.id),
        totalPrice: get().calculateTotal() - seat.price
      });
    } else {
      // Add to selection (max 4 seats per booking limit can be enforced here)
      set({ 
        selectedSeats: [...selectedSeats, seat],
        totalPrice: get().calculateTotal() + seat.price
      });
    }
  },

  setHoveredSeat: (seatId) => set({ hoveredSeatId: seatId }),

  clearSelection: () => set({ selectedSeats: [], totalPrice: 0, hoveredSeatId: null }),

  calculateTotal: () => {
    return get().selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  },
}));
