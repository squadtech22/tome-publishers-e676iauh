import type { APIRoute } from 'astro';
import { inquirySchema, fieldErrors, MIN_ELAPSED_MS } from '~/lib/inquiry';

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
    phone: form.get('phone'),
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

  // Insert into Firebase E-Book Portal
  try {
    await fetch(`https://firestore.googleapis.com/v1/projects/e-book-portal-15733/databases/(default)/documents/tome?key=AIzaSyCjFdNgu4fKrXj5jWa0MlMi3EwnX22WLq8`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields: {
          source: { stringValue: "tome" },
          name: { stringValue: data.name || "" },
          email: { stringValue: data.email || "" },
          phone: { stringValue: data.phone || "" },
          message: { stringValue: data.message || "" },
          createdAt: { timestampValue: new Date().toISOString() }
        }
      })
    });
  } catch (err) {
    console.error("Firebase insertion error:", err);
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
