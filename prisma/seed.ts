import { PrismaClient, BusType } from '@/lib/generated/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Şehirler
  const cities = await Promise.all([
    prisma.city.upsert({
      where: { id: 'istanbul' },
      update: {},
      create: {
        id: 'istanbul',
        name: 'İstanbul',
      },
    }),
    prisma.city.upsert({
      where: { id: 'ankara' },
      update: {},
      create: {
        id: 'ankara',
        name: 'Ankara',
      },
    }),
    prisma.city.upsert({
      where: { id: 'izmir' },
      update: {},
      create: {
        id: 'izmir',
        name: 'İzmir',
      },
    }),
    prisma.city.upsert({
      where: { id: 'antalya' },
      update: {},
      create: {
        id: 'antalya',
        name: 'Antalya',
      },
    }),
    prisma.city.upsert({
      where: { id: 'bursa' },
      update: {},
      create: {
        id: 'bursa',
        name: 'Bursa',
      },
    }),
    prisma.city.upsert({
      where: { id: 'adana' },
      update: {},
      create: {
        id: 'adana',
        name: 'Adana',
      },
    }),
    prisma.city.upsert({
      where: { id: 'konya' },
      update: {},
      create: {
        id: 'konya',
        name: 'Konya',
      },
    }),
    prisma.city.upsert({
      where: { id: 'gaziantep' },
      update: {},
      create: {
        id: 'gaziantep',
        name: 'Gaziantep',
      },
    }),
  ])

  console.log(`✅ Created ${cities.length} cities`)

  // Otobüs Şirketleri
  const companies = await Promise.all([
    prisma.company.upsert({
      where: { id: 'metro' },
      update: {},
      create: {
        id: 'metro',
        name: 'Metro Turizm',
        logo: '/logos/metro.png',
      },
    }),
    prisma.company.upsert({
      where: { id: 'pamukkale' },
      update: {},
      create: {
        id: 'pamukkale',
        name: 'Pamukkale Turizm',
        logo: '/logos/pamukkale.png',
      },
    }),
    prisma.company.upsert({
      where: { id: 'ulusoy' },
      update: {},
      create: {
        id: 'ulusoy',
        name: 'Ulusoy',
        logo: '/logos/ulusoy.png',
      },
    }),
    prisma.company.upsert({
      where: { id: 'varan' },
      update: {},
      create: {
        id: 'varan',
        name: 'Varan Turizm',
        logo: '/logos/varan.png',
      },
    }),
    prisma.company.upsert({
      where: { id: 'kamil-koc' },
      update: {},
      create: {
        id: 'kamil-koc',
        name: 'Kamil Koç',
        logo: '/logos/kamil-koc.png',
      },
    }),
  ])

  console.log(`✅ Created ${companies.length} companies`)

  // Otobüsler
  const buses = await Promise.all([
    // Metro Turizm otobüsleri
    prisma.bus.upsert({
      where: { id: 'metro-bus-1' },
      update: {},
      create: {
        id: 'metro-bus-1',
        companyId: 'metro',
        plateNumber: '34 MT 001',
        model: 'Mercedes Travego',
        capacity: 49,
        type: BusType.TWO_PLUS_ONE,
      },
    }),
    prisma.bus.upsert({
      where: { id: 'metro-bus-2' },
      update: {},
      create: {
        id: 'metro-bus-2',
        companyId: 'metro',
        plateNumber: '34 MT 002',
        model: 'Setra S516 HD',
        capacity: 52,
        type: BusType.TWO_PLUS_TWO,
      },
    }),
    // Pamukkale Turizm otobüsleri
    prisma.bus.upsert({
      where: { id: 'pamukkale-bus-1' },
      update: {},
      create: {
        id: 'pamukkale-bus-1',
        companyId: 'pamukkale',
        plateNumber: '20 PM 001',
        model: 'MAN Lion\'s Coach',
        capacity: 49,
        type: BusType.TWO_PLUS_ONE,
      },
    }),
    prisma.bus.upsert({
      where: { id: 'pamukkale-bus-2' },
      update: {},
      create: {
        id: 'pamukkale-bus-2',
        companyId: 'pamukkale',
        plateNumber: '20 PM 002',
        model: 'Mercedes Tourismo',
        capacity: 45,
        type: BusType.TWO_PLUS_ONE,
      },
    }),
    // Ulusoy otobüsleri
    prisma.bus.upsert({
      where: { id: 'ulusoy-bus-1' },
      update: {},
      create: {
        id: 'ulusoy-bus-1',
        companyId: 'ulusoy',
        plateNumber: '06 UL 001',
        model: 'Neoplan Cityliner',
        capacity: 52,
        type: BusType.TWO_PLUS_TWO,
      },
    }),
    // Varan Turizm otobüsleri
    prisma.bus.upsert({
      where: { id: 'varan-bus-1' },
      update: {},
      create: {
        id: 'varan-bus-1',
        companyId: 'varan',
        plateNumber: '35 VR 001',
        model: 'Setra S431 DT',
        capacity: 49,
        type: BusType.TWO_PLUS_ONE,
      },
    }),
    // Kamil Koç otobüsleri
    prisma.bus.upsert({
      where: { id: 'kamil-koc-bus-1' },
      update: {},
      create: {
        id: 'kamil-koc-bus-1',
        companyId: 'kamil-koc',
        plateNumber: '16 KK 001',
        model: 'Mercedes Travego',
        capacity: 45,
        type: BusType.TWO_PLUS_ONE,
      },
    }),
  ])

  console.log(`✅ Created ${buses.length} buses`)

  // Aktif Seferler
  const now = new Date()
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000)
  const dayAfterTomorrow = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)

  const trips = await Promise.all([
    // İstanbul - Ankara seferleri
    prisma.trip.upsert({
      where: { id: 'trip-1' },
      update: {},
      create: {
        id: 'trip-1',
        busId: 'metro-bus-1',
        departureCityId: 'istanbul',
        arrivalCityId: 'ankara',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 0),
        arrivalTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 13, 30),
        price: 250.00,
        availableSeats: 45,
        isActive: true,
      },
    }),
    prisma.trip.upsert({
      where: { id: 'trip-2' },
      update: {},
      create: {
        id: 'trip-2',
        busId: 'pamukkale-bus-1',
        departureCityId: 'istanbul',
        arrivalCityId: 'ankara',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 0),
        arrivalTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 19, 30),
        price: 280.00,
        availableSeats: 42,
        isActive: true,
      },
    }),
    // Ankara - İstanbul seferleri
    prisma.trip.upsert({
      where: { id: 'trip-3' },
      update: {},
      create: {
        id: 'trip-3',
        busId: 'ulusoy-bus-1',
        departureCityId: 'ankara',
        arrivalCityId: 'istanbul',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0),
        arrivalTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 14, 30),
        price: 260.00,
        availableSeats: 48,
        isActive: true,
      },
    }),
    // İstanbul - İzmir seferleri
    prisma.trip.upsert({
      where: { id: 'trip-4' },
      update: {},
      create: {
        id: 'trip-4',
        busId: 'varan-bus-1',
        departureCityId: 'istanbul',
        arrivalCityId: 'izmir',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 20, 0),
        arrivalTime: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 6, 30),
        price: 320.00,
        availableSeats: 41,
        isActive: true,
      },
    }),
    // İzmir - İstanbul seferleri
    prisma.trip.upsert({
      where: { id: 'trip-5' },
      update: {},
      create: {
        id: 'trip-5',
        busId: 'kamil-koc-bus-1',
        departureCityId: 'izmir',
        arrivalCityId: 'istanbul',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 21, 30),
        arrivalTime: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 8, 0),
        price: 310.00,
        availableSeats: 39,
        isActive: true,
      },
    }),
    // Ankara - İzmir seferleri
    prisma.trip.upsert({
      where: { id: 'trip-6' },
      update: {},
      create: {
        id: 'trip-6',
        busId: 'metro-bus-2',
        departureCityId: 'ankara',
        arrivalCityId: 'izmir',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 16, 0),
        arrivalTime: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 2, 30),
        price: 290.00,
        availableSeats: 46,
        isActive: true,
      },
    }),
    // İstanbul - Antalya seferleri
    prisma.trip.upsert({
      where: { id: 'trip-7' },
      update: {},
      create: {
        id: 'trip-7',
        busId: 'pamukkale-bus-2',
        departureCityId: 'istanbul',
        arrivalCityId: 'antalya',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 22, 0),
        arrivalTime: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 12, 0),
        price: 450.00,
        availableSeats: 38,
        isActive: true,
      },
    }),
    // Ankara - Adana seferleri
    prisma.trip.upsert({
      where: { id: 'trip-8' },
      update: {},
      create: {
        id: 'trip-8',
        busId: 'varan-bus-1',
        departureCityId: 'ankara',
        arrivalCityId: 'adana',
        departureTime: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 18, 30),
        arrivalTime: new Date(dayAfterTomorrow.getFullYear(), dayAfterTomorrow.getMonth(), dayAfterTomorrow.getDate(), 4, 0),
        price: 380.00,
        availableSeats: 44,
        isActive: true,
      },
    }),
  ])

  console.log(`✅ Created ${trips.length} active trips`)

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })