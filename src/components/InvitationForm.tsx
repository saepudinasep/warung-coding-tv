'use client';

import { useActionState, useState } from 'react';
import Link from 'next/link';
import type { InvitationActionState } from '@/lib/actions/invitations';

type Template = {
  id: string;
  name: string;
  thumbnail: string;
};

type Initial = {
  groomName: string;
  brideName: string;
  eventDate: string;
  location: string;
  templateId: string;
};

type Props = {
  action: (prevState: InvitationActionState, formData: FormData) => Promise<InvitationActionState>;
  templates: Template[];
  initial?: Initial;
  submitLabel: string;
};

export default function InvitationForm({ action, templates, initial, submitLabel }: Props) {
  const [state, formAction, isPending] = useActionState(action, undefined);
  const [selectedTemplate, setSelectedTemplate] = useState(initial?.templateId ?? '');

  return (
    <form action={formAction} className="admin-form" style={{ maxWidth: 640 }}>
      {state?.error && <div className="admin-form-error">{state.error}</div>}

      <div className="admin-form-field">
        <label htmlFor="groomName">Nama Mempelai Pria</label>
        <input
          id="groomName"
          name="groomName"
          type="text"
          defaultValue={initial?.groomName}
          required
        />
      </div>

      <div className="admin-form-field">
        <label htmlFor="brideName">Nama Mempelai Wanita</label>
        <input
          id="brideName"
          name="brideName"
          type="text"
          defaultValue={initial?.brideName}
          required
        />
      </div>

      <div className="admin-form-field">
        <label htmlFor="eventDate">Tanggal &amp; Waktu Acara</label>
        <input
          id="eventDate"
          name="eventDate"
          type="datetime-local"
          defaultValue={initial?.eventDate}
          required
        />
      </div>

      <div className="admin-form-field">
        <label htmlFor="location">Lokasi Acara (opsional)</label>
        <input
          id="location"
          name="location"
          type="text"
          defaultValue={initial?.location}
          placeholder="mis. Gedung Serbaguna, Jl. Merdeka No. 1, Cirebon"
        />
      </div>

      <div className="admin-form-field">
        <label>Pilih Tema</label>
        <input type="hidden" name="templateId" value={selectedTemplate} />
        {templates.length === 0 ? (
          <p className="admin-form-hint">Belum ada tema tersedia. Hubungi admin.</p>
        ) : (
          <div className="template-picker-grid">
            {templates.map((t) => (
              <div
                key={t.id}
                className={`template-picker-card${selectedTemplate === t.id ? 'selected' : ''}`}
                onClick={() => setSelectedTemplate(t.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') setSelectedTemplate(t.id);
                }}
              >
                <div className="template-picker-thumb">
                  <img src={t.thumbnail} alt={t.name} loading="lazy" />
                </div>
                <div className="template-picker-name">{t.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-form-actions">
        <button type="submit" className="btn-admin btn-admin-primary" disabled={isPending}>
          {isPending ? 'Menyimpan...' : submitLabel}
        </button>
        <Link href="/dashboard" className="btn-admin btn-admin-secondary">
          Batal
        </Link>
      </div>
    </form>
  );
}
