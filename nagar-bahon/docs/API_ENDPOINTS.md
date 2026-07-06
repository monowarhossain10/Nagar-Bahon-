# Nagar Bahon - API Endpoints Structure

## Base URL
```
Production: https://api.nagarbahon.com/v1
Development: http://localhost:3000/api/v1
```

## Authentication
All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication Endpoints

### POST /auth/register
Register a new user (Passenger or Driver)
```json
Request:
{
  "full_name": "রহিম আহমেদ",
  "email": "rahim@example.com",
  "phone": "+8801712345678",
  "password": "securePassword123",
  "role": "passenger", // or "driver"
  "preferred_language": "bn" // or "en"
}

Response:
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "full_name": "রহিম আহমেদ",
      "email": "rahim@example.com",
      "phone": "+8801712345678",
      "role": "passenger",
      "is_verified": false,
      "preferred_language": "bn"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /auth/login
```json
Request:
{
  "phone": "+8801712345678",
  "password": "securePassword123"
}

Response:
{
  "success": true,
  "data": {
    "user": {...},
    "token": "jwt_token_here",
    "refresh_token": "refresh_token_here"
  }
}
```

### POST /auth/refresh-token
Refresh access token

### POST /auth/logout
Logout user

### POST /auth/verify-phone
Verify phone number with OTP

### POST /auth/forgot-password
Request password reset

---

## 2. User Profile Endpoints

### GET /users/me
Get current user profile

### PUT /users/me
Update user profile
```json
Request:
{
  "full_name": "Updated Name",
  "profile_image_url": "https://...",
  "preferred_language": "en"
}
```

### GET /users/me/wallet
Get wallet balance and transaction history

### POST /users/me/wallet/topup
Add money to wallet
```json
Request:
{
  "amount": 500.00,
  "payment_method": "bkash" // or "card", "nogod", "rocket"
}
```

### GET /users/:id
Get public profile of another user (for reviews)

---

## 3. Vehicle Endpoints (Driver)

### GET /vehicles
List all vehicles for current driver

### POST /vehicles
Add a new vehicle
```json
Request:
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2020,
  "color": "White",
  "license_plate": "ঢাকা-১১-১২৩৪",
  "total_seats": 4,
  "vehicle_type": "sedan",
  "is_available_for_rent": true,
  "rent_price_per_hour": 300.00,
  "rent_price_per_day": 2500.00
}
```

### PUT /vehicles/:id
Update vehicle information

### DELETE /vehicles/:id
Remove vehicle

### POST /vehicles/:id/verify
Submit documents for verification

---

## 4. Ride Management Endpoints

### POST /rides
Create a new ride (Driver)
```json
Request:
{
  "vehicle_id": "uuid",
  "origin_name": "গুলশান-১",
  "origin_address": "House #12, Road #15, Gulshan-1, Dhaka",
  "origin_location": {
    "type": "Point",
    "coordinates": [90.4125, 23.7925] // [longitude, latitude]
  },
  "destination_name": "মতিঝিল",
  "destination_address": "Motijheel Commercial Area, Dhaka",
  "destination_location": {
    "type": "Point",
    "coordinates": [90.4170, 23.7330]
  },
  "scheduled_departure_time": "2024-01-15T08:00:00Z",
  "price_per_seat": 150.00,
  "ride_type": "share", // or "rent"
  "description": "Regular morning commute",
  "amenities": ["ac", "music", "charging_port"]
}

Response:
{
  "success": true,
  "data": {
    "ride": {...},
    "seats": [
      {"id": "uuid", "seat_number": 1, "status": "available", ...},
      {"id": "uuid", "seat_number": 2, "status": "available", ...},
      ...
    ]
  }
}
```

### GET /rides
List rides (with filters)
```
Query Parameters:
- type: 'share' | 'rent'
- status: 'scheduled' | 'in_progress' | 'completed'
- date: YYYY-MM-DD
- page: number
- limit: number
```

### GET /rides/:id
Get ride details with seat availability

### PUT /rides/:id
Update ride (Driver only)

### DELETE /rides/:id
Cancel ride (Driver only)

### PATCH /rides/:id/status
Update ride status (e.g., start trip, complete trip)

---

## 5. Nearby Rides & Smart Matching

### GET /rides/nearby
**CORE FEATURE**: Find nearby available rides
```
Query Parameters:
- lat: number (required)
- lon: number (required)
- radius: number (in meters, default: 5000)
- destination_lat: number (optional, for smart matching)
- destination_lon: number (optional)
- departure_time: ISO timestamp (optional)
- seats: number (default: 1)
- page: number
- limit: number

Response:
{
  "success": true,
  "data": {
    "rides": [
      {
        "id": "uuid",
        "driver": {
          "id": "uuid",
          "full_name": "করিম চৌধুরী",
          "rating": 4.8,
          "total_rides": 156,
          "profile_image_url": "..."
        },
        "vehicle": {
          "make": "Toyota",
          "model": "Corolla",
          "color": "White",
          "license_plate": "ঢাকা-১১-১২৩৪"
        },
        "origin": {
          "name": "গুলশান-১",
          "location": [90.4125, 23.7925]
        },
        "destination": {
          "name": "মতিঝিল",
          "location": [90.4170, 23.7330]
        },
        "scheduled_departure_time": "2024-01-15T08:00:00Z",
        "price_per_seat": 150.00,
        "available_seats": 3,
        "total_seats": 4,
        "distance_from_user": 450, // meters
        "route_match_score": 0.92, // 0-1, higher is better match
        "estimated_detour": 2 // minutes
      },
      ...
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 45,
      "total_pages": 3
    }
  }
}
```

### GET /rides/nearby/drivers
Find nearby drivers (for instant booking)

### POST /rides/match
Smart matching algorithm - find best ride for passenger
```json
Request:
{
  "pickup_location": {
    "lat": 23.7925,
    "lon": 90.4125
  },
  "dropoff_location": {
    "lat": 23.7330,
    "lon": 90.4170
  },
  "number_of_seats": 2,
  "preferred_departure_time": "2024-01-15T08:00:00Z",
  "max_walking_distance": 500 // meters
}

Response:
{
  "success": true,
  "data": {
    "matches": [
      {
        "ride_id": "uuid",
        "match_score": 0.95,
        "pickup_point": {
          "name": "গুলশান-১ মোড়",
          "location": [90.4130, 23.7930],
          "walking_distance": 120 // meters
        },
        "dropoff_point": {
          "name": "মতিঝিল সিএন্ডবি",
          "location": [90.4165, 23.7335],
          "walking_distance": 80 // meters
        },
        "price_per_seat": 150.00,
        "total_price": 300.00,
        "estimated_pickup_time": "2024-01-15T08:05:00Z",
        "estimated_arrival_time": "2024-01-15T08:35:00Z"
      },
      ...
    ]
  }
}
```

---

## 6. Seat Booking Endpoints

### GET /rides/:id/seats
Get visual seat layout for a ride
```
Response:
{
  "success": true,
  "data": {
    "ride_id": "uuid",
    "vehicle_type": "sedan",
    "total_seats": 4,
    "seats": [
      {
        "id": "uuid",
        "seat_number": 1,
        "row_position": 1, // Front row
        "column_position": "left",
        "status": "available", // available, booked, occupied, blocked
        "price": 150.00,
        "features": ["window"]
      },
      {
        "id": "uuid",
        "seat_number": 2,
        "row_position": 1,
        "column_position": "right",
        "status": "booked",
        "price": 150.00,
        "features": ["window"]
      },
      {
        "id": "uuid",
        "seat_number": 3,
        "row_position": 2,
        "column_position": "left",
        "status": "available",
        "price": 150.00,
        "features": []
      },
      {
        "id": "uuid",
        "seat_number": 4,
        "row_position": 2,
        "column_position": "right",
        "status": "available",
        "price": 150.00,
        "features": ["window"]
      }
    ]
  }
}
```

### POST /bookings
Book seat(s)
```json
Request:
{
  "ride_id": "uuid",
  "seat_ids": ["uuid1", "uuid2"],
  "pickup_location": {
    "name": "বাড়ি #১২, রোড #১৫",
    "location": {
      "type": "Point",
      "coordinates": [90.4125, 23.7925]
    }
  },
  "dropoff_location": {
    "name": "অফিস বিল্ডিং, মতিঝিল",
    "location": {
      "type": "Point",
      "coordinates": [90.4170, 23.7330]
    }
  },
  "payment_method": "wallet" // or "card", "bkash"
}

Response:
{
  "success": true,
  "data": {
    "booking": {
      "id": "uuid",
      "passenger_id": "uuid",
      "ride_id": "uuid",
      "number_of_seats": 2,
      "seat_ids": ["uuid1", "uuid2"],
      "subtotal": 300.00,
      "service_fee": 15.00,
      "discount_amount": 0.00,
      "total_amount": 315.00,
      "payment_status": "paid",
      "status": "confirmed",
      "created_at": "2024-01-14T10:30:00Z"
    },
    "driver_info": {
      "name": "করিম চৌধুরী",
      "phone_masked": "+88017XX-XXXX45",
      "vehicle": "Toyota Corolla (ঢাকা-১১-১২৩৪)"
    }
  }
}
```

### GET /bookings
List user's bookings

### GET /bookings/:id
Get booking details

### PATCH /bookings/:id/cancel
Cancel booking
```json
Request:
{
  "reason": "Change of plans"
}
```

### POST /bookings/:id/payment
Process payment for booking

---

## 7. Rent-a-Car Endpoints

### GET /rentals/available
List cars available for full rental
```
Query Parameters:
- lat, lon: current location
- rental_type: 'hourly' | 'daily'
- date: rental date
- duration: number of hours/days
```

### POST /rentals/book
Book entire car
```json
Request:
{
  "vehicle_id": "uuid",
  "rental_type": "hourly",
  "duration": 4, // hours
  "pickup_time": "2024-01-15T10:00:00Z",
  "pickup_location": {...},
  "dropoff_location": {...}
}
```

---

## 8. Real-time Tracking (WebSocket)

### WebSocket Connection
```
wss://api.nagarbahon.com/ws?token=<jwt_token>
```

### Events

#### Client → Server
```json
// Update driver location
{
  "event": "driver_location_update",
  "data": {
    "ride_id": "uuid",
    "location": {
      "lat": 23.7925,
      "lon": 90.4125
    },
    "speed": 35, // km/h
    "heading": 180 // degrees
  }
}

// Join ride room
{
  "event": "join_ride_room",
  "data": {
    "ride_id": "uuid"
  }
}

// Request chat
{
  "event": "send_message",
  "data": {
    "receiver_id": "uuid",
    "message": "আমি পিকআপ পয়েন্টে পৌঁছে গেছি",
    "booking_id": "uuid"
  }
}
```

#### Server → Client
```json
// Driver location update to passengers
{
  "event": "driver_location",
  "data": {
    "ride_id": "uuid",
    "location": {"lat": 23.7925, "lon": 90.4125},
    "eta_minutes": 5,
    "distance_meters": 1200
  }
}

// Seat availability update
{
  "event": "seat_availability_change",
  "data": {
    "ride_id": "uuid",
    "available_seats": 2,
    "booked_seat_ids": ["uuid1", "uuid2"]
  }
}

// New message
{
  "event": "new_message",
  "data": {
    "sender_id": "uuid",
    "message": "Coming soon!",
    "timestamp": "2024-01-14T10:35:00Z"
  }
}

// Ride status update
{
  "event": "ride_status_update",
  "data": {
    "ride_id": "uuid",
    "status": "in_progress",
    "updated_at": "2024-01-15T08:05:00Z"
  }
}
```

---

## 9. Chat & Communication

### GET /chat/history/:booking_id
Get chat history for a booking

### POST /chat/message
Send message (also available via WebSocket)

### POST /call/request
Request masked call
```json
Request:
{
  "booking_id": "uuid",
  "target_user_id": "uuid"
}

Response:
{
  "success": true,
  "data": {
    "masked_number": "+8809612-XXXXXX",
    "expires_in": 300 // seconds
  }
}
```

---

## 10. Reviews & Ratings

### POST /reviews
Submit review after ride completion
```json
Request:
{
  "booking_id": "uuid",
  "reviewee_id": "uuid",
  "rating": 5,
  "comment": "খুব ভালো ড্রাইভিং। সময়মতো পৌঁছে দিয়েছেন।",
  "tags": ["safe_driving", "punctual", "friendly"]
}
```

### GET /users/:id/reviews
Get user's reviews

---

## 11. Admin Endpoints

### GET /admin/dashboard
Get dashboard statistics

### GET /admin/users
List all users with filters

### PUT /admin/users/:id/verify
Verify user/driver

### GET /admin/rides
Monitor all rides

### PUT /admin/settings
Update system settings

### GET /admin/analytics
Get analytics data

---

## 12. Localization

### GET /locales/:lang
Get translations for a language
```
Parameters: lang = 'en' | 'bn'

Response:
{
  "success": true,
  "data": {
    "language": "bn",
    "translations": {
      "welcome": "স্বাগতম",
      "book_ride": "রাইড বুক করুন",
      "nearby_rides": "কাছাকাছি রাইড",
      ...
    }
  }
}
```

---

## Error Response Format

```json
{
  "success": false,
  "error": {
    "code": "SEAT_NOT_AVAILABLE",
    "message": "Requested seats are no longer available",
    "message_bn": "অনুরোধকৃত আসনগুলো আর খালি নেই",
    "details": {...}
  },
  "timestamp": "2024-01-14T10:30:00Z"
}
```

## Common Error Codes
- `AUTHENTICATION_REQUIRED`
- `INVALID_CREDENTIALS`
- `SEAT_NOT_AVAILABLE`
- `RIDE_CANCELLED`
- `INSUFFICIENT_WALLET_BALANCE`
- `VEHICLE_NOT_VERIFIED`
- `LOCATION_PERMISSION_DENIED`
- `RATE_LIMIT_EXCEEDED`

---

## Rate Limiting
- Unauthenticated: 10 requests/minute
- Authenticated: 100 requests/minute
- Critical endpoints (booking, payment): 10 requests/minute

---

## Versioning
Current API Version: v1
Deprecation policy: 6 months notice before deprecation
