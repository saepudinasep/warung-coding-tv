import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const adminPassword = await bcrypt.hash('admin12345', 10);

  await prisma.user.update({
    where: {
      email: 'admin@warungcoding.tv',
    },
    data: {
      password: adminPassword,
    },
  });

  const staffPassword = await bcrypt.hash('staff12345', 10);

  await prisma.user.update({
    where: {
      email: 'staff@warungcoding.tv',
    },
    data: {
      password: staffPassword,
    },
  });

  console.log('Password admin dan staff berhasil diperbarui.');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });