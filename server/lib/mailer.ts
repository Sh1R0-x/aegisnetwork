// ---------------------------------------------------------------------------
// Module d'envoi SMTP — AEGIS NETWORK
// ---------------------------------------------------------------------------
// Encapsule la création du transporter Nodemailer, la vérification de la
// configuration SMTP et l'envoi des deux e-mails (notification + accusé).
// ---------------------------------------------------------------------------

import nodemailer from 'nodemailer';
import type { ContactPayload } from './validation.js';
import {
  buildInternalNotification,
  buildAcknowledgment,
} from './templates.js';

// ── Configuration (variables d'environnement) ───────────────────────────────

const smtpConfig = {
  host: process.env.SMTP_HOST || 'smtp.mail.ovh.net',
  port: parseInt(process.env.SMTP_PORT || '465', 10),
  secure: process.env.SMTP_SECURE !== 'false', // true par défaut (port 465)
  user: process.env.SMTP_USER || 'contact@aegisnetwork.fr',
  pass: process.env.SMTP_PASS || '',
  contactTo: process.env.CONTACT_TO || 'contact@aegisnetwork.fr',
  fromName: process.env.CONTACT_FROM_NAME || 'AEGIS NETWORK',
  fromEmail: process.env.CONTACT_FROM_EMAIL || 'website@aegisnetwork.fr',
};

// ── Transporter (singleton) ─────────────────────────────────────────────────

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter {
  if (!transporter) {
    if (!smtpConfig.pass) {
      throw new Error(
        'SMTP_PASS manquant. Définissez-le en variable d\'environnement serveur (jamais dans le code).',
      );
    }

    transporter = nodemailer.createTransport({
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }
  return transporter;
}

// ── Vérification SMTP ───────────────────────────────────────────────────────

export function isSmtpConfigured(): boolean {
  return smtpConfig.pass.length > 0;
}

export async function verifySmtp(): Promise<boolean> {
  if (!isSmtpConfigured()) {
    return false;
  }
  try {
    await getTransporter().verify();
    return true;
  } catch (err) {
    console.error('[SMTP] Verification failed:', (err as Error).message);
    return false;
  }
}

// ── Envoi des e-mails de contact ────────────────────────────────────────────

export async function sendContactEmails(
  data: ContactPayload,
  meta?: { ip?: string; userAgent?: string },
): Promise<void> {
  const transport = getTransporter();
  const from = `"${smtpConfig.fromName}" <${smtpConfig.fromEmail}>`;

  // 1. Notification interne → contact@aegisnetwork.fr
  const internal = buildInternalNotification(data, meta);
  await transport.sendMail({
    from,
    to: smtpConfig.contactTo,
    replyTo: data.email,
    subject: internal.subject,
    text: internal.text,
    html: internal.html,
  });

  // 2. Accusé de réception → visiteur
  const ack = buildAcknowledgment(data);
  await transport.sendMail({
    from,
    to: data.email,
    replyTo: smtpConfig.contactTo,
    subject: ack.subject,
    text: ack.text,
    html: ack.html,
  });
}
