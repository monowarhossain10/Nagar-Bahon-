// lib/data/models/seat_model.dart

/// Seat Model
/// 
/// Represents an individual seat in a vehicle for ride-sharing
class SeatModel {
  final String id;
  final String rideId;
  final int seatNumber;
  final int rowPosition;
  final String columnPosition; // 'left', 'right', 'middle'
  final String status; // 'available', 'booked', 'occupied', 'blocked'
  final double basePrice;
  final double? finalPrice;
  final List<String> features; // ['window', 'extra_legroom', 'charging_port']
  final String? bookedBy;

  const SeatModel({
    required this.id,
    required this.rideId,
    required this.seatNumber,
    required this.rowPosition,
    required this.columnPosition,
    this.status = 'available',
    required this.basePrice,
    this.finalPrice,
    this.features = const [],
    this.bookedBy,
  });

  factory SeatModel.fromJson(Map<String, dynamic> json) {
    return SeatModel(
      id: json['id'] as String,
      rideId: json['ride_id'] as String,
      seatNumber: json['seat_number'] as int,
      rowPosition: json['row_position'] as int,
      columnPosition: json['column_position'] as String,
      status: json['status'] as String,
      basePrice: (json['base_price'] as num).toDouble(),
      finalPrice: json['final_price'] != null
          ? (json['final_price'] as num).toDouble()
          : null,
      features: json['features'] != null
          ? List<String>.from(json['features'] as List)
          : [],
      bookedBy: json['booked_by'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'ride_id': rideId,
      'seat_number': seatNumber,
      'row_position': rowPosition,
      'column_position': columnPosition,
      'status': status,
      'base_price': basePrice,
      'final_price': finalPrice,
      'features': features,
      'booked_by': bookedBy,
    };
  }

  bool get isAvailable => status == 'available';
  bool get isBooked => status == 'booked';
  bool get isOccupied => status == 'occupied';
  bool get isBlocked => status == 'blocked';
  bool get hasWindow => features.contains('window');
  bool get hasExtraLegroom => features.contains('extra_legroom');
  bool get hasChargingPort => features.contains('charging_port');

  SeatModel copyWith({
    String? id,
    String? rideId,
    int? seatNumber,
    int? rowPosition,
    String? columnPosition,
    String? status,
    double? basePrice,
    double? finalPrice,
    List<String>? features,
    String? bookedBy,
  }) {
    return SeatModel(
      id: id ?? this.id,
      rideId: rideId ?? this.rideId,
      seatNumber: seatNumber ?? this.seatNumber,
      rowPosition: rowPosition ?? this.rowPosition,
      columnPosition: columnPosition ?? this.columnPosition,
      status: status ?? this.status,
      basePrice: basePrice ?? this.basePrice,
      finalPrice: finalPrice ?? this.finalPrice,
      features: features ?? this.features,
      bookedBy: bookedBy ?? this.bookedBy,
    );
  }

  @override
  String toString() {
    return 'SeatModel(id: $id, number: $seatNumber, status: $status, price: $basePrice)';
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is SeatModel && other.id == id;
  }

  @override
  int get hashCode => id.hashCode;
}
