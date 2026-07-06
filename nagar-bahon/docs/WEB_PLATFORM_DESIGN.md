# Nagar Bahon Web Platform - UI/UX & Architecture

## 1. Web Strategy & User Roles
Unlike the mobile app which is "On-the-Go", the Web platform focuses on **Planning, Management, and Administration**.

| Role | Primary Use Case | Key Features |
| :--- | :--- | :--- |
| **Passenger** | Pre-booking rides from desktop, viewing ride history, managing wallet. | Advanced filtering, Calendar view for recurring rides, Invoice download. |
| **Driver** | Detailed trip planning, earnings analytics, document upload for verification. | Route optimization on large map, Bulk seat management, Payout requests. |
| **Admin** | Full system oversight, dispute resolution, financial auditing. | Heatmaps of demand, User verification queue, Commission settings, Live fleet tracking. |

## 2. Brand Adaptation for Web
*   **Layout**: Clean, dashboard-style layout with a persistent sidebar navigation.
*   **Color Palette**:
    *   **Primary**: Deep Blue (`#1E3A8A`) - Used for Sidebar, Primary Buttons, Headers.
    *   **Secondary**: Vibrant Orange (`#F97316`) - Used for CTAs (Book Now), Notifications, Active States.
    *   **Background**: Light Gray (`#F3F4F6`) - To reduce eye strain on large screens.
*   **Typography**:
    *   English: `Inter` or `Roboto` (Clean, modern sans-serif).
    *   Bengali: `Hind Siliguri` (Highly readable for UI text).

## 3. Key Web-Specific UI Flows

### A. The "Command Center" Map (Passenger/Driver)
Instead of a full-screen map like mobile, the web uses a **Split-View**:
*   **Left Panel (40%)**: Search filters, Ride list cards, Booking details.
*   **Right Panel (60%)**: Interactive Mapbox GL JS map.
*   **Interaction**: Hovering over a ride card highlights the route on the map. Clicking a pin opens a detailed popover with the **Visual Seat Selector**.

### B. Visual Seat Selection (Web Version)
*   **Desktop Experience**: Larger clickable areas, hover states showing "Tooltip" with price before clicking.
*   **Animation**: Smooth CSS transitions when selecting seats.
*   **Layout**: Car diagram centered in a modal with a summary sidebar showing "Selected Seats: 2 | Total: ৳400".

### C. Admin Dashboard
*   **Top Bar**: Global stats (Total Rides Today, Revenue, Active Drivers).
*   **Main Grid**:
    *   **Live Map**: Real-time moving pins of all active cars (WebSocket fed).
    *   **Verification Queue**: List of new drivers pending document approval.
    *   **Financials**: Chart.js graphs showing commission vs. driver earnings.

## 4. Technical Stack Recommendations
*   **Framework**: **Next.js 14 (App Router)** - For SEO (landing pages), Server Side Rendering (fast initial load), and robust API handling.
*   **Language**: **TypeScript** - Strict typing for complex data structures (rides, users).
*   **State Management**: **Zustand** - Lightweight, perfect for managing map state and user session.
*   **Maps**: **Mapbox GL JS** - Superior performance for rendering thousands of points (drivers) on desktop.
*   **UI Library**: **Tailwind CSS** + **Shadcn/UI** - Rapid development, accessible components, easy dark mode support.
*   **Real-time**: **Socket.io-client** - Same backend as mobile.
*   **Charts**: **Recharts** - For admin analytics.

## 5. Folder Structure (Next.js)
```text
web/
├── public/
│   ├── locales/          # i18n JSON files (en.json, bn.json)
│   └── assets/           # Images, SVGs (car diagrams)
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── [lang]/       # Internationalized routing (/en, /bn)
│   │   │   ├── page.tsx  # Landing Page
│   │   │   ├── book/     # Booking Flow
│   │   │   ├── driver/   # Driver Dashboard
│   │   │   └── admin/    # Admin Panel (Protected)
│   │   └── api/          # Internal API routes (if needed)
│   ├── components/
│   │   ├── common/       # Buttons, Inputs, LanguageToggle
│   │   ├── layout/       # Sidebar, Header, DashboardShell
│   │   ├── maps/         # MapboxWrapper, RouteLayer, DriverPin
│   │   ├── booking/      # SeatMap, RideCard, FilterPanel
│   │   └── admin/        # StatsCard, VerificationTable, Heatmap
│   ├── lib/
│   │   ├── i18n.ts       # Translation setup
│   │   ├── socket.ts     # WebSocket client singleton
│   │   └── utils.ts      # CN helpers, formatters
│   ├── store/            # Zustand stores (useRideStore, useUserStore)
│   ├── types/            # TS Interfaces (Ride, User, Seat)
│   └── middleware.ts     # Lang detection & Auth guard
├── next.config.js
└── tailwind.config.ts
```

## 6. Implementation Highlights

### A. Internationalization (i18n)
We will use `next-intl`. The URL structure will be `nagarbahon.com/en/book` or `nagarbahon.com/bn/book`.
*   **Middleware**: Detects user browser language or cookie preference and redirects accordingly.
*   **Server Components**: Translations fetched at build time or request time for SEO.

### B. Real-Time Map Performance
*   **Clustering**: Nearby drivers are clustered into a single pin when zoomed out to prevent lag.
*   **WebSocket Optimization**: Only subscribe to location updates for drivers within the current viewport + 5km buffer.

### C. Security
*   **RBAC (Role Based Access Control)**: Middleware checks if a user accessing `/admin` has the `ADMIN` role.
*   **Sanitization**: All map inputs and chat messages sanitized to prevent XSS.

## 7. Deployment Strategy
*   **Hosting**: Vercel (Frontend) + Dockerized Backend (AWS/DigitalOcean).
*   **CDN**: Cloudflare for static assets and caching translation files.
*   **PWA**: Configure Next.js to be installable as a Progressive Web App for drivers who want an "app-like" experience without downloading.
