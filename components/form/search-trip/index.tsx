"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/datepicker";
import { ArrowLeftRight, Search } from "lucide-react";

interface SearchTripFormProps {
  onSearch: (searchData: {
    from: string;
    to: string;
    date: Date;
  }) => void;
}

const cities = [
  "İstanbul",
  "Ankara",
  "İzmir",
  "Antalya",
  "Bursa",
  "Adana",
  "Gaziantep",
  "Konya",
  "Mersin",
  "Diyarbakır",
];

export default function SearchTripForm({ onSearch }: SearchTripFormProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState<Date>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (from && to && date) {
      onSearch({ from, to, date });
    }
  };

  const swapCities = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Otobüs Bileti Ara
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {/* From City */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nereden
            </label>
            <Select value={from} onValueChange={setFrom}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                <SelectValue placeholder="Kalkış şehri seçin" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={swapCities}
              className="h-12 w-12 rounded-full border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>
          </div>

          {/* To City */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Nereye
            </label>
            <Select value={to} onValueChange={setTo}>
              <SelectTrigger className="h-12 border-2 border-gray-200 focus:border-blue-500">
                <SelectValue placeholder="Varış şehri seçin" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Gidiş Tarihi
            </label>
            <DatePicker
              value={date}
              onChange={setDate}
              placeholder="Tarih seçin"
              buttonClassName="h-12 border-2 border-gray-200 focus:border-blue-500"
              minDate={new Date()}
            />
          </div>
        </div>

        {/* Search Button */}
        <Button
          type="submit"
          className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          disabled={!from || !to || !date}
        >
          <Search className="mr-2 h-5 w-5" />
          Sefer Ara
        </Button>
      </form>
    </div>
  );
}
