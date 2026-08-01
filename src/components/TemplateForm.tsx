'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import type { TemplateActionState } from '@/lib/actions/templates';

type Initial = {
  name: string;
  category: string;
  thumbnail: string;
  previewUrl: string;
  isPremium: boolean;
};

type Props = {
  action: (prevState: TemplateActionState, formData: FormData) => Promise<TemplateActionState>;
  initial?: Initial;
  submitLabel: string;
};

export default function TemplateForm({ action, initial, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="admin-form">
      {state?.error && <div className="admin-form-error">{state.error}</div>}

      <div className="admin-form-field">
        <label htmlFor="name">Nama Tema</label>
        <input id="name" name="name" type="text" defaultValue={initial?.name} required />
      </div>

      <div className="admin-form-field">
        <label htmlFor="category">Kategori</label>
        <input
          id="category"
          name="category"
          type="text"
          list="category-suggestions"
          defaultValue={initial?.category}
          placeholder="mis. Floral Elegant, Premium, Adat"
          required
        />
        <datalist id="category-suggestions">
          <option value="Floral Elegant" />
          <option value="Premium" />
          <option value="Modern Simple" />
          <option value="Adat" />
          <option value="Minimalist Earthy" />
        </datalist>
      </div>

      <div className="admin-form-field">
        <label htmlFor="thumbnail">URL Thumbnail</label>
        <input
          id="thumbnail"
          name="thumbnail"
          type="url"
          defaultValue={initial?.thumbnail}
          placeholder="https://..."
          required
        />
        <p className="admin-form-hint">
          Tempel URL gambar untuk sekarang. Upload file langsung menyusul setelah object storage
          terpasang (lihat to-do &ldquo;Upload galeri foto &amp; video&rdquo;).
        </p>
      </div>

      <div className="admin-form-field">
        <label htmlFor="previewUrl">URL Preview (opsional)</label>
        <input
          id="previewUrl"
          name="previewUrl"
          type="url"
          defaultValue={initial?.previewUrl}
          placeholder="Link demo undangan yang pakai tema ini"
        />
      </div>

      <div className="admin-form-field">
        <label className="admin-form-checkbox">
          <input type="checkbox" name="isPremium" defaultChecked={initial?.isPremium} />
          Tema Premium
        </label>
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn-admin btn-admin-primary" disabled={isPending}>
          {isPending ? 'Menyimpan...' : submitLabel}
        </button>
        <Link href="/admin/templates" className="btn-admin btn-admin-secondary">
          Batal
        </Link>
      </div>
    </form>
  );
}
