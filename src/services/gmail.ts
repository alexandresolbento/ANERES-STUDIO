import { QuoteRecord } from '../types';
import { formatWhatsAppUserUrl, getWhatsAppUrl } from '../utils/whatsapp';

export const ADMIN_EMAIL = 'alexandresolbento@gmail.com';

/**
 * Encodes a string into Base64URL (RFC 4648 § 5) format required by Gmail API safely supporting UTF-8
 */
function toBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Builds an RFC 2822 compliant email string
 */
function buildRawEmail(params: {
  to: string;
  from?: string;
  cc?: string;
  subject: string;
  htmlBody: string;
}): string {
  const subjectBytes = new TextEncoder().encode(params.subject);
  let subjectBinary = '';
  for (let i = 0; i < subjectBytes.length; i++) {
    subjectBinary += String.fromCharCode(subjectBytes[i]);
  }
  const encodedSubject = `=?utf-8?B?${btoa(subjectBinary)}?=`;

  const headers = [
    `To: ${params.to}`,
    ...(params.from ? [`From: ${params.from}`] : []),
    ...(params.cc ? [`Cc: ${params.cc}`] : []),
    `Subject: ${encodedSubject}`,
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=utf-8',
    '',
    params.htmlBody,
  ];

  return headers.join('\r\n');
}

/**
 * Generates high-impact, professional HTML email for ANERES Studio
 */
export function generateQuoteEmailHtml(quote: QuoteRecord): string {
  const dateStr = new Date(quote.createdAt).toLocaleString('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
  });

  const whatsappUrl =
    formatWhatsAppUserUrl(
      quote.phone,
      `Olá ${quote.name}! Aqui é da ANERES Studio a respeito do seu orçamento de ${quote.service}.`
    ) || getWhatsAppUrl();

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #09090b; color: #f4f4f5; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #18181b; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #18181b 0%, #27272a 100%); padding: 28px; border-bottom: 2px solid #fbbf24; text-align: center; }
    .logo-text { font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #fbbf24; margin: 0; }
    .badge { display: inline-block; background-color: rgba(251, 191, 36, 0.15); color: #fbbf24; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: bold; margin-top: 8px; border: 1px solid rgba(251, 191, 36, 0.3); }
    .content { padding: 28px; }
    .title { font-size: 20px; font-weight: bold; color: #ffffff; margin-top: 0; margin-bottom: 16px; }
    .card { background-color: #09090b; border: 1px solid #27272a; border-radius: 12px; padding: 20px; margin-bottom: 20px; }
    .field-row { margin-bottom: 12px; display: flex; flex-direction: column; }
    .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #a1a1aa; font-weight: 600; margin-bottom: 2px; }
    .field-value { font-size: 15px; color: #ffffff; font-weight: 500; word-break: break-word; }
    .btn-whatsapp { display: inline-block; background-color: #10b981; color: #09090b !important; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 800; font-size: 14px; text-align: center; margin-top: 8px; }
    .footer { background-color: #09090b; padding: 18px 28px; font-size: 12px; color: #71717a; border-top: 1px solid #27272a; text-align: center; }
    .db-tag { color: #10b981; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo-text">ANERES STUDIO</div>
      <div class="badge">PRODUÇÃO AUDIOVISUAL 4K</div>
    </div>

    <div class="content">
      <h2 class="title">🎬 Novo Orçamento Registrado na Base de Dados</h2>
      <p style="font-size: 14px; color: #d4d4d8; line-height: 1.5;">
        Uma nova solicitação de orçamento foi recebida através do site oficial e gravada com sucesso na base de dados do Firestore.
      </p>

      <div class="card">
        <div class="field-row">
          <span class="field-label">Cliente / Empresa</span>
          <span class="field-value" style="font-size: 17px; font-weight: 700; color: #fbbf24;">${quote.name}</span>
        </div>

        <div class="field-row">
          <span class="field-label">WhatsApp / Telefone</span>
          <span class="field-value">${quote.phone}</span>
        </div>

        ${quote.email ? `
        <div class="field-row">
          <span class="field-label">Email do Solicitante</span>
          <span class="field-value">${quote.email}</span>
        </div>
        ` : ''}

        <div class="field-row">
          <span class="field-label">Serviço Solicitado</span>
          <span class="field-value" style="color: #6ee7b7; font-weight: 600;">${quote.service}</span>
        </div>

        ${quote.message ? `
        <div class="field-row">
          <span class="field-label">Detalhes & Observações</span>
          <span class="field-value" style="background-color: #18181b; padding: 10px; border-radius: 8px; font-style: italic; color: #e4e4e7;">"${quote.message}"</span>
        </div>
        ` : ''}

        <div class="field-row" style="margin-bottom: 0;">
          <span class="field-label">Data e Hora do Registro</span>
          <span class="field-value" style="font-size: 13px; color: #a1a1aa;">${dateStr}</span>
        </div>
      </div>

      <div style="text-align: center; margin: 24px 0;">
        <a href="${whatsappUrl}" class="btn-whatsapp" target="_blank">
          Abrir Conversa no WhatsApp do Cliente
        </a>
      </div>

      <p style="font-size: 12px; color: #a1a1aa; text-align: center; margin-bottom: 0;">
        Status na base: <span class="db-tag">REGISTRADO NO FIRESTORE (ID: ${quote.id})</span>
      </p>
    </div>

    <div class="footer">
      ANERES Studio • Produção Audiovisual, Vídeos Comerciais & Motion Design<br>
      Notificação Automática enviada via Gmail API Integrada
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Sends quote notification email via Gmail API using OAuth Bearer token
 */
export async function sendQuoteEmailViaGmail(
  quote: QuoteRecord,
  accessToken: string,
  options?: {
    customRecipient?: string;
    includeClientCc?: boolean;
  }
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    if (!accessToken) {
      throw new Error('Token de acesso do Gmail não fornecido ou expirado.');
    }

    const recipient = options?.customRecipient || ADMIN_EMAIL;
    const clientCc =
      options?.includeClientCc && quote.email && quote.email.includes('@')
        ? quote.email
        : undefined;

    const subject = `[ANERES Studio] Novo Orçamento: ${quote.name} - ${quote.service}`;
    const htmlBody = generateQuoteEmailHtml(quote);

    const rawRfc2822 = buildRawEmail({
      to: recipient,
      cc: clientCc,
      subject,
      htmlBody,
    });

    const encodedRaw = toBase64Url(rawRfc2822);

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        raw: encodedRaw,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMsg =
        errorData?.error?.message || `Erro na API do Gmail (Status ${response.status})`;
      throw new Error(errorMsg);
    }

    const data = await response.json();
    return {
      success: true,
      messageId: data.id,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[Gmail Service] Falha ao enviar email:', message);
    return {
      success: false,
      error: message,
    };
  }
}
