// lib/presentation/widgets/seat/seat_widget.dart

import 'package:flutter/material.dart';
import '../../../core/theme/colors.dart';
import '../../../data/models/seat_model.dart';

/// Individual Seat Widget
/// 
/// Displays a single seat with visual states:
/// - Available (green border, selectable)
/// - Selected (orange fill, animated)
/// - Booked (gray, locked)
/// - Blocked (red pattern, unavailable)
class SeatWidget extends StatelessWidget {
  final SeatModel seat;
  final bool isSelected;
  final VoidCallback? onTap;

  const SeatWidget({
    Key? key,
    required this.seat,
    this.isSelected = false,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 200),
        curve: Curves.easeInOut,
        width: 50,
        height: 60,
        decoration: _getSeatDecoration(),
        child: Stack(
          children: [
            // Seat icon/background
            Center(
              child: Icon(
                Icons.event_seat,
                size: 40,
                color: _getSeatColor(),
              ),
            ),
            
            // Seat number
            Positioned(
              bottom: 4,
              right: 4,
              child: Text(
                '${seat.seatNumber}',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: isSelected ? Colors.white : _getSeatColor(),
                ),
              ),
            ),
            
            // Lock icon for booked seats
            if (seat.status == 'booked' || seat.status == 'blocked')
              Positioned(
                top: 4,
                right: 4,
                child: Icon(
                  Icons.lock,
                  size: 14,
                  color: Colors.grey[400],
                ),
              ),
            
            // Selection checkmark
            if (isSelected)
              Positioned(
                top: 4,
                left: 4,
                child: Icon(
                  Icons.check_circle,
                  size: 16,
                  color: Colors.white,
                ),
              ),
            
            // Pulse animation for selected seats
            if (isSelected) ..._buildPulseAnimation(),
          ],
        ),
      ),
    );
  }

  BoxDecoration _getSeatDecoration() {
    switch (seat.status) {
      case 'available':
        return BoxDecoration(
          color: isSelected ? AppColors.vibrantOrange : Colors.white,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: isSelected
                ? AppColors.vibrantOrange
                : AppColors.teal,
            width: isSelected ? 0 : 2,
          ),
          boxShadow: isSelected
              ? [
                  BoxShadow(
                    color: AppColors.vibrantOrange.withOpacity(0.4),
                    blurRadius: 8,
                    spreadRadius: 2,
                  ),
                ]
              : null,
        );

      case 'booked':
        return BoxDecoration(
          color: Colors.grey[300],
          borderRadius: BorderRadius.circular(8),
        );

      case 'blocked':
        return BoxDecoration(
          color: Colors.red[50],
          borderRadius: BorderRadius.circular(8),
          border: Border.all(
            color: Colors.red[300]!,
            width: 2,
          ),
        );

      case 'occupied':
        return BoxDecoration(
          color: Colors.grey[400],
          borderRadius: BorderRadius.circular(8),
        );

      default:
        return BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.circular(8),
          border: Border.all(color: Colors.grey),
        );
    }
  }

  Color _getSeatColor() {
    if (isSelected) return Colors.white;
    
    switch (seat.status) {
      case 'available':
        return AppColors.teal;
      case 'booked':
      case 'occupied':
        return Colors.grey[400]!;
      case 'blocked':
        return Colors.red[400]!;
      default:
        return Colors.grey;
    }
  }

  List<Widget> _buildPulseAnimation() {
    return [
      Positioned.fill(
        child: Container(
          decoration: BoxDecoration(
            shape: BoxShape.rectangle,
            borderRadius: BorderRadius.circular(8),
            border: Border.all(
              color: AppColors.vibrantOrange.withOpacity(0.3),
              width: 3,
            ),
          ),
        ),
      ),
    ];
  }
}

/// Enhanced seat widget with tooltip on long press
class SeatWidgetWithTooltip extends StatefulWidget {
  final SeatModel seat;
  final bool isSelected;
  final VoidCallback? onTap;

  const SeatWidgetWithTooltip({
    Key? key,
    required this.seat,
    this.isSelected = false,
    this.onTap,
  }) : super(key: key);

  @override
  State<SeatWidgetWithTooltip> createState() => _SeatWidgetWithTooltipState();
}

class _SeatWidgetWithTooltipState extends State<SeatWidgetWithTooltip> {
  bool _showTooltip = false;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: widget.onTap,
      onLongPress: () {
        setState(() => _showTooltip = true);
        Future.delayed(const Duration(seconds: 2), () {
          if (mounted) setState(() => _showTooltip = false);
        });
      },
      child: Stack(
        children: [
          SeatWidget(
            seat: widget.seat,
            isSelected: widget.isSelected,
            onTap: null, // Handled by parent gesture detector
          ),
          
          // Tooltip overlay
          if (_showTooltip)
            Positioned(
              bottom: 70,
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
                decoration: BoxDecoration(
                  color: Colors.black87,
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  children: [
                    Text(
                      'Seat ${widget.seat.seatNumber}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    if (widget.seat.features.isNotEmpty) ...[
                      const SizedBox(height: 4),
                      Text(
                        widget.seat.features.join(' • '),
                        style: const TextStyle(
                          color: Colors.white70,
                          fontSize: 12,
                        ),
                      ),
                    ],
                  ],
                ),
              ),
            ),
        ],
      ),
    );
  }
}
