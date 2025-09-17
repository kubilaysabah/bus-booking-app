# Bus Booking App

Modern Next.js (App Router) + Prisma + SQLite ile geliştirilmiş bir otobüs bileti rezervasyon uygulaması.

## Gereksinimler
- Node.js >= 18.18 (önerilen: 20 LTS)
- pnpm >= 9 (alternatif olarak npm/yarn kullanabilirsiniz)

## Hızlı Başlangıç
1) Bağımlılıkları yükleyin
- pnpm install

2) Ortam değişkenlerini ayarlayın
- cp .env.example .env
- .env içindeki değerleri ihtiyacınıza göre güncelleyin

3) Prisma Client üretin ve veritabanını hazırlayın
- pnpm generate
- pnpm migrate  # ilk migration işlemini başlatır (gerekirse isim isteyebilir)
- pnpm seed     # örnek veri yükler (şehirler, firmalar, otobüsler, seferler)

4) Geliştirme sunucusunu başlatın
- pnpm dev

Uygulama varsayılan olarak http://localhost:3000 adresinde çalışır.

## Komutlar
- pnpm dev          # Geliştirme modunda çalıştırma (Turbopack)
- pnpm build        # Production build (Turbopack)
- pnpm start        # Build sonrası production sunucusu
- pnpm lint         # ESLint kontrolü
- pnpm generate     # Prisma Client üretimi
- pnpm migrate      # Prisma migrate dev
- pnpm migrate:reset# Veritabanını sıfırlar ve migrasyonları yeniden uygular
- pnpm prisma:studio# Prisma Studio (GUI)
- pnpm seed         # Örnek veri yükleme

## Ortam Değişkenleri
`.env` dosyanıza aşağıdaki değişkenleri tanımlayın (bkz. `.env.example`).

Not: `.env.example` dosyasını depo kuralları nedeniyle otomatik olarak oluşturamadık. Eğer kökte `.env.example` yoksa aşağıdaki örneği kopyalayıp `.env` dosyası oluşturabilirsiniz:

```env
# Prisma CLI için veritabanı bağlantısı (SQLite)
DATABASE_URL="file:./prisma/dev.sqlite"

# Oturum (JWT) imzalama anahtarı. Uzun ve rastgele bir değer kullanın
SESSION_SECRET="replace-with-a-long-random-string"

# Frontend tarafındaki Axios base URL (opsiyonel)
NEXT_PUBLIC_BASE_API_URL="http://localhost:3000/api/"
```

- DATABASE_URL: Prisma için SQLite dosya yolu. CLI araçları bu değeri okur.
- SESSION_SECRET: Oturum (JWT) imzalama anahtarı. Rastgele uzun bir dize olmalı.
- NEXT_PUBLIC_BASE_API_URL: İsteğe bağlı. Frontend'in Axios taban URL'si. Varsayılan: http://localhost:3000/api/

Hızlı bir `SESSION_SECRET` üretmek için:
- node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

Notlar:
- Kod tarafında Prisma, `@prisma/adapter-better-sqlite3` kullanarak `prisma/dev.sqlite` dosyasını kullanacak şekilde ayarlanmıştır (`lib/prisma.ts`). Ancak Prisma CLI (migrate/generate) `.env` içindeki `DATABASE_URL` değişkenine bakar. Bu yüzden `.env` içinde `DATABASE_URL`'ı mutlaka tanımlayın.

## Veritabanı ve Seed
- Şema: prisma/schema.prisma
- Seed komutu: pnpm seed (prisma/seed.ts)
- Seed verisi; örnek şehirler, firmalar, otobüsler ve yakın tarihler için aktif seferler oluşturur.
- Seed bazı logo yollarına (/public/logos/*.png) referans verebilir. Görseller yoksa kritik değildir; arayüzde yalnızca logo görüntülenmez.

## Kimlik Doğrulama ve Oturum
- Oturumlar `jose` ile imzalanan JWT olarak cookie içinde tutulur (`lib/session.ts`).
- SESSION_SECRET olmadan giriş/çıkış akışı doğru çalışmaz.
- `middleware.ts` dosyası `/profile` gibi korunan rotalara erişimi kontrol eder.

## Geliştirme İpuçları
- İlk kurulumda sırasıyla `pnpm install`, `pnpm generate`, `pnpm migrate`, `pnpm seed`, ardından `pnpm dev` çalıştırın.
- Model değiştirirseniz yeniden `pnpm generate` ve gerekirse `pnpm migrate` çalıştırın.
- Prisma Studio ile verileri görsellemek için `pnpm prisma:studio` kullanın.

## Sorun Giderme
- Prisma Client bulunamadı hatası: `pnpm generate` çalıştırın.
- Migration sırasında hata: `pnpm migrate:reset` ile veritabanını sıfırlayıp tekrar deneyin (geliştirme ortamı için uygundur).
- 401/redirect sorunları: `.env` içinde `SESSION_SECRET` tanımlı olduğundan emin olun ve tarayıcı cookie'lerini temizleyin.
- API istekleri farklı bir backend'e gidecekse `NEXT_PUBLIC_BASE_API_URL` değerini güncelleyin.

## Teknolojiler
- Next.js 15 (App Router), React 19
- Prisma 6, SQLite (better-sqlite3 adapter)
- Tailwind CSS 4
- Zod, Axios, TanStack Query
