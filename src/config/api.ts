// Конфигурация API
// ⚠️ ВАЖНО: Замените на URL вашего сервера перед деплоем!
export const API_CONFIG = {
  // URL вашего сервера (замените на ваш домен)
  SERVER_URL: 'http://localhost:8000', // ← ЗАМЕНИТЕ НА ВАШ URL
  
  // Эндпоинты
  ENDPOINTS: {
    WEB_DATA: '/web-data',
  },
} as const;

// Функция для получения полного URL эндпоинта
export const getApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.SERVER_URL}${endpoint}`;
};
