"use client";

import { useState } from "react";
import SearchTripForm from "@/components/form/search-trip";
import TripList, { Trip } from "@/components/trip-list";
import SeatSelection, { Seat } from "@/components/seat-selection";
import Payment, { BookingData } from "@/components/payment";
import Ticket from "@/components/ticket";
import { generateMockTrips } from "@/lib/mock-data";

type AppStep = "search" | "trips" | "seats" | "payment" | "ticket";

interface SearchData {
  from: string;
  to: string;
  date: Date;
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<AppStep>("search");
  const [searchData, setSearchData] = useState<SearchData | null>(null);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const handleSearch = (data: SearchData) => {
    setSearchData(data);
    const mockTrips = generateMockTrips(data.from, data.to, data.date);
    setTrips(mockTrips);
    setCurrentStep("trips");
  };

  const handleTripSelect = (trip: Trip) => {
    setSelectedTrip(trip);
    setCurrentStep("seats");
  };

  const handleSeatSelection = (seats: Seat[]) => {
    setSelectedSeats(seats);
    setCurrentStep("payment");
  };

  const handlePaymentSuccess = (booking: BookingData) => {
    setBookingData(booking);
    setCurrentStep("ticket");
  };

  const handleNewSearch = () => {
    setCurrentStep("search");
    setSearchData(null);
    setTrips([]);
    setSelectedTrip(null);
    setSelectedSeats([]);
    setBookingData(null);
  };

  const handleBackToTrips = () => {
    setCurrentStep("trips");
    setSelectedTrip(null);
    setSelectedSeats([]);
  };

  const handleBackToSeats = () => {
    setCurrentStep("seats");
    setSelectedSeats([]);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🚌 Otobüs Bileti Rezervasyon
          </h1>
          <p className="text-gray-600">
            Türkiye&apos;nin her yerine konforlu ve güvenli seyahat
          </p>
        </div>

        {/* Step Content */}
        <div className="max-w-7xl mx-auto">
          {currentStep === "search" && (
            <div className="max-w-4xl mx-auto">
              <SearchTripForm onSearch={handleSearch} />
            </div>
          )}

          {currentStep === "trips" && (
            <div className="max-w-5xl mx-auto">
              <TripList 
                trips={trips} 
                onSelectTrip={handleTripSelect}
                searchData={searchData || undefined}
              />
            </div>
          )}

          {currentStep === "seats" && selectedTrip && (
            <div className="max-w-6xl mx-auto">
              <SeatSelection
                trip={selectedTrip}
                onBack={handleBackToTrips}
                onContinue={handleSeatSelection}
              />
            </div>
          )}

          {currentStep === "payment" && selectedTrip && (
            <div className="max-w-6xl mx-auto">
              <Payment
                trip={selectedTrip}
                selectedSeats={selectedSeats}
                onBack={handleBackToSeats}
                onPaymentSuccess={handlePaymentSuccess}
              />
            </div>
          )}

          {currentStep === "ticket" && bookingData && (
            <div className="max-w-4xl mx-auto">
              <Ticket
                bookingData={bookingData}
                onNewSearch={handleNewSearch}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <p>© 2024 Otobüs Rezervasyon Sistemi - Güvenli ve Kolay Seyahat</p>
        </footer>
      </div>
    </main>
  );
}
