import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { inquirySchema, fieldErrors, MIN_ELAPSED_MS } from '~/lib/inquiry';
import { notificationEmail, autoresponderEmail } from '~/lib/emails';

// The only on-demand route on the site; everything else is prerendered.
export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();

  const raw = {
    name: form.get('name'),
    email: form.get('email'),
    workingTitle: form.get('workingTitle') ?? '',
    stage: form.get('stage'),
    services: form.getAll('services'),
    wordCount: form.get('wordCount') ?? '',
    message: form.get('message'),
    company: form.get('company') ?? '',
    elapsed: form.get('elapsed') ?? '0',
  };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return json({ ok: false, errors: fieldErrors(parsed.error) }, 400);
  }
  const data = parsed.data;

  // Spam gates. Both respond 200 so bots get no signal about what tripped.
  if (data.company) return json({ ok: true });
  if (typeof data.elapsed === 'number' && data.elapsed > 0 && data.elapsed < MIN_ELAPSED_MS) {
    return json({ ok: true });
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.INQUIRY_TO_EMAIL ?? 'hello@tomepublishers.com';
  const from = import.meta.env.INQUIRY_FROM_EMAIL ?? 'noreply@tomepublishers.com';

  if (!apiKey) {
    console.error('[inquiry] RESEND_API_KEY is not set — inquiry was not delivered.');
    return json(
      { ok: false, errors: { form: 'We could not send your message right now. Please email hello@tomepublishers.com directly.' } },
      500,
    );
  }

  const resend = new Resend(apiKey);
  const notification = notificationEmail(data);

  // The notification must succeed — it is the actual lead. If it fails, tell
  // the author, so a lost inquiry is never silently swallowed.
  const sent = await resend.emails.send({
    from: `TOME Publishers <${from}>`,
    to: [to],
    replyTo: data.email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  });

  if (sent.error) {
    console.error('[inquiry] Resend failed to deliver notification:', sent.error);
    return json(
      { ok: false, errors: { form: 'We could not send your message right now. Please email hello@tomepublishers.com directly.' } },
      502,
    );
  }

  // The autoresponder is a courtesy — never fail the submission over it.
  try {
    const confirmation = autoresponderEmail(data);
    const ack = await resend.emails.send({
      from: `TOME Publishers <${from}>`,
      to: [data.email],
      replyTo: to,
      subject: confirmation.subject,
      html: confirmation.html,
      text: confirmation.text,
    });
    if (ack.error) console.warn('[inquiry] autoresponder failed:', ack.error);
  } catch (err) {
    console.warn('[inquiry] autoresponder threw:', err);
  }

  // No-JS fallback: a normal form POST redirects instead of reading JSON.
  if (!request.headers.get('accept')?.includes('application/json')) {
    return new Response(null, { status: 303, headers: { location: '/inquiry/thank-you' } });
  }

  return json({ ok: true });
};

/** Anything other than POST. */
export const ALL: APIRoute = () =>
  new Response('Method Not Allowed', { status: 405, headers: { allow: 'POST' } });
