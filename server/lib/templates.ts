// ---------------------------------------------------------------------------
// Templates e-mail — AEGIS NETWORK
// ---------------------------------------------------------------------------
// Contenu provisoire, sobre et professionnel.
// Les textes sont centralisés ici pour faciliter les modifications futures.
// ---------------------------------------------------------------------------

import type { ContactPayload } from './validation.js';

// ── Helpers ─────────────────────────────────────────────────────────────────

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatDate(): string {
  return new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date());
}

// ── Mail interne (notification) ─────────────────────────────────────────────

export function buildInternalNotification(
  data: ContactPayload,
  meta?: { ip?: string; userAgent?: string },
) {
  const isCallback = data.type === 'callback';

  const subject = isCallback
    ? `[Site AEGIS] Demande de rappel — ${data.name || 'Sans nom'}`
    : `[Site AEGIS] Nouvelle demande de contact — ${data.name}`;

  // ── Version texte brut ────────────────────────────────────────────────
  const text = [
    `Nom : ${data.name || '—'}`,
    `Email : ${data.email}`,
    data.phone ? `Téléphone : ${data.phone}` : null,
    data.company ? `Entreprise : ${data.company}` : null,
    `Type : ${isCallback ? 'Demande de rappel' : 'Message'}`,
    '',
    data.message ? `Message :\n${data.message}` : null,
    '',
    data.diagnostic
      ? [
          '--- Diagnostic Express ---',
          `Score : ${data.diagnostic.score}/100`,
          `Niveau : ${data.diagnostic.level}`,
          `Points : ${data.diagnostic.points.join(', ')}`,
          `Priorité : ${data.diagnostic.priority}`,
        ].join('\n')
      : null,
    '',
    '--- Métadonnées ---',
    `Date : ${formatDate()}`,
    meta?.ip ? `IP : ${meta.ip}` : null,
    meta?.userAgent ? `User-Agent : ${meta.userAgent}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  // ── Version HTML ──────────────────────────────────────────────────────
  const htmlParts = [
    `<p><strong>Nom :</strong> ${escapeHtml(data.name || '—')}</p>`,
    `<p><strong>Email :</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>`,
    data.phone
      ? `<p><strong>Téléphone :</strong> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a></p>`
      : '',
    data.company
      ? `<p><strong>Entreprise :</strong> ${escapeHtml(data.company)}</p>`
      : '',
    `<p><strong>Type :</strong> ${isCallback ? 'Demande de rappel' : 'Message'}</p>`,
    data.message
      ? `<hr><p><strong>Message :</strong></p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`
      : '',
    data.diagnostic
      ? `<hr><p><strong>Diagnostic Express</strong></p>
      <ul>
        <li>Score : ${data.diagnostic.score}/100</li>
        <li>Niveau : ${escapeHtml(data.diagnostic.level)}</li>
        <li>Points : ${data.diagnostic.points.map((p) => escapeHtml(p)).join(', ')}</li>
        <li>Priorité : ${escapeHtml(data.diagnostic.priority)}</li>
      </ul>`
      : '',
    `<hr><p style="color:#888;font-size:12px">Envoyé le ${formatDate()}${meta?.ip ? ` · IP : ${escapeHtml(meta.ip)}` : ''}</p>`,
  ].join('\n');

  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px">
${htmlParts}
</body>
</html>`;

  return { subject, text, html };
}

// ── Mail d'accusé de réception (visiteur) ───────────────────────────────────

export function buildAcknowledgment(data: ContactPayload) {
  const isCallback = data.type === 'callback';
  const subject = 'Bien reçu — AEGIS NETWORK';
  const greeting = data.name ? ` ${data.name}` : '';

  // ── Version texte brut ────────────────────────────────────────────────
  const text = [
    `Bonjour${greeting},`,
    '',
    isCallback
      ? 'Nous avons bien reçu votre demande de rappel.'
      : 'Nous avons bien reçu votre message.',
    '',
    'Notre équipe en prend connaissance et reviendra vers vous dans les meilleurs délais.',
    '',
    'Cordialement,',
    'AEGIS NETWORK',
    'Conseil & Optimisation IT',
    '',
    'contact@aegisnetwork.fr',
    '06 52 95 00 10',
  ].join('\n');

  // ── Version HTML ──────────────────────────────────────────────────────
  const html = `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="utf-8"></head>
<body style="font-family:'Inter',Helvetica,Arial,sans-serif;color:#333;max-width:600px;margin:0 auto;padding:20px;background:#f8fafc">
  <div style="background:#ffffff;border-radius:12px;padding:32px;border:1px solid #e2e8f0">
    <div style="margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #3b82f6">
      <span style="font-size:18px;font-weight:900;letter-spacing:0.08em;color:#0f172a">AEGIS </span>
      <span style="font-size:18px;font-weight:900;letter-spacing:0.08em;color:#3b82f6">NETWORK</span>
      <br>
      <span style="font-size:10px;letter-spacing:0.25em;color:#94a3b8;text-transform:uppercase">Conseil &amp; Optimisation IT</span>
    </div>
    <p style="margin:0 0 16px">Bonjour${greeting ? ` ${escapeHtml(greeting.trim())}` : ''},</p>
    <p style="margin:0 0 16px">${isCallback ? 'Nous avons bien reçu votre demande de rappel.' : 'Nous avons bien reçu votre message.'}</p>
    <p style="margin:0 0 24px">Notre équipe en prend connaissance et reviendra vers vous dans les meilleurs délais.</p>
    <p style="margin:0 0 4px">Cordialement,</p>
    <p style="margin:0;font-weight:700;color:#0f172a">AEGIS NETWORK</p>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">
      <p style="margin:0"><a href="mailto:contact@aegisnetwork.fr" style="color:#3b82f6;text-decoration:none">contact@aegisnetwork.fr</a> · 06 52 95 00 10</p>
    </div>
  </div>
</body>
</html>`;

  return { subject, text, html };
}
