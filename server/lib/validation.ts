// ---------------------------------------------------------------------------
// Validation & sanitisation — formulaire de contact AEGIS NETWORK
// ---------------------------------------------------------------------------

export interface ContactPayload {
  type: 'callback' | 'message';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  diagnostic?: {
    score: number;
    level: string;
    points: string[];
    priority: string;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

// Sanitisation basique : trim + échappement des chevrons
function sanitize(input: string): string {
  return input.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone: string): boolean {
  return /^[\d\s+().\-]{6,20}$/.test(phone);
}

/**
 * Valide et sanitise le corps de la requête.
 * Retourne { data, errors } — si errors.length > 0, la requête est invalide.
 * Le champ `_honeypot` est traité comme flag anti-spam.
 */
export function validateContactPayload(
  body: unknown,
): { data: ContactPayload; errors: ValidationError[]; isSpam: boolean } {
  const errors: ValidationError[] = [];

  if (!body || typeof body !== 'object') {
    errors.push({ field: '_', message: 'Corps de requête invalide.' });
    return { data: {} as ContactPayload, errors, isSpam: false };
  }

  const raw = body as Record<string, unknown>;

  // ── Honeypot ──────────────────────────────────────────────────────────
  const isSpam =
    typeof raw._honeypot === 'string' && raw._honeypot.trim() !== '';

  // ── Type ──────────────────────────────────────────────────────────────
  const type = raw.type;
  if (type !== 'callback' && type !== 'message') {
    errors.push({ field: 'type', message: 'Type de formulaire invalide.' });
  }

  // ── Name (requis en mode message, optionnel en callback) ──────────────
  const name = typeof raw.name === 'string' ? sanitize(raw.name) : '';
  if (type === 'message' && !name) {
    errors.push({ field: 'name', message: 'Le nom est requis.' });
  } else if (name.length > 200) {
    errors.push({ field: 'name', message: 'Le nom est trop long.' });
  }

  // ── Email ─────────────────────────────────────────────────────────────
  const email =
    typeof raw.email === 'string' ? raw.email.trim().toLowerCase() : '';
  if (!email) {
    errors.push({ field: 'email', message: "L'email est requis." });
  } else if (!isValidEmail(email)) {
    errors.push({ field: 'email', message: "L'email n'est pas valide." });
  }

  // ── Phone (requis en callback) ────────────────────────────────────────
  const phone =
    typeof raw.phone === 'string' ? sanitize(raw.phone) : undefined;
  if (type === 'callback') {
    if (!phone) {
      errors.push({
        field: 'phone',
        message: 'Le téléphone est requis pour une demande de rappel.',
      });
    } else if (!isValidPhone(phone)) {
      errors.push({
        field: 'phone',
        message: "Le numéro de téléphone n'est pas valide.",
      });
    }
  } else if (phone && !isValidPhone(phone)) {
    errors.push({
      field: 'phone',
      message: "Le numéro de téléphone n'est pas valide.",
    });
  }

  // ── Company ───────────────────────────────────────────────────────────
  const company =
    typeof raw.company === 'string' ? sanitize(raw.company) : undefined;
  if (company && company.length > 200) {
    errors.push({
      field: 'company',
      message: "Le nom d'entreprise est trop long.",
    });
  }

  // ── Message ───────────────────────────────────────────────────────────
  const message =
    typeof raw.message === 'string' ? sanitize(raw.message) : undefined;
  if (message && message.length > 5000) {
    errors.push({ field: 'message', message: 'Le message est trop long.' });
  }

  // ── Diagnostic (optionnel) ────────────────────────────────────────────
  let diagnostic: ContactPayload['diagnostic'] = undefined;
  if (raw.diagnostic && typeof raw.diagnostic === 'object') {
    const d = raw.diagnostic as Record<string, unknown>;
    if (
      typeof d.score === 'number' &&
      typeof d.level === 'string' &&
      Array.isArray(d.points) &&
      typeof d.priority === 'string'
    ) {
      diagnostic = {
        score: d.score,
        level: sanitize(d.level),
        points: d.points.map((p) =>
          typeof p === 'string' ? sanitize(p) : '',
        ),
        priority: sanitize(d.priority),
      };
    }
  }

  const data: ContactPayload = {
    type: (type as 'callback' | 'message') ?? 'message',
    name,
    email,
    ...(phone ? { phone } : {}),
    ...(company ? { company } : {}),
    ...(message ? { message } : {}),
    ...(diagnostic ? { diagnostic } : {}),
  };

  return { data, errors, isSpam };
}
