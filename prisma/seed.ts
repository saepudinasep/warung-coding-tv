import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // --- Packages -------------------------------------------------
  await prisma.package.upsert({
    where: { id: 'pkg-gratis' },
    update: {},
    create: {
      id: 'pkg-gratis',
      name: 'Gratis',
      price: 0,
      maxInvitation: 1,
      maxGuest: 50,
      activeDays: 14,
      features: ['1 undangan', 'Maks. 50 tamu', 'Aktif 14 hari', 'Watermark Warung Coding TV'],
    },
  });

  await prisma.package.upsert({
    where: { id: 'pkg-premium' },
    update: {},
    create: {
      id: 'pkg-premium',
      name: 'Premium',
      price: 149_000,
      maxInvitation: 1,
      maxGuest: null,
      activeDays: null,
      features: [
        '1 undangan',
        'Tamu unlimited',
        'Aktif selamanya',
        'Tanpa watermark',
        'RSVP & ucapan',
      ],
    },
  });

  await prisma.package.upsert({
    where: { id: 'pkg-duo' },
    update: {},
    create: {
      id: 'pkg-duo',
      name: 'Duo',
      price: 249_000,
      maxInvitation: 2,
      maxGuest: null,
      activeDays: null,
      features: [
        '2 undangan',
        'Tamu unlimited',
        'Aktif selamanya',
        'Tanpa watermark',
        'WhatsApp blast',
      ],
    },
  });

  // --- Admin user -------------------------------------------------
  const hashedPassword = await bcrypt.hash('ganti-password-ini', 10);
  await prisma.user.upsert({
    where: { email: 'admin@warungcoding.tv' },
    update: {},
    create: {
      name: 'Admin',
      email: 'admin@warungcoding.tv',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // --- Dummy customers + orders (untuk demo Dashboard CRM) --------
  const customerPassword = await bcrypt.hash('customer123', 10);
  const dummyCustomers = [
    {
      name: 'Anisa Putri',
      email: 'anisa@example.com',
      phone: '081234567801',
      pkg: 'pkg-premium',
      status: 'PAID' as const,
    },
    {
      name: 'Rizal Hidayat',
      email: 'rizal@example.com',
      phone: '081234567802',
      pkg: 'pkg-duo',
      status: 'PAID' as const,
    },
    {
      name: 'Dewi Lestari',
      email: 'dewi@example.com',
      phone: '081234567803',
      pkg: 'pkg-gratis',
      status: 'PAID' as const,
    },
    {
      name: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '081234567804',
      pkg: 'pkg-premium',
      status: 'PENDING' as const,
    },
  ];

  for (const c of dummyCustomers) {
    const customer = await prisma.customer.upsert({
      where: { email: c.email },
      update: {},
      create: {
        name: c.name,
        email: c.email,
        phone: c.phone,
        password: customerPassword,
      },
    });

    const pkg = await prisma.package.findUniqueOrThrow({ where: { id: c.pkg } });

    await prisma.order.create({
      data: {
        customerId: customer.id,
        packageId: pkg.id,
        status: c.status,
        totalAmount: pkg.price,
      },
    });
  }

  console.log('Seed selesai: 3 Package + 1 User admin + 4 Customer dummy dengan order.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
