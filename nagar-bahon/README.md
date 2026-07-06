# Nagar Bahon (নগর বাহন) - Complete Project Documentation

## 🚗 Overview

**Nagar Bahon** is a bilingual (Bengali & English) ride-sharing and rent-a-car mobile application designed for city commuters. The app operates on a unique **seat-based ride-sharing model** (carpooling) alongside traditional car rental options.

### Tagline
- **Bengali**: নগর বাহন - শহরের প্রতিটি গন্তব্যে আপনার সঙ্গী
- **English**: Nagar Bahon: Smart Sharing for Every City Journey

---

## 📋 Table of Contents

1. [Core Features](#core-features)
2. [Tech Stack](#tech-stack)
3. [Database Schema](#database-schema)
4. [API Endpoints](#api-endpoints)
5. [UI/UX Design](#uiux-design)
6. [Folder Structure](#folder-structure)
7. [Code Implementation](#code-implementation)
8. [Getting Started](#getting-started)

---

## ✨ Core Features

### For Passengers
- **Nearby Radar Map**: Real-time view of available rides in vicinity
- **Visual Seat Selection**: Cinema-style seat booking interface
- **Smart Matching**: Algorithm matches routes with minimal detour
- **Multi-seat Booking**: Book 1 or more seats per ride
- **Wallet Integration**: Digital wallet with bKash, Nagad, Card support
- **Live Tracking**: Track driver location in real-time
- **In-app Chat & Call**: Masked numbers for privacy
- **Rent-a-Car**: Option to book entire vehicle hourly/daily

### For Drivers
- **Create Rides**: Post trips with route, time, and price per seat
- **Seat Management**: Control available seats visually
- **Earnings Dashboard**: Track income and commissions
- **Ride History**: Complete trip history
- **Verification System**: Document upload for trust

### Unique Selling Points (USP)
1. **Seat-Based Sharing**: Pay only for seats you need
2. **Bilingual Interface**: Seamless Bengali/English toggle
3. **Location-Based Services**: Advanced geospatial matching
4. **Community-Driven**: Build trust through ratings and reviews
5. **Cost-Effective**: Split fares make commuting affordable

---

## 🛠 Tech Stack

### Frontend (Mobile)
- **Framework**: Flutter 3.x (Cross-platform iOS/Android)
- **State Management**: Riverpod / Provider
- **Maps**: Mapbox GL (cost-effective alternative to Google Maps)
- **Localization**: Flutter i18n (l10n)
- **Real-time**: Socket.io Client
- **HTTP Client**: Dio

### Backend
- **Runtime**: Node.js 18+ with Express.js
- **Language**: TypeScript (recommended) or JavaScript
- **Database**: PostgreSQL 15+ with PostGIS extension
- **ORM**: Prisma or Sequelize
- **Cache**: Redis
- **Real-time**: Socket.io
- **Authentication**: JWT
- **File Storage**: AWS S3 or Cloudinary

### Infrastructure
- **Cloud**: AWS / DigitalOcean / Google Cloud
- **CI/CD**: GitHub Actions
- **Monitoring**: Sentry, LogRocket
- **Analytics**: Firebase Analytics / Mixpanel

---

## 🗄 Database Schema

See full schema in [`docs/DATABASE_SCHEMA.md`](docs/DATABASE_SCHEMA.md)

### Key Tables
- **users**: Passenger, Driver, Admin accounts with wallet
- **vehicles**: Car details, verification, rental pricing
- **rides**: Trip information with origin/destination (PostGIS)
- **seats**: Individual seat tracking with status
- **bookings**: Seat reservations and payment
- **transactions**: Wallet and payment records
- **reviews**: Ratings and feedback

### PostGIS Integration
```sql
-- Find nearby rides within 5km
SELECT * FROM rides
WHERE ST_DWithin(
  origin_location,
  ST_MakePoint($lon, $lat)::geography,
  5000
);
```

---

## 🔌 API Endpoints

Full API documentation in [`docs/API_ENDPOINTS.md`](docs/API_ENDPOINTS.md)

### Key Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/register` | User registration |
| GET | `/rides/nearby` | Find nearby available rides |
| POST | `/rides/match` | Smart matching algorithm |
| GET | `/rides/:id/seats` | Get visual seat layout |
| POST | `/bookings` | Book seat(s) |
| GET | `/users/me/wallet` | Wallet balance |
| POST | `/users/me/wallet/topup` | Add money to wallet |
| WS | `/ws` | Real-time WebSocket connection |

---

## 🎨 UI/UX Design

Complete design guide in [`docs/UI_UX_DESIGN.md`](docs/UI_UX_DESIGN.md)

### Brand Colors
- **Deep Blue**: `#1E3A8A` (Primary - Trust)
- **Vibrant Orange**: `#F97316` (Accent - Energy)
- **Teal**: `#14B8A6` (Success/Available)
- **Gray Scale**: For neutral elements

### Typography
- **English**: Poppins (headings), Inter (body)
- **Bengali**: Hind Siliguri (all text)

### Key Screens
1. **Splash Screen**: Bilingual tagline display
2. **Onboarding**: 3-slide introduction
3. **Map View**: Nearby rides radar
4. **Seat Selection**: Visual seat picker
5. **Booking Confirmation**: Summary & payment
6. **Live Tracking**: Real-time driver location
7. **Wallet**: Balance & transactions
8. **Profile**: Settings & language toggle

---

## 📁 Folder Structure

Detailed structure in [`docs/FOLDER_STRUCTURE.md`](docs/FOLDER_STRUCTURE.md)

### Backend Structure
```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── utils/
└── tests/
```

### Mobile Structure
```
mobile/
├── lib/
│   ├── core/
│   │   ├── theme/
│   │   └── constants/
│   ├── l10n/
│   ├── data/
│   │   ├── models/
│   │   └── repositories/
│   ├── domain/
│   └── presentation/
│       ├── screens/
│       ├── widgets/
│       └── providers/
└── assets/
```

---

## 💻 Code Implementation

### Implemented Components

#### 1. Bilingual Support (i18n)
Files created:
- `mobile/lib/l10n/app_localizations.dart`
- `mobile/lib/l10n/app_localizations_en.dart`
- `mobile/lib/l10n/app_localizations_bn.dart`

Features:
- 150+ translatable strings
- Runtime language switching
- Bengali font support

#### 2. Visual Seat Selection
Files created:
- `mobile/lib/presentation/widgets/seat/seat_layout.dart`
- `mobile/lib/presentation/widgets/seat/seat_widget.dart`
- `mobile/lib/presentation/widgets/seat/seat_legend.dart`
- `mobile/lib/data/models/seat_model.dart`

Features:
- Interactive seat map (Sedan/SUV/Microbus layouts)
- Multiple selection support
- Real-time price calculation
- Animated transitions
- Tooltip on long-press

#### 3. Brand Colors
File: `mobile/lib/core/theme/colors.dart`

---

## 🚀 Getting Started

### Prerequisites
- Flutter SDK 3.16+
- Node.js 18+
- PostgreSQL 15+ with PostGIS
- Redis
- Mapbox Access Token
- Payment Gateway Accounts (bKash, Nagad, SSLCommerz)

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Setup database
createdb nagar_bahon
psql -d nagar_bahon -c "CREATE EXTENSION postgis;"

# Run migrations
npm run migrate

# Start development server
npm run dev
```

### Mobile Setup

```bash
cd mobile

# Get dependencies
flutter pub get

# Generate localizations
flutter gen-l10n

# Run on device
flutter run

# Build release APK
flutter build apk --release

# Build iOS
flutter build ios --release
```

### Environment Variables

#### Backend (.env)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/nagar_bahon
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
MAPBOX_ACCESS_TOKEN=pk.your_token
BKASH_MERCHANT_ID=xxx
NAGAD_MERCHANT_ID=xxx
```

#### Mobile (.env)
```env
API_BASE_URL=http://localhost:3000/api/v1
MAPBOX_ACCESS_TOKEN=pk.your_token
```

---

## 📱 User Flow

### Passenger Journey
1. **Onboard** → Select language → Register/Login
2. **Home** → View map with nearby rides
3. **Search** → Enter destination → See matched rides
4. **Select** → Choose ride → Pick seats visually
5. **Book** → Confirm pickup/dropoff → Pay via wallet
6. **Track** → Monitor driver location → Receive ETA
7. **Ride** → Meet driver → Complete trip
8. **Review** → Rate driver → Add review

### Driver Journey
1. **Register** → Submit documents → Get verified
2. **Add Vehicle** → Upload details & photos
3. **Create Ride** → Set route, time, price per seat
4. **Manage** → Accept/reject requests
5. **Drive** → Navigate route → Pick up passengers
6. **Complete** → Finish trip → Receive payment
7. **Withdraw** → Transfer earnings to bank

---

## 🔐 Security Features

- JWT authentication with refresh tokens
- Password hashing (bcrypt)
- Masked phone numbers for calls
- Encrypted payment data
- Rate limiting on APIs
- Input validation & sanitization
- HTTPS enforcement
- Secure file uploads

---

## 📊 Monetization

1. **Commission**: 15% per successful ride
2. **Premium Listings**: Featured rides for drivers
3. **Subscription**: Monthly plans for frequent riders
4. **Advertising**: Local business promotions
5. **Corporate Partnerships**: Employee commute programs

---

## 🗺 Roadmap

### Phase 1 (MVP) - Month 1-2
- ✅ Core architecture
- ✅ Database design
- ⏳ Basic ride posting & booking
- ⏳ Seat selection UI
- ⏳ Payment integration

### Phase 2 - Month 3-4
- Live tracking
- In-app chat
- Reviews & ratings
- Admin dashboard

### Phase 3 - Month 5-6
- Rent-a-car module
- Subscription plans
- Referral program
- Multi-city expansion

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📄 License

This project is proprietary software. All rights reserved.

---

## 📞 Contact

For inquiries:
- Email: info@nagarbahon.com
- Website: www.nagarbahon.com
- Address: Dhaka, Bangladesh

---

## 🙏 Acknowledgments

- Mapbox for mapping services
- Flutter community for excellent tools
- Bangladesh startup ecosystem for inspiration

---

**Built with ❤️ for the people of Bangladesh**

নগর বাহন - শহরের প্রতিটি গন্তব্যে আপনার সঙ্গী
