import { supabase } from '@/utils/supabase';
import { getApiBaseUrl } from '@/contexts/APIBaseURL';
import {
  ApiError,
  ApiTimeoutError,
  isNetworkAvailable,
  NetworkError,
} from '@/utils/errorHandling';

export interface ApiRequestOptions {
  endpoint: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  timeout?: number;
  skipNetworkCheck?: boolean;
}

export async function apiRequest<T = any>(
  options: ApiRequestOptions,
): Promise<T> {
  const baseURL = getApiBaseUrl();
  const {
    endpoint,
    method = 'GET',
    body,
    headers = {},
    params = {},
    timeout = 30000,
    skipNetworkCheck = false,
  } = options;

  if (!skipNetworkCheck) {
    const networkAvailable = await isNetworkAvailable();
    if (!networkAvailable) {
      throw new NetworkError();
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    throw new ApiError('認証トークンがありません。', 401);
  }

  const url = new URL(`${baseURL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  const requestOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...headers,
    },
  };

  if (body && method !== 'GET') {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), timeout);
    requestOptions.signal = abortController.signal;

    const response = await fetch(url.toString(), requestOptions);

    console.log('response', response);

    clearTimeout(timeoutId);

    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      throw new ApiError(
        data.message || `API request failed with status ${response.status}`,
        response.status,
        data,
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiTimeoutError();
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new NetworkError('ネットワーク接続エラーが発生しました');
    }

    throw new ApiError(
      (error as Error).message || 'Unknown API error',
      0,
      null,
      true,
    );
  }
}

export function getAPIwithSupabaseToken<T = any>(
  endpoint: string,
  params?: Record<string, string>,
  headers?: Record<string, string>,
  options?: Partial<
    Omit<ApiRequestOptions, 'endpoint' | 'method' | 'params' | 'headers'>
  >,
): Promise<T> {
  return apiRequest<T>({
    endpoint,
    method: 'GET',
    params,
    headers,
    ...options,
  });
}

export function postAPIwithSupabaseToken<T = any>(
  endpoint: string,
  body?: any,
  params?: Record<string, string>,
  headers?: Record<string, string>,
  options?: Partial<
    Omit<
      ApiRequestOptions,
      'endpoint' | 'method' | 'body' | 'params' | 'headers'
    >
  >,
): Promise<T> {
  return apiRequest<T>({
    endpoint,
    method: 'POST',
    body,
    params,
    headers,
    ...options,
  });
}

export function putAPIwithSupabaseToken<T = any>(
  endpoint: string,
  body?: any,
  params?: Record<string, string>,
  headers?: Record<string, string>,
  options?: Partial<
    Omit<
      ApiRequestOptions,
      'endpoint' | 'method' | 'body' | 'params' | 'headers'
    >
  >,
): Promise<T> {
  return apiRequest<T>({
    endpoint,
    method: 'PUT',
    body,
    params,
    headers,
    ...options,
  });
}

export function deleteAPIwithSupabaseToken<T = any>(
  endpoint: string,
  params?: Record<string, string>,
  headers?: Record<string, string>,
  options?: Partial<
    Omit<ApiRequestOptions, 'endpoint' | 'method' | 'params' | 'headers'>
  >,
): Promise<T> {
  return apiRequest<T>({
    endpoint,
    method: 'DELETE',
    params,
    headers,
    ...options,
  });
}
