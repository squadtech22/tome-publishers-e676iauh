import type { Inquiry } from './inquiry';

/**
 * NOTE: these are the only files permitted to hardcode brand hex values.
 * Email clients do not support CSS custom properties, so tokens.css cannot
 * reach here. Keep these literals in sync with src/styles/tokens.css.
 */
const BURGUNDY = '#2b0f14';
const GOLD = '#e8c77a';
const RULE_GOLD = '#c9a45e';
const IVORY = '#f5f0e6';
const CHARCOAL = '#201c1d';

/** Emails render untrusted user input — escape everything. */
export function esc(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const shell = (inner: string) => `
<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background-color:${IVORY};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${IVORY};padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid ${RULE_GOLD}33;">
        <tr>
          <td style="background-color:${BURGUNDY};padding:28px 32px;text-align:center;">
            <div style="font-family:Rockwell,Georgia,serif;font-size:26px;font-weight:bold;letter-spacing:0.08em;color:${GOLD};">TOME</div>
            <div style="font-family:Georgia,serif;font-size:10px;letter-spacing:0.4em;color:${RULE_GOLD};margin-top:4px;">PUBLISHERS</div>
          </td>
        </tr>
        <tr><td style="padding:32px;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:16px;line-height:1.6;color:${CHARCOAL};">
          ${inner}
        </td></tr>
        <tr>
          <td style="background-color:${CHARCOAL};padding:20px 32px;text-align:center;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:${RULE_GOLD};">
            Publishing &middot; Design &middot; Marketing
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#888;width:38%;vertical-align:top;">${esc(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid #eee;font-size:15px;color:${CHARCOAL};">${esc(value)}</td>
  </tr>`;

/** Internal notification to the TOME inbox. */
export function notificationEmail(data: Inquiry) {
  const rows = [
    row('Name', data.name),
    row('Email', data.email),
    data.workingTitle ? row('Working title', data.workingTitle) : '',
    row('Stage', data.stage),
    row('Services', data.services.join(', ')),
    data.wordCount ? row('Word count', Number(data.wordCount).toLocaleString('en-US')) : '',
  ].join('');

  const html = shell(`
    <h1 style="margin:0 0 6px;font-family:Georgia,serif;font-size:22px;color:${BURGUNDY};">New author inquiry</h1>
    <p style="margin:0 0 24px;font-size:14px;color:#777;">Reply directly to this email to reach ${esc(data.name)}.</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
    <p style="margin:26px 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#888;">Message</p>
    <div style="background:${IVORY};padding:18px;font-family:Georgia,serif;font-size:15px;line-height:1.7;white-space:pre-wrap;">${esc(data.message)}</div>
  `);

  const text = [
    'New author inquiry',
    '',
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.workingTitle ? `Working title: ${data.workingTitle}` : '',
    `Stage: ${data.stage}`,
    `Services: ${data.services.join(', ')}`,
    data.wordCount ? `Word count: ${data.wordCount}` : '',
    '',
    'Message:',
    data.message,
  ].filter(Boolean).join('\n');

  return { html, text, subject: `New inquiry — ${data.name}${data.workingTitle ? ` (${data.workingTitle})` : ''}` };
}

/** Branded confirmation back to the author. */
export function autoresponderEmail(data: Inquiry) {
  const html = shell(`
    <h1 style="margin:0 0 18px;font-family:Georgia,serif;font-size:22px;color:${BURGUNDY};">Thank you, ${esc(data.name.split(' ')[0])}.</h1>
    <p style="margin:0 0 16px;">We have your inquiry${data.workingTitle ? ` about <em>${esc(data.workingTitle)}</em>` : ''}, and a member of our editorial team will read it properly — not skim it — within two business days.</p>
    <p style="margin:0 0 16px;">In the meantime, there is nothing you need to do. If you think of something you forgot to mention, simply reply to this email and it will reach us.</p>
    <p style="margin:28px 0 0;font-family:Georgia,serif;font-style:italic;font-size:17px;color:${BURGUNDY};">Every great book begins with an idea.</p>
    <p style="margin:6px 0 0;font-size:13px;color:#888;">— The team at TOME Publishers</p>
  `);

  const text = `Thank you, ${data.name.split(' ')[0]}.

We have your inquiry${data.workingTitle ? ` about "${data.workingTitle}"` : ''}, and a member of our editorial team will read it properly within two business days.

If you think of something you forgot to mention, simply reply to this email.

Every great book begins with an idea.
— The team at TOME Publishers`;

  return { html, text, subject: 'We received your inquiry — TOME Publishers' };
}
