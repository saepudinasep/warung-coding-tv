# Warung Coding TV

Platform undangan pernikahan digital + CRM internal. Dibangun dengan Next.js (App Router), Prisma, dan Neon (PostgreSQL).

## Tech Stack

- **Framework**: Next.js 16 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL via [Neon](https://neon.tech) (serverless)
- **ORM**: Prisma
- **Auth**: NextAuth (Credentials provider + bcrypt, custom — bukan third-party)
- **Lint/Format**: ESLint + Prettier (`prettier-plugin-tailwindcss`)

## 1. Clone & Install

```bash
npm install
```

## 2. Setup Database (Neon)

Bagian ini **wajib** dilakukan sebelum menjalankan aplikasi — tanpa ini, halaman admin/CRM dan fitur yang menyentuh database tidak akan berjalan.

1. Buat akun/login di [neon.tech](https://neon.tech), lalu klik **New Project**.
2. Beri nama project (misal `warung-coding-tv`), pilih region terdekat (Singapore paling dekat untuk Indonesia).
3. Setelah project dibuat, buka tab **Connect** di dashboard Neon. Kamu akan melihat dua jenis connection string:
   - **Pooled connection** (ada `-pooler` di hostname) → dipakai sebagai `DATABASE_URL`
   - **Direct connection** (tanpa `-pooler`) → dipakai sebagai `DIRECT_URL` (dibutuhkan Prisma khusus saat migrate)
4. Copy `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
5. Tempel kedua connection string tadi ke `DATABASE_URL` dan `DIRECT_URL` di `.env`.

## 3. Migrasi & Seed

Setelah `.env` terisi:

```bash
npm run db:migrate   # membuat semua tabel di Neon sesuai prisma/schema.prisma
npm run db:seed      # mengisi data awal: 3 Package (Gratis/Premium/Duo) + 1 User admin
```

Cek hasilnya lewat Prisma Studio (GUI database di browser):

```bash
npm run db:studio
```

> Catatan: `npm run db:seed` membuat user admin dengan email `admin@warungcoding.tv` dan password dummy `ganti-password-ini` (sudah di-hash bcrypt di `prisma/seed.ts`). **Wajib ganti password ini** sebelum dipakai di production — edit langsung di `prisma/seed.ts` sebelum seed pertama kali, atau update manual lewat Prisma Studio.

Kalau schema berubah di kemudian hari (nambah kolom/tabel baru), jalankan ulang `npm run db:migrate` untuk generate migration baru — jangan edit tabel di Neon secara manual.

## 4. Jalankan di Lokal

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 5. Deploy ke Vercel

1. Push repo ini ke GitHub (repo kosong, tanpa README dari GitHub):
   ```bash
   git remote add origin <url-repo-github>
   git branch -M main
   git push -u origin main
   ```
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → pilih repo `warung-coding-tv`. Vercel otomatis mendeteksi framework Next.js.
3. **Sebelum klik Deploy**, buka menu **Settings → Environment Variables** dan tambahkan variabel yang sama seperti di `.env` lokal:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `NEXTAUTH_SECRET` (generate string acak baru, jangan pakai punya lokal)
   - `NEXTAUTH_URL` (isi dengan domain Vercel setelah deploy pertama, misal `https://warung-coding-tv.vercel.app`)
4. Klik **Deploy**. Setiap push berikutnya ke branch `main` otomatis trigger deploy ulang.

## Script yang Tersedia

| Script                 | Fungsi                                   |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Menjalankan development server           |
| `npm run build`        | Build production                         |
| `npm run start`        | Menjalankan hasil build production       |
| `npm run lint`         | Cek ESLint                               |
| `npm run format`       | Merapikan format kode dengan Prettier    |
| `npm run format:check` | Cek format tanpa mengubah file           |
| `npm run db:migrate`   | Menjalankan migrasi Prisma ke database   |
| `npm run db:seed`      | Mengisi data awal (Package + User admin) |
| `npm run db:studio`    | Membuka Prisma Studio (GUI database)     |

## Struktur Project

```
prisma/
  schema.prisma      # skema database (User, Customer, Package, Order, Payment, Template, Invitation, Guest, Wish, Media)
  seed.ts             # data awal
src/
  app/                # routing (App Router)
  components/          # komponen landing page (Navbar, Hero, Pricing, dll — data-driven, siap disambung ke Prisma)
```
