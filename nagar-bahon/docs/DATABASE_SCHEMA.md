# Nagar Bahon - Database Schema

## Overview
This schema supports the seat-based ride-sharing model with bilingual support, location-based services, and wallet integration.

## Technology Stack
- **Database**: PostgreSQL with PostGIS extension for geospatial queries
- **ORM**: Sequelize or Prisma (Node.js) / SQLAlchemy (Python)

---

## 1. Users Table
Stores all user accounts (Passengers, Drivers, Admins)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    
    -- Role Management
    role VARCHAR(20) NOT NULL CHECK (role IN ('passenger', 'driver', 'admin')),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_documents JSONB, -- For driver license, NID, etc.
    
    -- Profile
    profile_image_url VARCHAR(500),
    preferred_language VARCHAR(5) DEFAULT 'en' CHECK (preferred_language IN ('en', 'bn')),
    rating DECIMAL(3,2) DEFAULT 0.00,
    total_rides INTEGER DEFAULT 0,
    
    -- Location (for nearby matching)
    current_location GEOGRAPHY(POINT, 4326),
    last_active_at TIMESTAMP WITH TIME ZONE,
    
    -- Wallet
    wallet_balance DECIMAL(10,2) DEFAULT 0.00,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Index for location-based queries
CREATE INDEX idx_users_location ON users USING GIST (current_location);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_phone ON users(phone);
```

---

## 2. Vehicles Table
Stores vehicle information for drivers

```sql
CREATE TABLE vehicles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Vehicle Details
    make VARCHAR(100) NOT NULL,
    model VARCHAR(100) NOT NULL,
    year INTEGER,
    color VARCHAR(50),
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    
    -- Capacity
    total_seats INTEGER NOT NULL DEFAULT 4,
    vehicle_type VARCHAR(50) DEFAULT 'sedan' CHECK (vehicle_type IN ('sedan', 'suv', 'hatchback', 'microbus')),
    
    -- Verification
    registration_document_url VARCHAR(500),
    insurance_document_url VARCHAR(500),
    fitness_certificate_url VARCHAR(500),
    is_verified BOOLEAN DEFAULT FALSE,
    verification_status VARCHAR(50) DEFAULT 'pending' CHECK (verification_status IN ('pending', 'approved', 'rejected')),
    
    -- Rent-a-Car Availability
    is_available_for_rent BOOLEAN DEFAULT FALSE,
    rent_price_per_hour DECIMAL(10,2),
    rent_price_per_day DECIMAL(10,2),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_vehicles_owner ON vehicles(owner_id);
CREATE INDEX idx_vehicles_plate ON vehicles(license_plate);
```

---

## 3. Rides Table
Represents a trip posted by a driver

```sql
CREATE TABLE rides (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    driver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id UUID NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
    
    -- Route Information
    origin_name VARCHAR(255) NOT NULL,
    origin_address TEXT NOT NULL,
    origin_location GEOGRAPHY(POINT, 4326) NOT NULL,
    
    destination_name VARCHAR(255) NOT NULL,
    destination_address TEXT NOT NULL,
    destination_location GEOGRAPHY(POINT, 4326) NOT NULL,
    
    route_path JSONB, -- Store encoded polyline or GeoJSON for the route
    
    -- Schedule
    scheduled_departure_time TIMESTAMP WITH TIME ZONE NOT NULL,
    estimated_arrival_time TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
    
    -- Seat Management
    total_seats INTEGER NOT NULL,
    available_seats INTEGER NOT NULL,
    price_per_seat DECIMAL(10,2) NOT NULL,
    
    -- Ride Type
    ride_type VARCHAR(50) DEFAULT 'share' CHECK (ride_type IN ('share', 'rent')), -- 'share' for seat-sharing, 'rent' for full car rental
    
    -- Additional Info
    description TEXT,
    amenities JSONB, -- ['ac', 'music', 'charging_port', etc.]
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

-- Index for geospatial queries (finding nearby rides)
CREATE INDEX idx_rides_origin ON rides USING GIST (origin_location);
CREATE INDEX idx_rides_destination ON rides USING GIST (destination_location);
CREATE INDEX idx_rides_driver ON rides(driver_id);
CREATE INDEX idx_rides_status ON rides(status);
CREATE INDEX idx_rides_departure ON rides(scheduled_departure_time);
```

---

## 4. Seats Table
Individual seat tracking within a ride

```sql
CREATE TABLE seats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    seat_number INTEGER NOT NULL, -- 1, 2, 3, 4, etc.
    
    -- Position for visual layout
    row_position INTEGER NOT NULL, -- Front: 1, Middle: 2, Back: 3
    column_position VARCHAR(10) NOT NULL, -- 'left', 'right', 'middle'
    
    -- Status
    status VARCHAR(50) DEFAULT 'available' CHECK (status IN ('available', 'booked', 'occupied', 'blocked')),
    booked_by UUID REFERENCES users(id),
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    final_price DECIMAL(10,2), -- After discounts/surge
    
    UNIQUE(ride_id, seat_number),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_seats_ride ON seats(ride_id);
CREATE INDEX idx_seats_status ON seats(status);
CREATE INDEX idx_seats_booked_by ON seats(booked_by);
```

---

## 5. Bookings Table
Passenger seat bookings

```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passenger_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ride_id UUID NOT NULL REFERENCES rides(id) ON DELETE CASCADE,
    
    -- Booking Details
    number_of_seats INTEGER NOT NULL DEFAULT 1,
    seat_ids UUID[] NOT NULL, -- Array of seat IDs booked
    
    -- Pickup & Drop-off
    pickup_location_name VARCHAR(255),
    pickup_location GEOGRAPHY(POINT, 4326),
    dropoff_location_name VARCHAR(255),
    dropoff_location GEOGRAPHY(POINT, 4326),
    
    -- Pricing
    subtotal DECIMAL(10,2) NOT NULL,
    service_fee DECIMAL(10,2) DEFAULT 0.00,
    discount_amount DECIMAL(10,2) DEFAULT 0.00,
    total_amount DECIMAL(10,2) NOT NULL,
    
    -- Payment
    payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
    payment_method VARCHAR(50), -- 'wallet', 'card', 'bKash', 'nogod', 'rocket'
    transaction_id VARCHAR(255),
    
    -- Status
    status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed', 'no_show')),
    
    -- Cancellation
    cancellation_reason TEXT,
    cancelled_by VARCHAR(20), -- 'passenger' or 'driver'
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_bookings_passenger ON bookings(passenger_id);
CREATE INDEX idx_bookings_ride ON bookings(ride_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_payment ON bookings(payment_status);
```

---

## 6. Transactions Table
Financial transactions for wallet and payments

```sql
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Transaction Type
    type VARCHAR(50) NOT NULL CHECK (type IN ('credit', 'debit')),
    category VARCHAR(50) NOT NULL CHECK (category IN ('ride_payment', 'wallet_topup', 'refund', 'commission', 'earnings', 'bonus')),
    
    -- Amount
    amount DECIMAL(10,2) NOT NULL,
    balance_after DECIMAL(10,2) NOT NULL,
    
    -- Related Entities
    booking_id UUID REFERENCES bookings(id),
    ride_id UUID REFERENCES rides(id),
    
    -- Payment Gateway Info
    payment_gateway VARCHAR(50), -- 'sslcommerz', 'bkash', 'stripe', etc.
    gateway_transaction_id VARCHAR(255),
    gateway_response JSONB,
    
    -- Description
    description TEXT,
    metadata JSONB,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_transactions_user ON transactions(user_id);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_transactions_category ON transactions(category);
CREATE INDEX idx_transactions_booking ON transactions(booking_id);
```

---

## 7. Ride Requests Table
For smart matching - passengers request rides before confirmation

```sql
CREATE TABLE ride_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    passenger_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    
    -- Request Details
    pickup_location GEOGRAPHY(POINT, 4326) NOT NULL,
    pickup_address TEXT NOT NULL,
    dropoff_location GEOGRAPHY(POINT, 4326) NOT NULL,
    dropoff_address TEXT NOT NULL,
    
    -- Preferences
    preferred_departure_time TIMESTAMP WITH TIME ZONE,
    number_of_seats INTEGER DEFAULT 1,
    max_walking_distance INTEGER DEFAULT 500, -- in meters
    
    -- Matching
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'accepted', 'rejected', 'expired')),
    matched_ride_id UUID REFERENCES rides(id),
    matched_driver_id UUID REFERENCES users(id),
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    responded_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_ride_requests_pickup ON ride_requests USING GIST (pickup_location);
CREATE INDEX idx_ride_requests_dropoff ON ride_requests USING GIST (dropoff_location);
CREATE INDEX idx_ride_requests_status ON ride_requests(status);
```

---

## 8. Reviews & Ratings Table

```sql
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
    
    reviewer_id UUID NOT NULL REFERENCES users(id),
    reviewee_id UUID NOT NULL REFERENCES users(id),
    ride_id UUID NOT NULL REFERENCES rides(id),
    
    -- Rating
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    
    -- Review Content
    comment TEXT,
    tags JSONB, -- ['clean_car', 'safe_driving', 'friendly', 'punctual', etc.]
    
    -- Response
    response_comment TEXT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reviews_reviewer ON reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewee ON reviews(reviewee_id);
CREATE INDEX idx_reviews_ride ON reviews(ride_id);
```

---

## 9. Chat Messages Table
For in-app communication

```sql
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID NOT NULL REFERENCES users(id),
    receiver_id UUID NOT NULL REFERENCES users(id),
    booking_id UUID REFERENCES bookings(id),
    
    message_text TEXT,
    message_type VARCHAR(50) DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'location', 'system')),
    is_read BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_chat_sender ON chat_messages(sender_id);
CREATE INDEX idx_chat_receiver ON chat_messages(receiver_id);
CREATE INDEX idx_chat_booking ON chat_messages(booking_id);
```

---

## 10. Admin Settings Table

```sql
CREATE TABLE admin_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key VARCHAR(100) UNIQUE NOT NULL,
    setting_value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Example settings:
-- commission_rate: {"value": 0.15, "currency": "BDT"}
-- surge_pricing_enabled: {"enabled": true, "multiplier": 1.5}
-- supported_languages: ["en", "bn"]
```

---

## Key Relationships Diagram

```
users (1) ----< (M) rides
users (1) ----< (M) bookings
users (1) ----< (M) vehicles
users (1) ----< (M) transactions
users (1) ----< (M) reviews (as reviewer)
users (1) ----< (M) reviews (as reviewee)

rides (1) ----< (M) seats
rides (1) ----< (M) bookings
rides (1) ----< (M) reviews

vehicles (1) ----< (M) rides

bookings (1) ----< (M) transactions
bookings (1) ----< (1) reviews
bookings (1) ----< (M) chat_messages

seats (M) ----> (1) rides
seats (M) ----> (1) users (booked_by)
```

---

## PostGIS Queries Examples

### Find Nearby Rides (within 5km radius)
```sql
SELECT r.*, 
       ST_Distance(r.origin_location, ST_MakePoint($lon, $lat)::geography) as distance
FROM rides r
WHERE r.status = 'scheduled'
  AND r.available_seats > 0
  AND ST_DWithin(r.origin_location, ST_MakePoint($lon, $lat)::geography, 5000)
ORDER BY r.scheduled_departure_time ASC;
```

### Find Drivers Near Passenger
```sql
SELECT u.*, v.*,
       ST_Distance(u.current_location, ST_MakePoint($lon, $lat)::geography) as distance
FROM users u
JOIN vehicles v ON u.id = v.owner_id
WHERE u.role = 'driver'
  AND u.is_verified = TRUE
  AND ST_DWithin(u.current_location, ST_MakePoint($lon, $lat)::geography, 3000)
ORDER BY distance ASC
LIMIT 20;
```

### Match Ride Request with Available Rides
```sql
SELECT r.*, 
       ST_Distance(r.origin_location, rr.pickup_location) as pickup_distance,
       ST_Distance(r.destination_location, rr.dropoff_location) as dropoff_distance
FROM rides r
CROSS JOIN ride_requests rr
WHERE rr.id = $request_id
  AND r.available_seats >= rr.number_of_seats
  AND r.status = 'scheduled'
  AND ST_DWithin(r.origin_location, rr.pickup_location, 2000) -- 2km max detour
ORDER BY pickup_distance ASC, r.scheduled_departure_time ASC
LIMIT 10;
```

---

## Migration Strategy

1. **Enable PostGIS Extension**
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

2. **Seed Initial Data**
- Admin user
- Sample vehicles
- Sample routes for testing
- Language translations

3. **Indexes Optimization**
- Regular VACUUM ANALYZE
- Monitor slow queries
- Add composite indexes as needed
