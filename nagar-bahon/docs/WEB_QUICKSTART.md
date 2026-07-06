# Nagar Bahon Web - Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Mapbox Access Token (get free token from mapbox.com)
- Backend API running (from the main backend folder)

## Installation Steps

### 1. Navigate to Web Directory
```bash
cd /workspace/nagar-bahon/web
```

### 2. Initialize Next.js Project
```bash
npm init -y
npm install next@latest react@latest react-dom@latest
npm install next-intl mapbox-gl zustand socket.io-client
npm install -D typescript @types/node @types/react @types/mapbox-gl tailwindcss postcss autoprefixer
```

### 3. Setup TypeScript
Create `tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 4. Setup Tailwind CSS
Run: `npx tailwindcss init -p`

Update `tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A', // Deep Blue
        secondary: '#F97316', // Vibrant Orange
      },
      fontFamily: {
        sans: ['Inter', 'Hind Siliguri', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
```

### 5. Add Google Fonts
Create `src/app/layout.tsx` and add font imports in CSS.

### 6. Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_WS_URL=ws://localhost:3001
```

### 7. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

## Key Components Created

### Booking Flow
- **SeatLayout.tsx** - Main seat selection container with vehicle type support
- **SeatMapItem.tsx** - Individual seat component with hover/selection states
- **useRideStore.ts** - Zustand store for managing seat selection state

### Maps
- **NagarMap.tsx** - Interactive Mapbox map with live driver markers

### Internationalization
- **LanguageToggle.tsx** - EN/বাংলা language switcher
- **en.json & bn.json** - Complete translation files
- **middleware.ts** - Automatic locale detection and routing

## Usage Examples

### Using Seat Layout Component
```tsx
import SeatLayout from '@/components/booking/SeatLayout';

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SeatLayout 
        rideId="ride_123"
        vehicleType="suv"
      />
    </div>
  );
}
```

### Using Map Component
```tsx
import NagarMap from '@/components/maps/NagarMap';

export default function SearchPage() {
  const drivers = [
    {
      id: 'driver_1',
      coordinates: [90.4125, 23.8103] as [number, number],
      heading: 45,
      availableSeats: 3,
      destination: 'Gulshan'
    }
  ];

  return (
    <div className="h-screen w-screen">
      <NagarMap
        accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
        driverLocations={drivers}
        onDriverClick={(id) => console.log('Clicked:', id)}
      />
    </div>
  );
}
```

### Using Language Toggle
```tsx
import LanguageToggle from '@/components/common/LanguageToggle';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <h1>Nagar Bahon</h1>
      <LanguageToggle />
    </header>
  );
}
```

## Folder Structure Summary
```
web/
├── public/locales/       # Translation files (en.json, bn.json)
├── src/
│   ├── app/[lang]/       # Internationalized pages
│   ├── components/
│   │   ├── booking/      # Seat selection UI
│   │   ├── maps/         # Mapbox integration
│   │   └── common/       # Reusable components (LanguageToggle)
│   ├── lib/              # Utilities (i18n config)
│   ├── store/            # Zustand state management
│   └── middleware.ts     # Locale routing
└── tailwind.config.ts    # Brand colors & fonts
```

## Next Steps
1. Connect to your backend API endpoints
2. Implement authentication (NextAuth.js recommended)
3. Add payment gateway integration
4. Build admin dashboard with charts (Recharts)
5. Deploy to Vercel for production

## Support
For issues or questions, refer to:
- Next.js Docs: https://nextjs.org/docs
- Mapbox GL JS: https://docs.mapbox.com/mapbox-gl-js/guides/
- next-intl: https://next-intl-docs.vercel.app
