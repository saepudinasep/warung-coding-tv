import { prisma } from '@/lib/prisma';
import ThemeGalleryClient from './ThemeGalleryClient';

export default async function ThemeGallery() {
  const templates = await prisma.template.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'desc' },
    select: { id: true, name: true, category: true, thumbnail: true, isPremium: true },
  });

  return <ThemeGalleryClient templates={templates} />;
}
