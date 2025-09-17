"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, X } from "lucide-react";
import { Trip } from "@/components/trip-list";

export interface Seat {
  id: string;
  number: number;
  isAvailable: boolean;
  isSelected: boolean;
  gender?: "male" | "female";
  price: number;
}

interface SeatSelectionProps {
  trip: Trip;
  onBack: () => void;
  onContinue: (selectedSeats: Seat[]) => void;
}

export default function SeatSelection({ trip, onBack, onContinue }: SeatSelectionProps) {
  // Generate seat layout (2+2 configuration, 40 seats)
  const generateSeats = (): Seat[] => {
    const seats: Seat[] = [];
    const occupiedSeats = new Set([3, 7, 12, 18, 25, 31, 36]); // Some occupied seats
    
    for (let i = 1; i <= 40; i++) {
      seats.push({
        id: `seat-${i}`,
        number: i,
        isAvailable: !occupiedSeats.has(i),
        isSelected: false,
        gender: occupiedSeats.has(i) ? (Math.random() > 0.5 ? "male" : "female") : undefined,
        price: trip.price,
      });
    }
    return seats;
  };

  const [seats, setSeats] = useState<Seat[]>(generateSeats());
  const selectedSeats = seats.filter(seat => seat.isSelected);

  const toggleSeat = (seatId: string) => {
    setSeats(prevSeats =>
      prevSeats.map(seat =>
        seat.id === seatId && seat.isAvailable
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    );
  };

  const getSeatIcon = (seat: Seat) => {
    if (!seat.isAvailable) {
      return seat.gender === "male" ? "👨" : "👩";
    }
    return seat.isSelected ? "✓" : seat.number;
  };

  const getSeatClass = (seat: Seat) => {
    if (!seat.isAvailable) {
      return "bg-red-200 text-red-800 cursor-not-allowed";
    }
    if (seat.isSelected) {
      return "bg-green-500 text-white";
    }
    return "bg-gray-100 hover:bg-blue-100 text-gray-700 cursor-pointer";
  };

  // Organize seats into rows (4 seats per row)
  const seatRows = [];
  for (let i = 0; i < seats.length; i += 4) {
    seatRows.push(seats.slice(i, i + 4));
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Geri Dön</span>
        </Button>
        <h2 className="text-2xl font-bold text-gray-800">Koltuk Seçimi</h2>
        <div></div>
      </div>

      {/* Trip Info */}
      <div className="bg-blue-50 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-blue-800">{trip.company}</div>
            <div className="text-blue-600 text-sm">
              {trip.from} → {trip.to}
            </div>
          </div>
          <div className="text-right">
            <div className="text-blue-800 font-semibold">{trip.departureTime}</div>
            <div className="text-blue-600 text-sm">{trip.duration}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bus Layout */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6">
            {/* Driver Section */}
            <div className="flex justify-end mb-4">
              <div className="w-12 h-8 bg-gray-300 rounded-md flex items-center justify-center">
                <span className="text-xs text-gray-600">Şoför</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="space-y-3">
              {seatRows.map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center space-x-2">
                  {/* Left side seats */}
                  <div className="flex space-x-2">
                    {row.slice(0, 2).map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => toggleSeat(seat.id)}
                        className={`w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center text-sm font-medium transition-all duration-200 ${getSeatClass(seat)}`}
                        disabled={!seat.isAvailable}
                      >
                        {getSeatIcon(seat)}
                      </button>
                    ))}
                  </div>

                  {/* Aisle */}
                  <div className="w-8"></div>

                  {/* Right side seats */}
                  <div className="flex space-x-2">
                    {row.slice(2, 4).map((seat) => (
                      <button
                        key={seat.id}
                        onClick={() => toggleSeat(seat.id)}
                        className={`w-12 h-12 rounded-lg border-2 border-gray-200 flex items-center justify-center text-sm font-medium transition-all duration-200 ${getSeatClass(seat)}`}
                        disabled={!seat.isAvailable}
                      >
                        {getSeatIcon(seat)}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex justify-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-100 border-2 border-gray-200 rounded"></div>
                <span className="text-sm text-gray-600">Müsait</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Seçili</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-200 border-2 border-red-300 rounded"></div>
                <span className="text-sm text-gray-600">Dolu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Selection Summary */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Seçilen Koltuklar</h3>
            
            {selectedSeats.length === 0 ? (
              <p className="text-gray-500 text-sm">Henüz koltuk seçilmedi</p>
            ) : (
              <div className="space-y-3">
                {selectedSeats.map((seat) => (
                  <div key={seat.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded flex items-center justify-center text-sm font-medium">
                        {seat.number}
                      </div>
                      <span className="text-sm font-medium">Koltuk {seat.number}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold">₺{seat.price}</span>
                      <button
                        onClick={() => toggleSeat(seat.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Toplam:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₺{selectedSeats.reduce((total, seat) => total + seat.price, 0)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={() => onContinue(selectedSeats)}
            disabled={selectedSeats.length === 0}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl"
          >
            Ödemeye Geç ({selectedSeats.length} koltuk)
          </Button>
        </div>
      </div>
    </div>
  );
}
