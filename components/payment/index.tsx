"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CreditCard, Shield, CheckCircle } from "lucide-react";
import { Trip } from "@/components/trip-list";
import { Seat } from "@/components/seat-selection";

interface PaymentProps {
  trip: Trip;
  selectedSeats: Seat[];
  onBack: () => void;
  onPaymentSuccess: (bookingData: BookingData) => void;
}

export interface BookingData {
  bookingId: string;
  trip: Trip;
  seats: Seat[];
  passenger: {
    name: string;
    email: string;
    phone: string;
    tcNo: string;
  };
  totalAmount: number;
  paymentDate: Date;
}

export default function Payment({ trip, selectedSeats, onBack, onPaymentSuccess }: PaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Passenger Info
    name: "",
    email: "",
    phone: "",
    tcNo: "",
    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  });

  const totalAmount = selectedSeats.reduce((total, seat) => total + seat.price, 0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const bookingData: BookingData = {
      bookingId: `BK${Date.now()}`,
      trip,
      seats: selectedSeats,
      passenger: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        tcNo: formData.tcNo,
      },
      totalAmount,
      paymentDate: new Date(),
    };

    setIsProcessing(false);
    setShowSuccess(true);

    // Show success animation then proceed
    setTimeout(() => {
      onPaymentSuccess(bookingData);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ödeme Başarılı!
          </h2>
          <p className="text-gray-600 mb-6">
            Biletiniz başarıyla oluşturuldu. E-posta adresinize gönderilecektir.
          </p>
          <div className="animate-pulse">
            <div className="text-blue-600 font-medium">
              Biletiniz hazırlanıyor...
            </div>
          </div>
        </div>
      </div>
    );
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
        <h2 className="text-2xl font-bold text-gray-800">Ödeme</h2>
        <div></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePayment} className="space-y-6">
            {/* Passenger Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Yolcu Bilgileri
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Ad Soyad *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ad Soyad"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="tcNo">TC Kimlik No *</Label>
                  <Input
                    id="tcNo"
                    value={formData.tcNo}
                    onChange={(e) => handleInputChange("tcNo", e.target.value)}
                    placeholder="12345678901"
                    maxLength={11}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-posta *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="ornek@email.com"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="0555 123 45 67"
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Kart Bilgileri
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardName">Kart Üzerindeki İsim *</Label>
                  <Input
                    id="cardName"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange("cardName", e.target.value)}
                    placeholder="JOHN DOE"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Kart Numarası *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", formatCardNumber(e.target.value))}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    required
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Son Kullanma Tarihi *</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", formatExpiryDate(e.target.value))}
                      placeholder="MM/YY"
                      maxLength={5}
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      maxLength={3}
                      required
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-xl"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Ödeme İşleniyor...</span>
                </div>
              ) : (
                `₺${totalAmount} Öde`
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Rezervasyon Özeti</h3>
            
            {/* Trip Info */}
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Güzergah:</span>
                <span className="text-sm font-medium">{trip.from} → {trip.to}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Firma:</span>
                <span className="text-sm font-medium">{trip.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Kalkış:</span>
                <span className="text-sm font-medium">{trip.departureTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Süre:</span>
                <span className="text-sm font-medium">{trip.duration}</span>
              </div>
            </div>

            {/* Selected Seats */}
            <div className="border-t pt-4 mb-4">
              <div className="text-sm font-medium text-gray-800 mb-2">Seçilen Koltuklar:</div>
              {selectedSeats.map((seat) => (
                <div key={seat.id} className="flex justify-between items-center py-1">
                  <span className="text-sm text-gray-600">Koltuk {seat.number}</span>
                  <span className="text-sm font-medium">₺{seat.price}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">Toplam:</span>
                <span className="text-xl font-bold text-blue-600">₺{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Security Info */}
          <div className="bg-green-50 rounded-xl p-4 border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">Güvenli Ödeme</span>
            </div>
            <p className="text-xs text-green-700">
              Ödeme bilgileriniz SSL ile şifrelenerek güvenli bir şekilde işlenir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
