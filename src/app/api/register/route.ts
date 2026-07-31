import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: 'Data tidak valid.' }, { status: 400 });
  }

  const { name, email, phone, password } = body as Record<string, unknown>;

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof phone !== 'string' ||
    typeof password !== 'string' ||
    name.trim().length < 2 ||
    !email.includes('@') ||
    phone.trim().length < 8 ||
    password.length < 8
  ) {
    return NextResponse.json(
      { error: 'Pastikan semua field terisi benar. Password minimal 8 karakter.' },
      { status: 400 },
    );
  }

  const existing = await prisma.customer.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email sudah terdaftar.' }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.customer.create({
    data: { name, email, phone, password: hashedPassword },
  });

  return NextResponse.json({ success: true });
}
