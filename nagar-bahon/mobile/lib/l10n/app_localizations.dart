// lib/l10n/app_localizations.dart

import 'package:flutter/material.dart';
import 'app_localizations_en.dart';
import 'app_localizations_bn.dart';

class AppLocalizations {
  final Locale locale;

  AppLocalizations(this.locale);

  // Helper method to access localizations
  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  // Static member to have a simple access to the delegate
  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  // Supported languages
  static const List<Locale> supportedLocales = [
    Locale('en'),
    Locale('bn'),
  ];

  // Language names for display
  static Map<String, String> languageNames = {
    'en': 'English',
    'bn': 'বাংলা',
  };

  // Abstract methods - implemented in language-specific files
  String get app_name;
  String get tagline_bengali;
  String get tagline_english;
  String get welcome;
  String get login;
  String get register;
  String get logout;
  String get phone_number;
  String get password;
  String get forgot_password;
  String get dont_have_account;
  String get sign_up;
  String get already_have_account;
  String get home;
  String get book_ride;
  String get my_rides;
  String get wallet;
  String get profile;
  String get settings;
  String get nearby_rides;
  String get available_rides;
  String get select_seat;
  String get select_your_seats;
  String get seats_selected;
  String get total;
  String get continue_text;
  String get next;
  String get back;
  String get confirm_booking;
  String get booking_confirmed;
  String get booking_id;
  String get driver;
  String get vehicle;
  String get route;
  String get from;
  String get to;
  String get pickup_location;
  String get dropoff_location;
  String get schedule;
  String get date;
  String get time;
  String get price;
  String get fare_breakdown;
  String get base_fare;
  String get service_fee;
  String get discount;
  String get payment_method;
  String get add_money;
  String get current_balance;
  String get recent_transactions;
  String get ride_history;
  String get help_support;
  String get about_app;
  String get language;
  String get notifications;
  String get saved_addresses;
  String get payment_methods;
  String get switch_to_driver_mode;
  String get create_new_ride;
  String get publish_ride;
  String get available_seats;
  String get seats_left;
  String get eta;
  String get distance;
  String get track_driver;
  String get driver_is_coming;
  String get call;
  String get chat;
  String get cancel_ride;
  String get view_on_map;
  String get share_ride_details;
  String get add_to_calendar;
  String get rent_a_car;
  String get hourly;
  String get daily;
  String get duration;
  String get search_location;
  String get where_to;
  String get enter_destination;
  String get find_rides;
  String get filter;
  String get sort;
  String get apply;
  String get clear;
  String get done;
  String get save;
  String get delete;
  String get edit;
  String get update;
  String get success;
  String get error;
  String get warning;
  String get info;
  String get ok;
  String get yes;
  String get no;
  String get retry;
  String get loading;
  String get no_data;
  String get something_went_wrong;
  String get permission_required;
  String get location_permission_message;
  String get grant_permission;
  String get verified;
  String get not_verified;
  String get rating;
  String get reviews;
  String get total_rides;
  String get member_since;
  String get edit_profile;
  String get full_name;
  String get email;
  String get change_password;
  String get current_password;
  String get new_password;
  String get confirm_new_password;
  String get terms_conditions;
  String get privacy_policy;
  String get i_agree;
  String get otp_verification;
  String get enter_otp;
  String get resend_otp;
  String get verify;
  String get skip;
  String get get_started;
}

// Delegate class for loading localizations
class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  bool isSupported(Locale locale) {
    return ['en', 'bn'].contains(locale.languageCode);
  }

  @override
  Future<AppLocalizations> load(Locale locale) async {
    // Returning the appropriate localization class based on language code
    if (locale.languageCode == 'bn') {
      return AppLocalizationsBn(locale);
    }
    return AppLocalizationsEn(locale);
  }

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

// Extension for easy access to localized strings
extension AppLocalizationsExtension on BuildContext {
  AppLocalizations get l10n => AppLocalizations.of(this);
  
  String get currentLanguageCode => Localizations.localeOf(this).languageCode;
  
  bool get isBengali => currentLanguageCode == 'bn';
}
