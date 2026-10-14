export const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/+$/, '');
export const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ?? '';

export const integrationStatus = {
  apiConfigured: Boolean(apiBaseUrl),
  clerkConfigured: Boolean(clerkPublishableKey),
};
