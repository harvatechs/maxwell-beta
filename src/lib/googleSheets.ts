/**
 * Google Sheets Integration for "MaxWell Pre-Registration" Sheet
 * Webhook URL: https://script.google.com/macros/s/AKfycbwlmjoBVb4dr4whpZONr0qSdHGcr1v32lpuLkosf7omhbBy1JLL4DIaK8SSoScuQm7sTQ/exec
 */

export const DEFAULT_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbwlmjoBVb4dr4whpZONr0qSdHGcr1v32lpuLkosf7omhbBy1JLL4DIaK8SSoScuQm7sTQ/exec';

const GOOGLE_SHEETS_WEBHOOK_URL =
  ((import.meta as unknown) as { env?: { VITE_GOOGLE_SHEETS_WEBHOOK_URL?: string } }).env?.VITE_GOOGLE_SHEETS_WEBHOOK_URL ||
  DEFAULT_WEBHOOK_URL;

export interface WaitlistSubmission {
  email: string;
  source?: string;
}

export interface ExpertSubmission {
  name: string;
  email: string;
  github: string;
  institution?: string;
  field?: string;
  scholarUrl?: string;
  motivation?: string;
}

/**
 * Submit Waitlist Email to Google Sheet & LocalStorage
 */
export async function submitWaitlist(entry: WaitlistSubmission): Promise<{ success: boolean }> {
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  const payload = {
    timestamp,
    type: 'Waitlist',
    email: entry.email,
    nameGithub: 'N/A',
    institutionField: entry.source || 'Hero Waitlist',
    details: 'Pre-registration early access request',
  };

  // Always store locally as instant fallback
  try {
    const existing = JSON.parse(localStorage.getItem('maxwell_waitlist') || '[]');
    localStorage.setItem('maxwell_waitlist', JSON.stringify([...existing, payload]));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }

  // Dispatch to Google Apps Script Webhook
  if (GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Google Sheets Webhook dispatch notice:', err);
    }
  }

  return { success: true };
}

/**
 * Submit Founding Expert Application to Google Sheet & LocalStorage
 */
export async function submitExpertApplication(entry: ExpertSubmission): Promise<{ success: boolean }> {
  const timestamp = new Date().toLocaleString('en-US', { timeZoneName: 'short' });
  const payload = {
    timestamp,
    type: 'Founding Expert Application',
    email: entry.email,
    nameGithub: `${entry.name} (@${entry.github.replace('@', '')})`,
    institutionField: `${entry.institution || 'Independent'} — ${entry.field || 'General'}`,
    details: `Scholar/URL: ${entry.scholarUrl || 'N/A'} | Focus: ${entry.motivation || 'N/A'}`,
  };

  // Always store locally as instant fallback
  try {
    const existing = JSON.parse(localStorage.getItem('maxwell_expert_apps') || '[]');
    localStorage.setItem('maxwell_expert_apps', JSON.stringify([...existing, payload]));
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }

  // Dispatch to Google Apps Script Webhook
  if (GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      console.warn('Google Sheets Webhook dispatch notice:', err);
    }
  }

  return { success: true };
}
