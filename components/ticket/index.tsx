"use client";

import { Button } from "@/components/ui/button";
import { Download, MapPin, Clock, User, CreditCard, QrCode } from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { BookingData } from "@/components/payment";

interface TicketProps {
  bookingData: BookingData;
  onNewSearch: () => void;
}

export default function Ticket({ bookingData, onNewSearch }: TicketProps) {
  const { trip, seats, passenger, bookingId, paymentDate } = bookingData;

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    alert("Bilet PDF olarak indirilecek (demo)");
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <QrCode className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">
          Biletiniz Hazır!
        </h2>
        <p className="text-green-700">
          Rezervasyonunuz başarıyla tamamlandı. Bilet bilgileriniz aşağıdadır.
        </p>
      </div>

      {/* Ticket */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Ticket Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">Otobüs Bileti</h3>
              <p className="text-blue-100">Rezervasyon No: {bookingId}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{trip.company}</div>
              <div className="text-blue-100 text-sm">
                {format(paymentDate, "d MMMM yyyy", { locale: tr })}
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Body */}
        <div className="p-6">
          {/* Route Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">KALKIŞ</div>
              <div className="text-2xl font-bold text-gray-800">{trip.departureTime}</div>
              <div className="text-lg font-semibold text-blue-600">{trip.from}</div>
              <div className="text-sm text-gray-500">
                {format(trip.date, "d MMM yyyy", { locale: tr })}
              </div>
            </div>

            <div className="text-center flex flex-col items-center justify-center">
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-px bg-gray-300 flex-1"></div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <MapPin className="h-4 w-4 text-blue-600" />
                </div>
                <div className="h-px bg-gray-300 flex-1"></div>
              </div>
              <div className="text-sm text-gray-600">{trip.duration}</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-1">VARIŞ</div>
              <div className="text-2xl font-bold text-gray-800">{trip.arrivalTime}</div>
              <div className="text-lg font-semibold text-blue-600">{trip.to}</div>
              <div className="text-sm text-gray-500">
                {format(trip.date, "d MMM yyyy", { locale: tr })}
              </div>
            </div>
          </div>

          {/* Passenger & Seat Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Yolcu Adı</div>
                  <div className="font-semibold">{passenger.name}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">TC Kimlik No</div>
                  <div className="font-semibold">{passenger.tcNo}</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Koltuk Numaraları</div>
                  <div className="font-semibold">
                    {seats.map(seat => seat.number).join(", ")}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 flex items-center justify-center">
                  <span className="text-gray-500">₺</span>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Toplam Tutar</div>
                  <div className="font-semibold text-green-600">₺{bookingData.totalAmount}</div>
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="border-t pt-6 mb-6">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-2">
                  <QrCode className="h-12 w-12 text-gray-400" />
                </div>
                <div className="text-xs text-gray-500">QR Kod</div>
              </div>
              <div className="text-sm text-gray-600 max-w-md">
                <p className="mb-2">
                  <strong>Önemli Bilgiler:</strong>
                </p>
                <ul className="text-xs space-y-1">
                  <li>• Seyahat öncesi kimlik belgenizi yanınızda bulundurun</li>
                  <li>• Kalkıştan 30 dakika önce terminalde olun</li>
                  <li>• Bu bileti seyahat sırasında yanınızda bulundurun</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">E-posta</div>
                <div className="font-medium">{passenger.email}</div>
              </div>
              <div>
                <div className="text-gray-500">Telefon</div>
                <div className="font-medium">{passenger.phone}</div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Download className="mr-2 h-4 w-4" />
              PDF İndir
            </Button>
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex-1"
            >
              Yazdır
            </Button>
            <Button
              onClick={onNewSearch}
              variant="outline"
              className="flex-1"
            >
              Yeni Arama
            </Button>
          </div>
        </div>
      </div>

      {/* Additional Services */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-semibold text-blue-800 mb-4">Ek Hizmetler</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl mb-2">🍽️</div>
            <div className="text-sm font-medium">İkram Servisi</div>
            <div className="text-xs text-gray-600">Ücretsiz</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl mb-2">📶</div>
            <div className="text-sm font-medium">WiFi</div>
            <div className="text-xs text-gray-600">Ücretsiz</div>
          </div>
          <div className="text-center p-4 bg-white rounded-lg">
            <div className="text-2xl mb-2">🔌</div>
            <div className="text-sm font-medium">Şarj Ünitesi</div>
            <div className="text-xs text-gray-600">Her koltuğa</div>
          </div>
        </div>
      </div>
    </div>
  );
}
