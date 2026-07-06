# Nagar Bahon - UI/UX Design & User Flow

## Brand Identity

### Color Palette
```
Primary Colors:
- Deep Blue: #1E3A8A (Trust, Professionalism)
- Vibrant Orange: #F97316 (Energy, Community)

Secondary Colors:
- Light Blue: #DBEAFE (Backgrounds, Highlights)
- Teal: #14B8A6 (Success, Confirmation)
- Red: #EF4444 (Errors, Urgent)
- Gray Scale: #F3F4F6, #9CA3AF, #4B5563, #1F2937

Gradients:
- Primary Gradient: linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)
- Accent Gradient: linear-gradient(135deg, #F97316 0%, #FB923C 100%)
```

### Typography
```
English:
- Headings: Poppins (Bold, SemiBold)
- Body: Inter (Regular, Medium)

Bengali:
- Headings: Hind Siliguri (Bold, SemiBold)
- Body: Hind Siliguri (Regular, Medium)

Font Sizes:
- Splash/Logo: 32px
- Page Titles: 24px
- Section Headers: 20px
- Body Text: 16px
- Captions: 14px
- Small Labels: 12px
```

### Iconography
- Material Icons or Feather Icons
- Rounded, friendly style
- Consistent stroke width (2px)
- Filled for active states, outlined for inactive

---

## App Structure

### Bottom Navigation (5 Tabs)
1. **Home** (হোম) - Map view, nearby rides
2. **Book Ride** (রাইড বুক করুন) - Quick booking
3. **My Rides** (আমার রাইড) - Active & past bookings
4. **Wallet** (ওয়ালেট) - Balance, transactions
5. **Profile** (প্রোফাইল) - Settings, language toggle

---

## Screen-by-Screen UI/UX Flow

### 1. Splash Screen
**Purpose**: Brand introduction, language selection

**Layout**:
```
┌─────────────────────────┐
│                         │
│     [App Logo]          │
│    নগর বাহন             │
│                         │
│  Tagline (bilingual):   │
│  "নগর বাহন - শহরের      │
│   প্রতিটি গন্তব্যে       │
│   আপনার সঙ্গী"           │
│                         │
│  "Nagar Bahon: Smart    │
│   Sharing for Every     │
│   City Journey"         │
│                         │
│  ┌─────────────────┐    │
│  │  বাংলা         │    │
│  └─────────────────┘    │
│                         │
│  ┌─────────────────┐    │
│  │  English       │    │
│  └─────────────────┘    │
│                         │
│    Loading indicator    │
│                         │
└─────────────────────────┘
```

**Interactions**:
- Auto-detect device language
- Buttons to manually select Bengali or English
- Fade transition to onboarding after 2 seconds

---

### 2. Onboarding Screens (3 Slides)

**Slide 1: Seat Sharing Concept**
```
┌─────────────────────────┐
│                         │
│    [Illustration]       │
│   People sharing car    │
│                         │
│   Share Seats,          │
│   Save Money!           │
│   আসন শেয়ার করুন,      │
│   টাকা বাঁচান!          │
│                         │
│   Book individual seats │
│   in cars going your    │
│   way                   │
│                         │
│         ● ○ ○           │
│                         │
└─────────────────────────┘
```

**Slide 2: Nearby Radar**
```
┌─────────────────────────┐
│                         │
│    [Map Illustration]   │
│   with location pins    │
│                         │
│   Find Nearby Rides     │
│   কাছাকাছি রাইড খুঁজুন   │
│                         │
│   See available cars    │
│   around you in real-   │
│   time                  │
│                         │
│         ○ ● ○           │
│                         │
└─────────────────────────┘
```

**Slide 3: Easy Booking**
```
┌─────────────────────────┐
│                         │
│  [Seat Selection UI]    │
│    Illustration         │
│                         │
│   Select Your Seat      │
│   আপনার আসন নির্বাচন   │
│         করুন            │
│                         │
│   Visual seat selection │
│   like cinema booking   │
│                         │
│         ○ ○ ●           │
│                         │
│    [Get Started]        │
│                         │
└─────────────────────────┘
```

---

### 3. Authentication Screens

**Login Screen**:
```
┌─────────────────────────┐
│  ← Back                 │
│                         │
│   Welcome Back!         │
│   স্বাগতম!               │
│                         │
│  ┌───────────────────┐  │
│  │ +880              │  │
│  └───────────────────┘  │
│  Phone Number           │
│  ফোন নম্বর             │
│                         │
│  ┌───────────────────┐  │
│  │ ••••••••          │  │
│  └───────────────────┘  │
│  Password               │
│  পাসওয়ার্ড              │
│                         │
│  [Forgot Password?]     │
│                         │
│  ┌───────────────────┐  │
│  │     Login         │  │
│  │    লগইন           │  │
│  └───────────────────┘  │
│                         │
│  Don't have an account? │
│  Sign Up →              │
│                         │
└─────────────────────────┘
```

---

### 4. Home Screen - Map View (Core Feature)

**Layout**:
```
┌─────────────────────────┐
│ [≡]              [🔍]   │
│                         │
│  ╭─────────────────╮    │
│  │                 │    │
│  │    FULL SCREEN  │    │
│  │     MAPBOX      │    │
│  │                 │    │
│  │  🚗 🚗    🚗    │    │
│  │     🚗          │    │
│  │  🚗             │    │
│  │                 │    │
│  │    📍 You       │    │
│  │                 │    │
│  ╰─────────────────╯    │
│                         │
│  ┌───────────────────┐  │
│  │ Where to?         │  │
│  │ কোথায় যাবেন?      │  │
│  └───────────────────┘  │
│                         │
│  [Share Ride] [Rent Car]│
│                         │
│  ┌───────────────────┐  │
│  │ 🔴 Live Traffic   │  │
│  │ 🟢 Available: 12  │  │
│  └───────────────────┘  │
│                         │
└─────────────────────────┘
```

**Features**:
- Real-time driver locations as car icons
- Clustering for dense areas
- Filter button: Price range, departure time, vehicle type
- Tap on car → Show ride preview card
- Long press on map → Set pickup location

**Car Pin States**:
- 🚗 Green: Available seats (3-4)
- 🚗 Yellow: Limited seats (1-2)
- 🚗 Gray: Full/Not available

---

### 5. Nearby Rides List (Bottom Sheet)

**Layout**:
```
┌─────────────────────────┐
│ Available Rides (12)    │
│ কাছাকাছি রাইড (১২)       │
│ ─────────────────────── │
│                         │
│ ┌─────────────────────┐ │
│ │ 🚗 Toyota Corolla   │ │
│ │    করিম চৌধুরী ⭐4.8 │ │
│ │                     │ │
│ │ From: গুলশান-১       │ │
│ │ To: মতিঝিল          │ │
│ │                     │ │
│ │ ⏰ 8:00 AM (5 min)  │ │
│ │ 💺 3 seats left     │ │
│ │ 💰 ৳150/seat        │ │
│ │                     │ │
│ │ [View Seats]        │ │
│ └─────────────────────┘ │
│                         │
│ ┌─────────────────────┐ │
│ │ 🚗 Honda Civic      │ │
│ │    রহিম আহমেদ ⭐4.9 │ │
│ │ ...                 │ │
│ └─────────────────────┘ │
│                         │
│ Scroll for more...      │
└─────────────────────────┘
```

---

### 6. Visual Seat Selection Screen (KEY FEATURE)

**Layout**:
```
┌─────────────────────────┐
│ ← Back                  │
│                         │
│ Select Your Seat(s)     │
│ আপনার আসন নির্বাচন করুন │
│                         │
│ ┌─────────────────────┐ │
│ │   DRIVER    [🎵]    │ │
│ │  ┌───┐ ┌───┐        │ │
│ │  │ 1 │ │ 2 │        │ │ <- Front Row
│ │  └───┘ └───┘        │ │
│ │                     │ │
│ │  ┌───┐ ┌───┐        │ │
│ │  │ 3 │ │ 4 │        │ │ <- Middle Row
│ │  └───┘ └───┘        │ │
│ │                     │ │
│ │  ┌───┐ ┌───┐ ┌───┐  │ │
│ │  │ 5 │ │ 6 │ │ 7 │  │ │ <- Back Row (if SUV)
│ │  └───┘ └───┘ └───┘  │ │
│ │                     │ │
│ │   FRONT →           │ │
│ └─────────────────────┘ │
│                         │
│ Legend:                 │
│ □ Available (৳150)      │
│ ■ Booked (Unavailable)  │
│ ▣ Selected (Your pick)  │
│ ⊗ Blocked               │
│                         │
│ Selected: 2 seats       │
│ Total: ৳300             │
│                         │
│ ┌───────────────────┐   │
│ │   Continue →      │   │
│ │   পরবর্তী          │   │
│ └───────────────────┘   │
│                         │
└─────────────────────────┘
```

**Seat States & Colors**:
- **Available**: White background, green border (#14B8A6), tap to select
- **Selected**: Orange fill (#F97316), white text, animated pulse
- **Booked**: Gray fill (#9CA3AF), locked icon, non-interactive
- **Blocked**: Red pattern (#EF4444), X mark, non-interactive

**Interactions**:
- Tap seat → Toggle selection (with haptic feedback)
- Multi-select supported (for groups)
- Show price update dynamically
- Seat info tooltip on long-press: "Window seat", "Extra legroom"
- Animation: Seat flips when selected
- Max selection limit based on availability

**Vehicle Layouts**:
- Sedan: 4 seats (2+2)
- SUV: 6-7 seats (2+2+3)
- Microbus: 12-15 seats (2+2+2+2+2+...)

---

### 7. Ride Details & Confirmation

**Layout**:
```
┌─────────────────────────┐
│ ← Back                  │
│                         │
│ Ride Summary            │
│ রাইড সারসংক্ষেপ          │
│                         │
│ ┌─────────────────────┐ │
│ │ 🚗 Toyota Corolla   │ │
│ │    White | ঢাকা-১১-  │ │
│ │         ১২৩৪        │ │
│ └─────────────────────┘ │
│                         │
│ Driver: করিম চৌধুরী     │
│ ⭐ 4.8 (156 rides)      │
│ [View Profile]          │
│                         │
│ Route:                  │
│ 📍 গুলশান-১ → মতিঝিল     │
│                         │
│ Pickup: House #12       │
│ Dropoff: Office Bldg    │
│ [Change Locations]      │
│                         │
│ Schedule:               │
│ ⏰ Tomorrow, 8:00 AM    │
│                         │
│ Seats Selected: 1, 3    │
│ [Change Seats]          │
│                         │
│ Fare Breakdown:         │
│ Base Fare:    ৳300      │
│ Service Fee:  ৳15       │
│ Discount:     -৳30      │
│ ─────────────────────   │
│ Total:        ৳285      │
│                         │
│ Payment: Wallet (৳500)  │
│ [Change Method]         │
│                         │
│ ┌───────────────────┐   │
│ │  Confirm Booking  │   │
│ │  বুকিং নিশ্চিত করুন │   │
│ └───────────────────┘   │
│                         │
└─────────────────────────┘
```

---

### 8. Booking Success Screen

**Layout**:
```
┌─────────────────────────┐
│                         │
│      ✓                  │
│   [Success Animation]   │
│                         │
│   Booking Confirmed!    │
│   বুকিং নিশ্চিত হয়েছে!   │
│                         │
│   Booking ID: #NB12345  │
│                         │
│   ┌─────────────────┐   │
│   │ Driver Details  │   │
│   │ করিম চৌধুরী      │   │
│   │ 📞 Call         │   │
│   │ 💬 Chat         │   │
│   └─────────────────┘   │
│                         │
│   Pickup Time: 8:00 AM  │
│   Pickup Point: Map     │
│   [View on Map]         │
│                         │
│   Add to Calendar       │
│   Share Ride Details    │
│                         │
│   [Track Driver]        │
│   [My Rides]            │
│                         │
└─────────────────────────┘
```

---

### 9. Driver App - Create Ride Flow

**Step 1: Route Setup**
```
┌─────────────────────────┐
│ Create New Ride         │
│ নতুন রাইড তৈরি করুন      │
│                         │
│ From:                   │
│ ┌───────────────────┐   │
│ │ Search location   │   │
│ └───────────────────┘   │
│                         │
│ To:                     │
│ ┌───────────────────┐   │
│ │ Search location   │   │
│ └───────────────────┘   │
│                         │
│ [Show on Map]           │
│                         │
│ Date & Time:            │
│ 📅 Tomorrow             │
│ ⏰ 8:00 AM              │
│                         │
│ ┌───────────────────┐   │
│ │     Next →        │   │
│ └───────────────────┘   │
└─────────────────────────┘
```

**Step 2: Vehicle & Seats**
```
┌─────────────────────────┐
│ Vehicle Selection       │
│                         │
│ ┌─────────────────────┐ │
│ │ 🚗 Toyota Corolla   │ │
│ │    ঢাকা-১১-১২৩৪     │ │
│ │    4 seats          │ │
│ │    ✓ Selected       │ │
│ └─────────────────────┘ │
│                         │
│ Available Seats:        │
│ [1] [2] [3] [4]         │
│ Tap to toggle           │
│                         │
│ Price per Seat:         │
│ ┌───────────────────┐   │
│ │ ৳ 150             │   │
│ └───────────────────┘   │
│                         │
│ Suggested: ৳120-৳180    │
│                         │
│ Amenities:              │
│ ☑ AC  ☑ Music  ☐ USB    │
│                         │
│ ┌───────────────────┐   │
│ │   Publish Ride    │   │
│ └───────────────────┘   │
└─────────────────────────┘
```

---

### 10. Live Tracking Screen

**Layout**:
```
┌─────────────────────────┐
│ ← Back        [Share]   │
│                         │
│ Driver is coming        │
│ ড্রাইভার আসছেন          │
│                         │
│ ╭─────────────────────╮ │
│ │                     │ │
│ │    LIVE MAP         │ │
│ │                     │ │
│ │  🚗 → → → 📍You     │ │
│ │                     │ │
│ │  ETA: 5 min         │ │
│ │  Distance: 1.2 km   │ │
│ │                     │ │
│ ╰─────────────────────╯ │
│                         │
│ ┌─────────────────────┐ │
│ │ করিম চৌধুরী          │ │
│ │ Toyota Corolla      │ │
│ │ ঢাকা-১১-১২৩৪        │ │
│ │ ⭐ 4.8              │ │
│ │                     │ │
│ │ [Call] [Chat]       │ │
│ └─────────────────────┘ │
│                         │
│ Seat: #3 (Window)       │
│ Pickup: গুলশান-১ মোড়     │
│                         │
│ [Cancel Ride]           │
└─────────────────────────┘
```

---

### 11. Wallet Screen

**Layout**:
```
┌─────────────────────────┐
│ Wallet                  │
│ ওয়ালেট                  │
│                         │
│ ┌─────────────────────┐ │
│ │ Current Balance     │ │
│ │ ৳ 500.00            │ │
│ │                     │ │
│ │ [Add Money] [Send]  │ │
│ └─────────────────────┘ │
│                         │
│ Quick Amounts:          │
│ [৳100] [৳200] [৳500]    │
│ [৳1000] [Custom]        │
│                         │
│ Payment Methods:        │
│ 💳 bKash  ✓            │
│ 💳 Nagad                │
│ 💳 Card                 │
│                         │
│ Recent Transactions:    │
│ ┌─────────────────────┐ │
│ │ -৳150 Ride Payment  │ │
│ │   Jan 14, 2024      │ │
│ ├─────────────────────┤ │
│ │ +৳500 Wallet Topup  │ │
│ │   Jan 13, 2024      │ │
│ └─────────────────────┘ │
│                         │
│ [View All]              │
└─────────────────────────┘
```

---

### 12. Profile & Settings

**Layout**:
```
┌─────────────────────────┐
│ Settings                │
│ সেটিংস                  │
│                         │
│ ┌─────────────────────┐ │
│ │ [Profile Photo]     │ │
│ │ রহিম আহমেদ          │ │
│ │ +8801712345678      │ │
│ │ Edit Profile →      │ │
│ └─────────────────────┘ │
│                         │
│ Language / ভাষা         │
│ ┌───────────────────┐   │
│ │ ○ English         │   │
│ │ ● বাংলা           │   │
│ └───────────────────┘   │
│                         │
│ Notifications           │
│ Ride History            │
│ Saved Addresses         │
│ Payment Methods         │
│ Help & Support          │
│ About Nagar Bahon       │
│                         │
│ Switch to Driver Mode   │
│ Logout                  │
└─────────────────────────┘
```

---

## Key UX Principles

### 1. Bilingual First
- All text has both EN and BN versions
- Language toggle accessible from any screen (top-right corner)
- Font rendering optimized for Bengali script
- Right-to-left considerations for numbers

### 2. Accessibility
- High contrast ratios (WCAG AA compliant)
- Large touch targets (min 44x44px)
- VoiceOver/TalkBack support
- Clear visual feedback for all interactions

### 3. Trust & Safety
- Verified badges on drivers
- Clear pricing before booking
- Emergency contact button
- Ride sharing with trusted contacts

### 4. Performance
- Skeleton loaders for maps
- Optimistic UI updates
- Offline mode for basic features
- Lazy loading for lists

### 5. Community Feel
- Driver/passenger ratings visible
- Social proof (number of rides)
- Referral program prominent
- Local landmarks in addresses

---

## Micro-interactions & Animations

1. **Seat Selection**: Flip animation with color transition
2. **Booking Success**: Confetti animation + checkmark draw
3. **Map Pins**: Pulse animation for live drivers
4. **Language Toggle**: Smooth fade between texts
5. **Loading**: Custom loader with Nagar Bahon logo
6. **Pull to Refresh**: Car icon animation
7. **Navigation**: Slide transitions with parallax

---

## Responsive Considerations

- Support for various screen sizes (5" to 6.7")
- Tablet optimization (split view for map + list)
- Landscape mode for passenger viewing
- Notch/dynamic island safe areas

---

## Dark Mode Support

Future enhancement with inverted color palette:
- Background: #0F172A
- Cards: #1E293B
- Text: #F1F5F9
- Accents remain same for brand consistency
