export function trackEvent(eventName: string, payload?: Record<string, unknown>) {
  return { eventName, payload };
}
