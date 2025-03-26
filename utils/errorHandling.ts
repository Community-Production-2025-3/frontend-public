import { getApiBaseUrl } from '@/contexts/APIBaseURL';

export class ApiError extends Error {
  status: number;
  data: any;
  isNetworkError: boolean;

  constructor(
    message: string,
    status: number,
    data?: any,
    isNetworkError: boolean = false,
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.isNetworkError = isNetworkError;
  }
}

export class ApiTimeoutError extends ApiError {
  constructor(message: string = 'リクエストがタイムアウトしました') {
    super(message, 408, null, true);
    this.name = 'ApiTimeoutError';
  }
}

export class NetworkError extends ApiError {
  constructor(message: string = 'ネットワーク接続がありません') {
    super(message, 0, null, true);
    this.name = 'NetworkError';
  }
}

/**
 * APIエラーを適切なメッセージに変換する
 */
export function getErrorMessage(
  error: unknown,
  defaultMessage: string = 'エラーが発生しました。再度お試しください。',
): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 401:
        return '認証に失敗しました。再度ログインしてください。';
      case 403:
        return 'この操作を行う権限がありません。';
      case 404:
        return 'リクエストしたリソースが見つかりません。';
      case 429:
        return 'リクエストが多すぎます。しばらく待ってから再度お試しください。';
      case 500:
      case 502:
      case 503:
      case 504:
        return 'サーバーエラーが発生しました。しばらく待ってから再度お試しください。';
      default:
        // エラーメッセージがあればそれを使用、なければデフォルトのメッセージ
        return error.message || defaultMessage;
    }
  } else if (error instanceof Error) {
    return error.message || defaultMessage;
  }

  return defaultMessage;
}

/**
 * ネットワークの状態をチェックする
 */
export async function isNetworkAvailable(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const baseUrl = getApiBaseUrl();
    const response = await fetch(`${baseUrl}/`, {
      method: 'HEAD',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return response.ok;
  } catch (error) {
    console.log('Network check failed:', error);
    return false;
  }
}
