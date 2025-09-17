import { Trip } from "@/components/trip-list";

export const generateMockTrips = (from: string, to: string, date: Date): Trip[] => {
  const companies = [
    { name: "Metro Turizm", rating: 4.5 },
    { name: "Pamukkale Turizm", rating: 4.3 },
    { name: "Ulusoy", rating: 4.2 },
    { name: "Kamil Koç", rating: 4.4 },
    { name: "Varan Turizm", rating: 4.6 },
    { name: "Nilüfer Turizm", rating: 4.1 },
  ];

  const amenities = [
    ["WiFi", "İkram", "Klima", "TV"],
    ["WiFi", "İkram", "Klima", "USB Şarj"],
    ["WiFi", "İkram", "Klima", "TV", "Battaniye"],
    ["WiFi", "İkram", "Klima", "USB Şarj", "Yastık"],
    ["WiFi", "İkram", "Klima", "TV", "USB Şarj", "Battaniye"],
  ];

  const trips: Trip[] = [];
  
  // Generate 6-8 trips for the route
  const tripCount = Math.floor(Math.random() * 3) + 6;
  
  for (let i = 0; i < tripCount; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const basePrice = Math.floor(Math.random() * 100) + 80; // 80-180 TL
    const departureHour = Math.floor(Math.random() * 20) + 6; // 06:00 - 02:00
    const departureMinute = Math.random() > 0.5 ? 0 : 30;
    const duration = Math.floor(Math.random() * 4) + 4; // 4-8 hours
    const durationMinutes = Math.floor(Math.random() * 60);
    
    const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
    const arrivalHour = (departureHour + duration) % 24;
    const arrivalMinute = (departureMinute + durationMinutes) % 60;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
    
    const totalSeats = 40;
    const availableSeats = Math.floor(Math.random() * 35) + 5; // 5-40 available seats
    
    trips.push({
      id: `trip-${i + 1}`,
      company: company.name,
      from,
      to,
      departureTime,
      arrivalTime,
      duration: `${duration}s ${durationMinutes}dk`,
      price: basePrice,
      availableSeats,
      totalSeats,
      rating: company.rating,
      amenities: amenities[Math.floor(Math.random() * amenities.length)],
      date,
    });
  }
  
  // Sort by departure time
  return trips.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
};

export const cities = [
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
  "Trabzon",
  "Erzurum",
  "Malatya",
  "Van",
  "Samsun",
  "Denizli",
  "Eskişehir",
  "Kayseri",
  "Şanlıurfa",
  "Hatay"
];
