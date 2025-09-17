"use client";

import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Star } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";

export interface Trip {
  id: string;
  company: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  availableSeats: number;
  totalSeats: number;
  rating: number;
  amenities: string[];
  date: Date;
}

interface TripListProps {
  trips: Trip[];
  onSelectTrip: (trip: Trip) => void;
  searchData?: {
    from: string;
    to: string;
    date: Date;
  };
}

export default function TripList({ trips, onSelectTrip, searchData }: TripListProps) {
  if (trips.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <MapPin className="h-16 w-16 mx-auto" />
        </div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Sefer Bulunamadı
        </h3>
        <p className="text-gray-500">
          Seçtiğiniz güzergah ve tarih için sefer bulunmamaktadır.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Summary */}
      {searchData && (
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-blue-700">
                <span className="font-semibold">{searchData.from}</span>
                <span className="mx-2">→</span>
                <span className="font-semibold">{searchData.to}</span>
              </div>
              <div className="text-sm text-blue-600">
                {format(searchData.date, "d MMMM yyyy, EEEE", { locale: tr })}
              </div>
            </div>
            <div className="text-sm text-blue-600">
              {trips.length} sefer bulundu
            </div>
          </div>
        </div>
      )}

      {/* Trip Cards */}
      <div className="space-y-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {trip.company.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{trip.company}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{trip.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">
                    ₺{trip.price}
                  </div>
                  <div className="text-sm text-gray-500">kişi başı</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {/* Departure */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {trip.departureTime}
                  </div>
                  <div className="text-sm text-gray-600">{trip.from}</div>
                </div>

                {/* Duration */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <div className="mx-3 p-2 bg-gray-100 rounded-full">
                      <Clock className="h-4 w-4 text-gray-600" />
                    </div>
                    <div className="h-px bg-gray-300 flex-1"></div>
                  </div>
                  <div className="text-sm text-gray-600">{trip.duration}</div>
                </div>

                {/* Arrival */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">
                    {trip.arrivalTime}
                  </div>
                  <div className="text-sm text-gray-600">{trip.to}</div>
                </div>
              </div>

              {/* Amenities */}
              <div className="flex flex-wrap gap-2 mb-4">
                {trip.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>

              {/* Available Seats & Select Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {trip.availableSeats} / {trip.totalSeats} koltuk müsait
                  </span>
                </div>
                <Button
                  onClick={() => onSelectTrip(trip)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                  disabled={trip.availableSeats === 0}
                >
                  {trip.availableSeats === 0 ? "Dolu" : "Koltuk Seç"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
