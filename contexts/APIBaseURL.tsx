import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URLS = {
  LOCAL: 'http://localhost:8000',
  KOSEI_NGROK: 'https://5687-121-84-204-176.ngrok-free.app',
  NAOYA_NGROK:
    'https://07bd-2409-252-6140-7f00-c915-ccb7-b057-7eca.ngrok-free.app',
};

type ApiBaseUrlKey = keyof typeof API_BASE_URLS;

const API_BASE_URL_KEY_STORAGE = 'API_BASE_URL_KEY';

let currentApiBaseUrlKey: ApiBaseUrlKey = 'LOCAL';
let currentApiBaseUrl: string = API_BASE_URLS.LOCAL;

export const initializeApiBaseUrl = async (): Promise<void> => {
  try {
    const storedUrlKey = (await AsyncStorage.getItem(
      API_BASE_URL_KEY_STORAGE,
    )) as ApiBaseUrlKey | null;

    if (storedUrlKey && storedUrlKey in API_BASE_URLS) {
      currentApiBaseUrlKey = storedUrlKey;
      currentApiBaseUrl = API_BASE_URLS[storedUrlKey];
    } else {
      await AsyncStorage.setItem(API_BASE_URL_KEY_STORAGE, 'LOCAL');
    }
  } catch (error) {
    console.error('Failed to load API base URL from storage:', error);
  }
};

export const changeApiBaseUrl = async (
  urlKey: ApiBaseUrlKey,
): Promise<void> => {
  try {
    currentApiBaseUrlKey = urlKey;
    currentApiBaseUrl = API_BASE_URLS[urlKey];
    await AsyncStorage.setItem(API_BASE_URL_KEY_STORAGE, urlKey);
  } catch (error) {
    console.error('Failed to save API base URL to storage:', error);
  }
};

export const getApiBaseUrl = (): string => {
  return currentApiBaseUrl;
};

export const getCurrentApiBaseUrlKey = (): ApiBaseUrlKey => {
  return currentApiBaseUrlKey;
};
