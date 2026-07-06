import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'passenger' | 'driver' | 'admin';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, phone: string, password: string, role: 'passenger' | 'driver') => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login with different roles based on email for demo
    let role: 'passenger' | 'driver' | 'admin' = 'passenger';
    let name = 'John Doe';
    let phone = '+880 1712-345678';

    if (email.includes('admin')) {
      role = 'admin';
      name = 'Admin User';
      phone = '+880 1712-999999';
    } else if (email.includes('driver')) {
      role = 'driver';
      name = 'Driver User';
      phone = '+880 1712-888888';
    }

    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role
    };
    
    set({ user: mockUser, isAuthenticated: true });
  },
  signup: async (name: string, email: string, phone: string, password: string, role: 'passenger' | 'driver') => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock signup - in production, this would be a real API call
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      role
    };
    
    set({ user: mockUser, isAuthenticated: true });
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  }
}));
