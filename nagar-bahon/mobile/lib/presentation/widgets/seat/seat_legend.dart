// lib/presentation/widgets/seat/seat_legend.dart

import 'package:flutter/material.dart';
import '../../../core/theme/colors.dart';
import '../../../l10n/app_localizations.dart';

/// Seat Legend Widget
/// 
/// Displays the color coding for different seat states
class SeatLegend extends StatelessWidget {
  const SeatLegend({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Legend:',
          style: TextStyle(
            fontSize: 14,
            fontWeight: FontWeight.bold,
            color: Colors.grey[600],
          ),
        ),
        const SizedBox(height: 12),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            _buildLegendItem(
              icon: Icons.event_seat,
              color: AppColors.teal,
              label: 'Available',
              labelBn: 'উপলব্ধ',
              isBorder: true,
            ),
            _buildLegendItem(
              icon: Icons.event_seat,
              color: AppColors.vibrantOrange,
              label: 'Selected',
              labelBn: 'নির্বাচিত',
              isFilled: true,
            ),
            _buildLegendItem(
              icon: Icons.event_seat,
              color: Colors.grey[400]!,
              label: 'Booked',
              labelBn: 'বুকড',
              isFilled: true,
            ),
            _buildLegendItem(
              icon: Icons.event_seat,
              color: Colors.red[400]!,
              label: 'Blocked',
              labelBn: 'ব্লকড',
              isBorder: true,
              hasLock: true,
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildLegendItem({
    required IconData icon,
    required Color color,
    required String label,
    required String labelBn,
    bool isFilled = false,
    bool isBorder = false,
    bool hasLock = false,
  }) {
    return Column(
      children: [
        Stack(
          children: [
            Icon(
              icon,
              size: 32,
              color: isFilled ? color : (isBorder ? color : Colors.grey[400]),
            ),
            if (hasLock)
              Positioned(
                top: -4,
                right: -4,
                child: Icon(
                  Icons.lock,
                  size: 12,
                  color: Colors.grey[600],
                ),
              ),
          ],
        ),
        const SizedBox(height: 4),
        Text(
          Localizations.localeOf(BuildContext.current).languageCode == 'bn'
              ? labelBn
              : label,
          style: TextStyle(
            fontSize: 11,
            color: Colors.grey[700],
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}

/// Compact legend for smaller screens
class CompactSeatLegend extends StatelessWidget {
  const CompactSeatLegend({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 16,
      runSpacing: 8,
      alignment: WrapAlignment.center,
      children: [
        _buildCompactItem(AppColors.teal, 'Available', 'উপলব্ধ'),
        _buildCompactItem(AppColors.vibrantOrange, 'Selected', 'নির্বাচিত', filled: true),
        _buildCompactItem(Colors.grey[400]!, 'Booked', 'বুকড', filled: true),
        _buildCompactItem(Colors.red[400]!, 'Blocked', 'ব্লকড', border: true),
      ],
    );
  }

  Widget _buildCompactItem(Color color, String label, String labelBn, {bool filled = false, bool border = false}) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Container(
          width: 16,
          height: 16,
          decoration: BoxDecoration(
            color: filled ? color : Colors.transparent,
            border: border || !filled ? Border.all(color: color, width: 2) : null,
            borderRadius: BorderRadius.circular(4),
          ),
        ),
        const SizedBox(width: 6),
        Text(
          Localizations.localeOf(BuildContext.current).languageCode == 'bn'
              ? labelBn
              : label,
          style: TextStyle(
            fontSize: 12,
            color: Colors.grey[700],
          ),
        ),
      ],
    );
  }
}
