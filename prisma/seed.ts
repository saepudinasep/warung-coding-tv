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

  // --- Staff user (untuk uji role-based access control) -----------
  const staffPassword = await bcrypt.hash('ganti-password-ini', 10);
  await prisma.user.upsert({
    where: { email: 'staff@warungcoding.tv' },
    update: {},
    create: {
      name: 'Staff CS',
      email: 'staff@warungcoding.tv',
      password: staffPassword,
      role: 'STAFF',
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

    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        packageId: pkg.id,
        status: c.status,
        totalAmount: pkg.price,
      },
    });

    if (c.status === 'PAID' && pkg.price > 0) {
      await prisma.payment.create({
        data: {
          orderId: order.id,
          amount: pkg.price,
          method: 'QRIS',
          status: 'SUCCESS',
          providerRefId: `DEMO-${order.id.slice(-6).toUpperCase()}`,
          paidAt: new Date(),
        },
      });
    }
  }

  // --- Templates (untuk demo CRUD & ThemeGallery) ------------------
  const templates = [
    {
      id: 'tpl-ivory-garden',
      name: 'Ivory Garden',
      category: 'Floral Elegant',
      color: 'E8D5C4/5C4A3A',
      isPremium: false,
    },
    {
      id: 'tpl-midnight-gold',
      name: 'Midnight Gold',
      category: 'Premium',
      color: '1E2F42/C9A96E',
      isPremium: true,
    },
    {
      id: 'tpl-warm-bloom',
      name: 'Warm Bloom',
      category: 'Warm Romantic',
      color: 'EAD8B8/5C3A1E',
      isPremium: false,
    },
    {
      id: 'tpl-langit-malam',
      name: 'Langit Malam',
      category: 'Adat Modern',
      color: '16213E/E8C5B0',
      isPremium: true,
    },
  ];

  for (const t of templates) {
    await prisma.template.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        name: t.name,
        category: t.category,
        thumbnail: `https://placehold.co/400x560/${t.color}?text=${encodeURIComponent(t.name)}`,
        isPremium: t.isPremium,
      },
    });
  }

  console.log(
    'Seed selesai: 3 Package + 1 User admin + 1 User staff + 4 Customer dummy dengan order + 4 Template.',
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
