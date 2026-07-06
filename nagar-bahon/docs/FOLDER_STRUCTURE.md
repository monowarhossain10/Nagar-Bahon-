# Nagar Bahon - Project Folder Structure

## Recommended Tech Stack
- **Frontend**: Flutter (for cross-platform with excellent i18n support)
- **Backend**: Node.js with Express (or Python FastAPI)
- **Database**: PostgreSQL with PostGIS
- **Real-time**: Socket.io
- **Maps**: Mapbox GL

---

## Backend Folder Structure (Node.js/Express)

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js          # Database connection & PostGIS setup
│   │   ├── redis.js             # Redis for caching & sessions
│   │   ├── socket.js            # Socket.io configuration
│   │   ├── mapbox.js            # Mapbox API configuration
│   │   └── payment.js           # Payment gateway configs (bKash, Nagad, SSLCommerz)
│   │
│   ├── controllers/
│   │   ├── authController.js    # Authentication logic
│   │   ├── userController.js    # User profile & wallet
│   │   ├── vehicleController.js # Vehicle CRUD
│   │   ├── rideController.js    # Ride management & nearby search
│   │   ├── bookingController.js # Seat booking logic
│   │   ├── seatController.js    # Seat availability & selection
│   │   ├── paymentController.js # Payment processing
│   │   ├── chatController.js    # In-app messaging
│   │   ├── reviewController.js  # Ratings & reviews
│   │   └── adminController.js   # Admin dashboard
│   │
│   ├── middleware/
│   │   ├── auth.js              # JWT verification
│   │   ├── rateLimiter.js       # API rate limiting
│   │   ├── validation.js        # Request validation
│   │   ├── errorHandler.js      # Global error handling
│   │   ├── language.js          # Language detection & injection
│   │   └── upload.js            # File upload handling
│   │
│   ├── models/
│   │   ├── User.js              # User model
│   │   ├── Vehicle.js           # Vehicle model
│   │   ├── Ride.js              # Ride model
│   │   ├── Seat.js              # Seat model
│   │   ├── Booking.js           # Booking model
│   │   ├── Transaction.js       # Transaction model
│   │   ├── Review.js            # Review model
│   │   ├── ChatMessage.js       # Chat message model
│   │   └── index.js             # Model associations
│   │
│   ├── routes/
│   │   ├── index.js             # Main router
│   │   ├── auth.routes.js       # Auth endpoints
│   │   ├── user.routes.js       # User endpoints
│   │   ├── vehicle.routes.js    # Vehicle endpoints
│   │   ├── ride.routes.js       # Ride endpoints
│   │   ├── booking.routes.js    # Booking endpoints
│   │   ├── payment.routes.js    # Payment endpoints
│   │   ├── chat.routes.js       # Chat endpoints
│   │   └── admin.routes.js      # Admin endpoints
│   │
│   ├── services/
│   │   ├── emailService.js      # Email notifications
│   │   ├── smsService.js        # SMS/OTP service
│   │   ├── locationService.js   # Geospatial calculations
│   │   ├── matchingService.js   # Smart ride matching algorithm
│   │   ├── pricingService.js    # Fare calculation & surge pricing
│   │   ├── notificationService.js # Push notifications
│   │   └── paymentService.js    # Payment gateway integration
│   │
│   ├── utils/
│   │   ├── jwt.js               # JWT utilities
│   │   ├── encryption.js        # Password hashing
│   │   ├── validators.js        # Custom validators
│   │   ├── constants.js         # App constants
│   │   ├── logger.js            # Logging configuration
│   │   └── helpers.js           # Helper functions
│   │
│   ├── jobs/
│   │   ├── rideExpiryJob.js     # Cancel expired rides
│   │   ├── cleanupJob.js        # Database cleanup
│   │   └── analyticsJob.js      # Daily analytics aggregation
│   │
│   └── app.js                   # Express app setup
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── fixtures/
│
├── .env.example
├── .env
├── .gitignore
├── package.json
├── server.js                    # Entry point
└── README.md
```

---

## Frontend Folder Structure (Flutter)

```
mobile/
├── lib/
│   ├── main.dart                # App entry point
│   │
│   ├── core/
│   │   ├── constants/
│   │   │   ├── app_constants.dart
│   │   │   ├── api_constants.dart
│   │   │   └── asset_constants.dart
│   │   │
│   │   ├── theme/
│   │   │   ├── app_theme.dart   # Theme data (colors, fonts)
│   │   │   ├── colors.dart      # Color palette
│   │   │   └── text_styles.dart # Typography
│   │   │
│   │   ├── utils/
│   │   │   ├── validators.dart
│   │   │   ├── formatters.dart  # Date, currency, phone
│   │   │   └── helpers.dart
│   │   │
│   │   └── errors/
│   │       ├── exceptions.dart
│   │       └── failures.dart
│   │
│   ├── l10n/
│   │   ├── app_localizations.dart
│   │   ├── app_localizations_en.dart
│   │   ├── app_localizations_bn.dart
│   │   └── l10n.yaml
│   │
│   ├── config/
│   │   ├── routes.dart          # App routing
│   │   ├── dependencies.dart    # Dependency injection
│   │   └── environment.dart     # Environment config
│   │
│   ├── data/
│   │   ├── models/
│   │   │   ├── user_model.dart
│   │   │   ├── vehicle_model.dart
│   │   │   ├── ride_model.dart
│   │   │   ├── seat_model.dart
│   │   │   ├── booking_model.dart
│   │   │   └── transaction_model.dart
│   │   │
│   │   ├── repositories/
│   │   │   ├── auth_repository.dart
│   │   │   ├── user_repository.dart
│   │   │   ├── ride_repository.dart
│   │   │   ├── booking_repository.dart
│   │   │   └── payment_repository.dart
│   │   │
│   │   └── sources/
│   │       ├── remote/
│   │       │   ├── api_client.dart
│   │       │   ├── auth_api.dart
│   │       │   ├── ride_api.dart
│   │       │   └── booking_api.dart
│   │       └── local/
│   │           ├── cache_helper.dart
│   │           └── secure_storage.dart
│   │
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── user.dart
│   │   │   ├── ride.dart
│   │   │   └── booking.dart
│   │   │
│   │   ├── repositories/
│   │   │   ├── auth_repository.dart
│   │   │   └── ride_repository.dart
│   │   │
│   │   └── usecases/
│   │       ├── auth/
│   │       │   ├── login_usecase.dart
│   │       │   └── register_usecase.dart
│   │       ├── ride/
│   │       │   ├── get_nearby_rides.dart
│   │       │   └── create_ride.dart
│   │       └── booking/
│   │           ├── book_seats.dart
│   │           └── cancel_booking.dart
│   │
│   ├── presentation/
│   │   ├── providers/
│   │   │   ├── auth_provider.dart
│   │   │   ├── language_provider.dart
│   │   │   ├── location_provider.dart
│   │   │   ├── ride_provider.dart
│   │   │   └── booking_provider.dart
│   │   │
│   │   ├── screens/
│   │   │   ├── splash/
│   │   │   │   └── splash_screen.dart
│   │   │   │
│   │   │   ├── onboarding/
│   │   │   │   ├── onboarding_screen.dart
│   │   │   │   └── page_content.dart
│   │   │   │
│   │   │   ├── auth/
│   │   │   │   ├── login_screen.dart
│   │   │   │   ├── register_screen.dart
│   │   │   │   └── otp_verification_screen.dart
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── home_screen.dart
│   │   │   │   └── map_view_screen.dart
│   │   │   │
│   │   │   ├── ride/
│   │   │   │   ├── nearby_rides_screen.dart
│   │   │   │   ├── ride_details_screen.dart
│   │   │   │   ├── seat_selection_screen.dart
│   │   │   │   └── create_ride_screen.dart
│   │   │   │
│   │   │   ├── booking/
│   │   │   │   ├── booking_confirmation_screen.dart
│   │   │   │   ├── booking_details_screen.dart
│   │   │   │   └── my_bookings_screen.dart
│   │   │   │
│   │   │   ├── tracking/
│   │   │   │   └── live_tracking_screen.dart
│   │   │   │
│   │   │   ├── wallet/
│   │   │   │   ├── wallet_screen.dart
│   │   │   │   └── add_money_screen.dart
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   └── chat_screen.dart
│   │   │   │
│   │   │   ├── profile/
│   │   │   │   ├── profile_screen.dart
│   │   │   │   ├── edit_profile_screen.dart
│   │   │   │   └── settings_screen.dart
│   │   │   │
│   │   │   └── rent_car/
│   │   │       └── rent_car_screen.dart
│   │   │
│   │   └── widgets/
│   │       ├── common/
│   │       │   ├── app_button.dart
│   │       │   ├── app_text_field.dart
│   │       │   ├── loading_indicator.dart
│   │       │   └── error_widget.dart
│   │       │
│   │       ├── map/
│   │       │   ├── map_widget.dart
│   │       │   ├── car_marker.dart
│   │       │   └── route_polyline.dart
│   │       │
│   │       ├── ride/
│   │       │   ├── ride_card.dart
│   │       │   ├── driver_info_card.dart
│   │       │   └── route_summary.dart
│   │       │
│   │       ├── seat/
│   │       │   ├── seat_layout.dart
│   │       │   ├── seat_widget.dart
│   │       │   └── seat_legend.dart
│   │       │
│   │       ├── booking/
│   │       │   ├── booking_card.dart
│   │       │   └── fare_breakdown.dart
│   │       │
│   │       └── language/
│   │           └── language_toggle.dart
│   │
│   └── services/
│       ├── location_service.dart
│       ├── notification_service.dart
│       ├── socket_service.dart
│       └── payment_service.dart
│
├── assets/
│   ├── images/
│   │   ├── logo.png
│   │   ├── logo_dark.png
│   │   ├── onboarding_1.svg
│   │   ├── onboarding_2.svg
│   │   ├── onboarding_3.svg
│   │   └── illustrations/
│   │
│   ├── icons/
│   │   ├── car_icon.svg
│   │   ├── seat_icon.svg
│   │   └── location_icon.svg
│   │
│   └── fonts/
│       ├── Poppins-Regular.ttf
│       ├── Poppins-Bold.ttf
│       ├── HindSiliguri-Regular.ttf
│       └── HindSiliguri-Bold.ttf
│
├── test/
│   ├── unit/
│   ├── widget/
│   └── integration/
│
├── android/
│   ├── app/
│   │   ├── src/
│   │   │   └── main/
│   │   │       ├── AndroidManifest.xml
│   │   │       ├── res/
│   │   │       └── kotlin/
│   │   └── build.gradle
│   └── build.gradle
│
├── ios/
│   ├── Runner/
│   │   ├── AppDelegate.swift
│   │   ├── Info.plist
│   │   └── Assets.xcassets/
│   └── Podfile
│
├── .env
├── .gitignore
├── pubspec.yaml
├── analysis_options.yaml
└── README.md
```

---

## Web Admin Panel (Optional - React)

```
admin-web/
├── src/
│   ├── components/
│   │   ├── Dashboard/
│   │   ├── Users/
│   │   ├── Rides/
│   │   ├── Bookings/
│   │   ├── Vehicles/
│   │   ├── Payments/
│   │   └── Settings/
│   │
│   ├── pages/
│   ├── services/
│   ├── hooks/
│   ├── context/
│   └── utils/
│
├── public/
├── package.json
└── README.md
```

---

## Key Files Explained

### Backend

#### `src/config/database.js`
PostgreSQL connection with PostGIS extension initialization.

#### `src/services/matchingService.js`
Core algorithm for matching passengers with drivers based on:
- Route similarity
- Pickup/dropoff proximity
- Time windows
- Available seats

#### `src/controllers/rideController.js`
Handles nearby rides search using PostGIS queries.

### Frontend

#### `lib/l10n/app_localizations.dart`
Flutter internationalization setup for EN/BN switching.

#### `lib/presentation/widgets/seat/seat_layout.dart`
Visual seat selection component with animations.

#### `lib/presentation/screens/home/map_view_screen.dart`
Mapbox integration showing nearby drivers.

#### `lib/presentation/providers/language_provider.dart`
Riverpod/Provider state management for language toggle.

---

## Development Workflow

### Backend
```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Run migrations
npm run migrate

# Start development server
npm run dev

# Run tests
npm test
```

### Frontend
```bash
# Install dependencies
flutter pub get

# Generate localizations
flutter gen-l10n

# Run on device
flutter run

# Build APK
flutter build apk --release

# Build iOS
flutter build ios --release
```

---

## Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/nagar_bahon
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d

# Mapbox
MAPBOX_ACCESS_TOKEN=pk.your_token

# Payment Gateways
BKASH_MERCHANT_ID=xxx
BKASH_APP_KEY=xxx
NAGAD_MERCHANT_ID=xxx
SSL_STORE_ID=xxx

# SMS
TWILIO_SID=xxx
TWILIO_TOKEN=xxx

# File Upload
AWS_BUCKET=nagar-bahon-uploads
AWS_REGION=ap-southeast-1
```

### Frontend (.env)
```env
API_BASE_URL=http://localhost:3000/api/v1
MAPBOX_ACCESS_TOKEN=pk.your_token
APP_NAME=Nagar Bahon
APP_VERSION=1.0.0
```

---

## CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test

  flutter-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Flutter
        uses: subosito/flutter-action@v2
        with:
          flutter-version: '3.16.0'
      - run: flutter pub get
      - run: flutter test

  build-android:
    needs: [backend-test, flutter-test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build APK
        run: |
          cd mobile
          flutter build apk --release
```

---

This structure ensures:
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Testability
- ✅ Clear organization
- ✅ Easy onboarding for new developers
- ✅ Bilingual support throughout
- ✅ Location-based features optimized
