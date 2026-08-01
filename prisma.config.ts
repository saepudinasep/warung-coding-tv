import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

// Prisma 7: konfigurasi CLI (migrate, db seed, studio, dst) pindah ke sini —
// bukan lagi di datasource block schema.prisma.
// url di sini dipakai CLI untuk migrate, jadi harus DIRECT_URL (non-pooled),
// bukan DATABASE_URL (pooled) yang dipakai PrismaClient saat runtime.
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: env('DIRECT_URL'),
  },
});
