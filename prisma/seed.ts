import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Packages -------------------------------------------------
  await prisma.package.upsert({
    where: { id: "pkg-gratis" },
    update: {},
    create: {
      id: "pkg-gratis",
      name: "Gratis",
      price: 0,
      maxInvitation: 1,
      maxGuest: 50,
      activeDays: 14,
      features: ["1 undangan", "Maks. 50 tamu", "Aktif 14 hari", "Watermark Amoura"],
    },
  });

  await prisma.package.upsert({
    where: { id: "pkg-premium" },
    update: {},
    create: {
      id: "pkg-premium",
      name: "Premium",
      price: 149_000,
      maxInvitation: 1,
      maxGuest: null,
      activeDays: null,
      features: ["1 undangan", "Tamu unlimited", "Aktif selamanya", "Tanpa watermark", "RSVP & ucapan"],
    },
  });

  await prisma.package.upsert({
    where: { id: "pkg-duo" },
    update: {},
    create: {
      id: "pkg-duo",
      name: "Duo",
      price: 249_000,
      maxInvitation: 2,
      maxGuest: null,
      activeDays: null,
      features: ["2 undangan", "Tamu unlimited", "Aktif selamanya", "Tanpa watermark", "WhatsApp blast"],
    },
  });

  // --- Admin user -------------------------------------------------
  const hashedPassword = await bcrypt.hash("ganti-password-ini", 10);
  await prisma.user.upsert({
    where: { email: "admin@warungcoding.tv" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@warungcoding.tv",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Seed selesai: 3 Package + 1 User admin.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
