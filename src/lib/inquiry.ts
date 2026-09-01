import { z } from 'zod';

export const MANUSCRIPT_STAGES = [
  'Just an idea',
  'Outline or partial draft',
  'Complete first draft',
  'Revised and ready',
  'Previously published',
] as const;

export const SERVICES = [
  'Ghostwriting',
  'Editorial development',
  'Copyediting & proofreading',
  'Cover & interior design',
  'Printing',
  'Marketing & publicity',
] as const;

/**
 * Shared by the browser and the API route so client and server can never
 * disagree about what a valid inquiry looks like.
 */
export const inquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.').max(120),
  email: z.email('Please enter a valid email address.').max(200),
  workingTitle: z.string().trim().max(200).optional().or(z.literal('')),
  stage: z.enum(MANUSCRIPT_STAGES, { message: 'Please choose a stage.' }),
  services: z
    .array(z.enum(SERVICES))
    .min(1, 'Please select at least one service.'),
  wordCount: z.coerce
    .number()
    .int()
    .positive()
    .max(5_000_000)
    .optional()
    .or(z.literal('').transform(() => undefined)),
  message: z
    .string()
    .trim()
    .min(20, 'Please tell us a little more — at least 20 characters.')
    .max(5000),

  // --- Spam controls (never shown to real users) ---
  /**
   * Honeypot: bots fill hidden fields, humans cannot see them.
   * Deliberately permissive here — the schema must NOT reject a filled
   * honeypot, or the bot gets a 400 naming the trap field. The route accepts
   * the submission and silently discards it instead.
   */
  company: z.string().optional(),
  /** ms since the form rendered; sub-3s submissions are almost always bots. */
  elapsed: z.coerce.number().optional(),
});

export type Inquiry = z.infer<typeof inquirySchema>;

export const MIN_ELAPSED_MS = 3000;

/** Field-keyed error map, for rendering messages beside inputs. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? 'form');
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}
