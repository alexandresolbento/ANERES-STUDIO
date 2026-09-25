/**
 * WhatsApp Helper & Link Generator for ANERES Studio
 *
 * Uses the official, RFC-compliant Meta Universal Link format (https://wa.me/<number>?text=...)
 * which directly triggers native WhatsApp on Android and iOS devices, and seamlessly
 * opens WhatsApp Web or WhatsApp Desktop on PCs and Macs without intermediate error screens
 * or browser pop-up blockages.
 */

// Official phone number for ANERES Studio
// Country code: 55 (Brazil), DDD: 99, Number: 999331639 (9 digits)
export const WHATSAPP_PHONE_RAW = '5599999331639';
export const WHATSAPP_DISPLAY = '(99) 99933-1639';

/**
 * Creates an official, reliable WhatsApp URL
 * @param message Optional pre-filled text
 */
export function getWhatsAppUrl(message?: string): string {
  const baseUrl = `https://wa.me/${WHATSAPP_PHONE_RAW}`;
  if (!message || !message.trim()) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
}

/**
 * Alternative Web WhatsApp direct link (useful for direct desktop web routing)
 */
export function getWhatsAppWebUrl(message?: string): string {
  const baseUrl = `https://web.whatsapp.com/send?phone=${WHATSAPP_PHONE_RAW}`;
  if (!message || !message.trim()) {
    return baseUrl;
  }
  return `${baseUrl}&text=${encodeURIComponent(message.trim())}`;
}

/**
 * Safely parses and creates a WhatsApp URL for an arbitrary user phone string.
 * Handles cases where the user may have typed with or without +55 country code,
 * spaces, dashes, or parentheses.
 */
export function formatWhatsAppUserUrl(rawPhone: string, message?: string): string | null {
  if (!rawPhone) return null;
  const digits = rawPhone.replace(/\D/g, '');
  if (!digits || digits.length < 8) return null;

  // If already starts with Brazil country code 55 and has 12 or 13 digits:
  const normalized = digits.startsWith('55') && digits.length >= 12 ? digits : `55${digits}`;
  const base = `https://wa.me/${normalized}`;
  return message ? `${base}?text=${encodeURIComponent(message.trim())}` : base;
}

/**
 * Safely navigates or opens WhatsApp without being blocked by browser popup blockers.
 * When called inside a user click handler, it runs immediately without prior async delays.
 */
export function openWhatsAppSafely(message?: string, target: '_blank' | '_self' = '_blank'): Window | null {
  const url = getWhatsAppUrl(message);
  try {
    const win = window.open(url, target, 'noopener,noreferrer');
    if (!win && target === '_blank') {
      window.location.href = url;
    }
    return win;
  } catch {
    window.location.href = url;
    return null;
  }
}
