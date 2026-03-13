// ---------------------------------------------------------------------------
// Route POST /api/contact — AEGIS NETWORK
// ---------------------------------------------------------------------------

import { Router } from 'express';
import { validateContactPayload } from '../lib/validation.js';
import { sendContactEmails } from '../lib/mailer.js';

const router = Router();

router.post('/api/contact', async (req, res) => {
  try {
    const { data, errors, isSpam } = validateContactPayload(req.body);

    // Si honeypot rempli → répondre 200 silencieusement (ne pas alerter le bot)
    if (isSpam) {
      res.json({ success: true });
      return;
    }

    if (errors.length > 0) {
      res.status(400).json({ success: false, errors });
      return;
    }

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      undefined;
    const userAgent = req.headers['user-agent'] || undefined;

    await sendContactEmails(data, { ip, userAgent });

    console.log(`[Contact] Email sent — ${data.type} from ${data.email}`);
    res.json({ success: true });
  } catch (err) {
    console.error('[Contact] Send failed:', (err as Error).message);
    res.status(500).json({
      success: false,
      message:
        "Une erreur est survenue lors de l'envoi. Veuillez réessayer ou nous contacter directement.",
    });
  }
});

export default router;
