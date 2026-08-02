import { BrevoClient } from '@getbrevo/brevo';

const brevo = process.env.BREVO_API_KEY
  ? new BrevoClient({ apiKey: process.env.BREVO_API_KEY })
  : null;

const SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL ?? '';
const SENDER_NAME = process.env.BREVO_SENDER_NAME ?? 'Warung Coding TV';

export async function sendVerificationEmail(
  to: string,
  name: string,
  link: string,
): Promise<{ sent: boolean }> {
  // Kalau BREVO_API_KEY/BREVO_SENDER_EMAIL belum diisi di .env, jangan crash —
  // biarkan caller fallback ke tampilkan link verifikasi langsung di UI.
  if (!brevo || !SENDER_EMAIL) {
    return { sent: false };
  }

  try {
    await brevo.transactionalEmails.sendTransacEmail({
      sender: { email: SENDER_EMAIL, name: SENDER_NAME },
      to: [{ email: to, name }],
      subject: 'Verifikasi email Anda — Warung Coding TV',
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #1a0f06;">
          <h2 style="color:#0D1B2A; font-weight:600;">Halo, ${name} 👋</h2>
          <p style="font-size:14px; line-height:1.6;">
            Terima kasih sudah mendaftar di <strong>Warung Coding TV</strong>. Klik tombol di bawah
            untuk memverifikasi email Anda sebelum membuat undangan pertama.
          </p>
          <p style="text-align:center; margin: 32px 0;">
            <a href="${link}" style="background:#C9A96E; color:#0D1B2A; padding:12px 28px; border-radius:6px; text-decoration:none; font-weight:600; font-size:14px; display:inline-block;">
              Verifikasi Email
            </a>
          </p>
          <p style="font-size:12px; color:#5C4A3A; line-height:1.6;">
            Atau salin link ini ke browser:<br />
            <a href="${link}" style="color:#5C4A3A;">${link}</a>
          </p>
          <p style="font-size:12px; color:#9C8A7A; margin-top:24px;">
            Link ini berlaku selama 24 jam. Kalau Anda tidak merasa mendaftar, abaikan email ini.
          </p>
        </div>
      `,
    });

    return { sent: true };
  } catch (err) {
    console.error('Gagal mengirim email verifikasi (Brevo):', err);
    return { sent: false };
  }
}
