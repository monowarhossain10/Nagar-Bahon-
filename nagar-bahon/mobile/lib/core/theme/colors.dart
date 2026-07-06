// lib/core/theme/colors.dart

import 'package:flutter/material.dart';

/// Nagar Bahon Brand Colors
/// 
/// Primary: Deep Blue (#1E3A8A) - Trust, Professionalism
/// Accent: Vibrant Orange (#F97316) - Energy, Community
class AppColors {
  AppColors._();

  // Primary Colors
  static const Color deepBlue = Color(0xFF1E3A8A);
  static const Color vibrantOrange = Color(0xFFF97316);
  
  // Secondary Colors
  static const Color lightBlue = Color(0xFFDBEAFE);
  static const Color teal = Color(0xFF14B8A6);
  static const Color red = Color(0xFFEF4444);
  
  // Gray Scale
  static const Color gray50 = Color(0xFFF9FAFB);
  static const Color gray100 = Color(0xFFF3F4F6);
  static const Color gray200 = Color(0xFFE5E7EB);
  static const Color gray300 = Color(0xFFD1D5DB);
  static const Color gray400 = Color(0xFF9CA3AF);
  static const Color gray500 = Color(0xFF6B7280);
  static const Color gray600 = Color(0xFF4B5563);
  static const Color gray700 = Color(0xFF374151);
  static const Color gray800 = Color(0xFF1F2937);
  static const Color gray900 = Color(0xFF111827);
  
  // Gradients
  static const LinearGradient primaryGradient = LinearGradient(
    colors: [deepBlue, Color(0xFF3B82F6)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  static const LinearGradient accentGradient = LinearGradient(
    colors: [vibrantOrange, Color(0xFFFB923C)],
    begin: Alignment.topLeft,
    end: Alignment.bottomRight,
  );
  
  // Semantic Colors
  static const Color success = Color(0xFF10B981);
  static const Color warning = Color(0xFFF59E0B);
  static const Color error = Color(0xFFEF4444);
  static const Color info = Color(0xFF3B82F6);
  
  // Background Colors
  static const Color background = Color(0xFFF9FAFB);
  static const Color surface = Color(0xFFFFFFFF);
  static const Color cardBackground = Color(0xFFFFFFFF);
  
  // Text Colors
  static const Color textPrimary = Color(0xFF1F2937);
  static const Color textSecondary = Color(0xFF6B7280);
  static const Color textHint = Color(0xFF9CA3AF);
  static const Color textOnPrimary = Color(0xFFFFFFFF);
  static const Color textOnAccent = Color(0xFFFFFFFF);
  
  // Border Colors
  static const Color borderLight = Color(0xFFE5E7EB);
  static const Color borderMedium = Color(0xFFD1D5DB);
  static const Color borderDark = Color(0xFF9CA3AF);
  
  // Seat States
  static const Color seatAvailable = Color(0xFF14B8A6);
  static const Color seatSelected = Color(0xFFF97316);
  static const Color seatBooked = Color(0xFF9CA3AF);
  static const Color seatBlocked = Color(0xFFEF4444);
  
  // Helper methods
  static Color withOpacity(Color color, double opacity) {
    return color.withOpacity(opacity);
  }
  
  static Color getSeatColor(String status, bool isSelected) {
    if (isSelected) return seatSelected;
    
    switch (status) {
      case 'available':
        return seatAvailable;
      case 'selected':
        return seatSelected;
      case 'booked':
      case 'occupied':
        return seatBooked;
      case 'blocked':
        return seatBlocked;
      default:
        return Colors.grey;
    }
  }
}
