// lib/presentation/widgets/seat/seat_layout.dart

import 'package:flutter/material.dart';
import '../../../core/theme/colors.dart';
import '../../../l10n/app_localizations.dart';
import '../../../data/models/seat_model.dart';
import 'seat_widget.dart';
import 'seat_legend.dart';

/// Visual Seat Selection Component
/// 
/// This widget displays an interactive car seat layout similar to cinema booking.
/// Users can tap on available seats to select/deselect them.
/// Supports different vehicle configurations (Sedan, SUV, Microbus).
class SeatLayout extends StatefulWidget {
  final List<SeatModel> seats;
  final String vehicleType;
  final ValueChanged<List<SeatModel>> onSeatsSelected;
  final int maxSelectableSeats;

  const SeatLayout({
    Key? key,
    required this.seats,
    this.vehicleType = 'sedan',
    required this.onSeatsSelected,
    this.maxSelectableSeats = 4,
  }) : super(key: key);

  @override
  State<SeatLayout> createState() => _SeatLayoutState();
}

class _SeatLayoutState extends State<SeatLayout> {
  late Set<String> _selectedSeatIds;
  late Map<String, SeatModel> _seatsMap;

  @override
  void initState() {
    super.initState();
    _selectedSeatIds = {};
    _seatsMap = {for (var seat in widget.seats) seat.id: seat};
  }

  void _toggleSeatSelection(String seatId) {
    setState(() {
      if (_selectedSeatIds.contains(seatId)) {
        _selectedSeatIds.remove(seatId);
      } else {
        if (_selectedSeatIds.length < widget.maxSelectableSeats) {
          _selectedSeatIds.add(seatId);
          
          // Haptic feedback for better UX
          // HapticFeedback.lightImpact();
        }
      }
    });

    // Notify parent about selection change
    final selectedSeats = widget.seats
        .where((seat) => _selectedSeatIds.contains(seat.id))
        .toList();
    widget.onSeatsSelected(selectedSeats);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    
    // Group seats by row
    final Map<int, List<SeatModel>> seatsByRow = {};
    for (var seat in widget.seats) {
      seatsByRow.putIfAbsent(seat.rowPosition, () => []).add(seat);
    }

    // Sort rows
    final sortedRows = seatsByRow.keys.toList()..sort();

    return Column(
      children: [
        // Driver area indicator
        _buildDriverArea(),
        
        const SizedBox(height: 24),
        
        // Seat rows
        ...sortedRows.map((rowNum) => _buildSeatRow(seatsByRow[rowNum]!)),
        
        const SizedBox(height: 32),
        
        // Legend
        SeatLegend(),
        
        const SizedBox(height: 24),
        
        // Selection summary
        _buildSelectionSummary(l10n),
      ],
    );
  }

  Widget _buildDriverArea() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.lightBlue.withOpacity(0.3),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            'DRIVER',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: AppColors.deepBlue,
              letterSpacing: 1.5,
            ),
          ),
          Icon(
            Icons.music_note,
            size: 20,
            color: AppColors.vibrantOrange,
          ),
        ],
      ),
    );
  }

  Widget _buildSeatRow(List<SeatModel> rowSeats) {
    // Sort seats by column position (left to right)
    rowSeats.sort((a, b) => a.columnPosition.compareTo(b.columnPosition));

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          ...rowSeats.map((seat) => _buildSeatContainer(seat)),
        ],
      ),
    );
  }

  Widget _buildSeatContainer(SeatModel seat) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: SeatWidget(
        seat: seat,
        isSelected: _selectedSeatIds.contains(seat.id),
        onTap: seat.status == 'available'
            ? () => _toggleSeatSelection(seat.id)
            : null,
      ),
    );
  }

  Widget _buildSelectionSummary(AppLocalizations l10n) {
    final selectedCount = _selectedSeatIds.length;
    final totalPrice = selectedCount * 150; // Example price

    if (selectedCount == 0) {
      return Text(
        l10n.select_your_seats,
        style: TextStyle(
          fontSize: 16,
          color: Colors.grey[600],
        ),
      );
    }

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: AppColors.vibrantOrange.withOpacity(0.1),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(
          color: AppColors.vibrantOrange,
          width: 2,
        ),
      ),
      child: Column(
        children: [
          Text(
            '${l10n.seats_selected}: $selectedCount',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.bold,
              color: AppColors.deepBlue,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            '${l10n.total}: ৳$totalPrice',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
              color: AppColors.vibrantOrange,
            ),
          ),
        ],
      ),
    );
  }
}

// Alternative layout for different vehicle types
class VehicleLayoutBuilder {
  static List<Map<String, dynamic>> getSedanLayout() {
    // 4-seater sedan: 2+2 configuration
    return [
      {'row': 1, 'col': 'left', 'number': 1},
      {'row': 1, 'col': 'right', 'number': 2},
      {'row': 2, 'col': 'left', 'number': 3},
      {'row': 2, 'col': 'right', 'number': 4},
    ];
  }

  static List<Map<String, dynamic>> getSUVLayout() {
    // 6-7 seater SUV: 2+2+3 or 2+2+2 configuration
    return [
      {'row': 1, 'col': 'left', 'number': 1},
      {'row': 1, 'col': 'right', 'number': 2},
      {'row': 2, 'col': 'left', 'number': 3},
      {'row': 2, 'col': 'right', 'number': 4},
      {'row': 3, 'col': 'left', 'number': 5},
      {'row': 3, 'col': 'middle', 'number': 6},
      {'row': 3, 'col': 'right', 'number': 7},
    ];
  }

  static List<Map<String, dynamic>> getMicrobusLayout(int totalSeats) {
    // Microbus: 2+2+2+2+... configuration
    final layout = <Map<String, dynamic>>[];
    int seatNumber = 1;
    int rowNum = 1;
    
    while (seatNumber <= totalSeats) {
      layout.add({'row': rowNum, 'col': 'left', 'number': seatNumber++});
      if (seatNumber <= totalSeats) {
        layout.add({'row': rowNum, 'col': 'right', 'number': seatNumber++});
      }
      rowNum++;
    }
    
    return layout;
  }
}
