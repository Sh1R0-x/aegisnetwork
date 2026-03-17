// ---------------------------------------------------------------------------
// Serveur API — AEGIS NETWORK
// ---------------------------------------------------------------------------
// Point d'entrée Express. Sert l'API /api/contact et les fichiers statiques
// du dossier dist/ en production.
// ---------------------------------------------------------------------------

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import rateLimit from 'express-rate-limit';
import { verifySmtp } from './lib/mailer.js';
// Note: ne jamais logger SMTP_PASS ni aucun secret.
import contactRouter from './routes/contact.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = parseInt(process.env.PORT || '3001', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const ALLOWED_ORIGINS = CORS_ORIGIN.split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const app = express();

// ── Sécurité de base ────────────────────────────────────────────────────────
app.disable('x-powered-by');
app.set('trust proxy', 1);

// ── CORS (utile en dev ou si l'API de prod est sur un autre domaine) ───────
const apiCors = cors({
  origin: (origin, callback) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error('Origin non autorisée par CORS'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
});

app.use('/api', apiCors);

// ── Body parsing ────────────────────────────────────────────────────────────
app.use(express.json({ limit: '16kb' }));

// ── Rate limiting sur /api/contact (5 requêtes / 15 min par IP) ─────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message:
      'Trop de demandes. Veuillez réessayer dans quelques minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/contact', contactLimiter);

// ── Routes API ──────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ success: true });
});
app.use(contactRouter);

// ── Fichiers statiques (production) ─────────────────────────────────────────
const distPath = path.resolve(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ── Démarrage ───────────────────────────────────────────────────────────────
app.listen(PORT, async () => {
  console.log(`[Aegis API] Serveur démarré sur le port ${PORT}`);

  // ── Vérification SMTP au boot ──────────────────────────────────────────
  if (!process.env.SMTP_PASS) {
    console.error(
      '[Aegis API] SMTP_PASS non défini — l\'envoi d\'e-mails sera impossible.\n' +
      '            Définissez SMTP_PASS en variable d\'environnement serveur.',
    );
    return;
  }

  const smtpOk = await verifySmtp();
  if (smtpOk) {
    console.log('[Aegis API] Connexion SMTP vérifiée ✓');
  } else {
    console.warn(
      '[Aegis API] Connexion SMTP échouée — vérifiez vos identifiants SMTP.',
    );
  }
});
