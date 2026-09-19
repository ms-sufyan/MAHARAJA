import type { ValidatedContactData } from "./validation";

export interface ContactNotifier {
  notify(submission: ValidatedContactData): Promise<void>;
}

/**
 * Default No-Op Notification Adapter
 * Prevents failure when email provider secrets are not configured.
 */
export class NoOpContactNotifier implements ContactNotifier {
  async notify(submission: ValidatedContactData): Promise<void> {
    // Deliberately no-op to ensure privacy and zero dependencies by default.
    if (import.meta.env?.DEV) {
      console.log(`[Notification] Inbound submission queued: ID=${submission.id}, Service=${submission.service_interest}`);
    }
  }
}

/**
 * Factory for creating configured notifier based on environment variables
 */
export function getContactNotifier(env?: Record<string, string>): ContactNotifier {
  const apiKey = env?.EMAIL_PROVIDER_API_KEY;
  const toEmail = env?.NOTIFICATION_EMAIL;

  if (apiKey && toEmail) {
    // If an email provider integration is configured, an adapter can be plugged here
    // For now, return NoOp to ensure stability and non-blocking operation
    return new NoOpContactNotifier();
  }

  return new NoOpContactNotifier();
}
