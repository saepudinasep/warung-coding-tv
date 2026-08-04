import { NextResponse } from 'next/server';
import * as XLSX from 'xlsx';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { generateUniqueGuestSlug } from '@/lib/actions/guests';

const NAME_KEYS = ['nama', 'name', 'nama tamu'];
const PHONE_KEYS = ['telepon', 'phone', 'wa', 'whatsapp', 'no hp', 'nomor', 'no whatsapp', 'hp'];
const COUNT_KEYS = ['jumlah', 'jumlah tamu', 'guestcount', 'count', 'pax'];

function findValue(row: Record<string, unknown>, keys: string[]): string {
  for (const key of Object.keys(row)) {
    if (keys.includes(key.trim().toLowerCase())) {
      return String(row[key] ?? '').trim();
    }
  }
  return '';
}

export async function POST(request: Request) {
  const session = await auth();
  if (session?.user?.userType !== 'customer') {
    return NextResponse.json({ error: 'Akses ditolak.' }, { status: 401 });
  }

  const formData = await request.formData();
  const invitationId = String(formData.get('invitationId') ?? '');
  const file = formData.get('file');

  if (!invitationId || !(file instanceof File)) {
    return NextResponse.json({ error: 'File dan invitationId wajib dikirim.' }, { status: 400 });
  }

  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: { order: true },
  });
  if (!invitation || invitation.order.customerId !== session.user.id) {
    return NextResponse.json({ error: 'Undangan tidak ditemukan.' }, { status: 404 });
  }

  let rows: Record<string, unknown>[];
  try {
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(firstSheet, { defval: '' });
  } catch {
    return NextResponse.json(
      { error: 'Gagal membaca file. Pastikan formatnya CSV atau Excel (.xlsx) yang valid.' },
      { status: 400 },
    );
  }

  if (rows.length === 0) {
    return NextResponse.json(
      { error: 'File kosong atau tidak ada baris data yang terbaca.' },
      { status: 400 },
    );
  }

  let success = 0;
  let skipped = 0;

  for (const row of rows) {
    const name = findValue(row, NAME_KEYS);
    const phone = findValue(row, PHONE_KEYS);
    const countRaw = findValue(row, COUNT_KEYS);
    const guestCount = Math.max(1, parseInt(countRaw, 10) || 1);

    if (name.length < 2 || phone.length < 8) {
      skipped += 1;
      continue;
    }

    try {
      const slug = await generateUniqueGuestSlug(invitationId, name);
      await prisma.guest.create({
        data: { invitationId, name, phone, guestCount, slug },
      });
      success += 1;
    } catch {
      skipped += 1;
    }
  }

  return NextResponse.json({ success, skipped, total: rows.length });
}
