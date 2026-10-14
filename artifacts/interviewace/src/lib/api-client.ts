import { apiBaseUrl } from '@/lib/config';

type SessionTokenGetter = () => Promise<string | null>;

type ApiRequestOptions = RequestInit & {
  protected?: boolean;
};

let sessionTokenGetter: SessionTokenGetter | null = null;

export function setSessionTokenGetter(getter: SessionTokenGetter | null) {
  sessionTokenGetter = getter;
}

export class ApiConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApiConfigurationError';
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const { protected: isProtected = false, headers: requestHeaders, ...requestOptions } = options;

  if (!apiBaseUrl) {
    throw new ApiConfigurationError('VITE_API_BASE_URL is not configured.');
  }

  if (!path || !path.startsWith('/')) {
    throw new ApiConfigurationError('Supply an explicit, verified API path beginning with /.');
  }

  const headers = new Headers(requestHeaders);
  headers.set('Accept', 'application/json');

  if (isProtected) {
    if (!sessionTokenGetter) {
      throw new ApiConfigurationError('A configured Clerk session is required for this protected request.');
    }

    const token = await sessionTokenGetter();

    if (!token) {
      throw new ApiConfigurationError('No Clerk session token is available for this protected request.');
    }

    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...requestOptions,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API request failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}
