// Telegram WebApp API типы
interface TelegramWebApp {
  ready(): void;
  close(): void;
  expand(): void;
  MainButton: object;
  BackButton: object;
  HapticFeedback: object;
  initData: string;
  initDataUnsafe: object;
  version: string;
  platform: string;
  colorScheme: "light" | "dark";
  themeParams: object;
  isExpanded: boolean;
  viewportHeight: number;
  viewportStableHeight: number;
  headerColor: string;
  backgroundColor: string;
  isClosingConfirmationEnabled: boolean;
  onEvent(eventType: string, eventHandler: () => void): void;
  offEvent(eventType: string, eventHandler: () => void): void;
  sendData(data: string): void;
  switchInlineQuery(query: string, choose_chat_types?: string[]): void;
  openLink(url: string, options?: { try_instant_view?: boolean }): void;
  openTelegramLink(url: string): void;
  openInvoice(url: string, callback?: (status: string) => void): void;
  showPopup(params: object, callback?: (buttonId: string) => void): void;
  showAlert(message: string, callback?: () => void): void;
  showConfirm(
    message: string,
    callback?: (confirmed: boolean) => void
  ): void;
  showScanQrPopup(
    params: object,
    callback?: (text: string) => void
  ): void;
  closeScanQrPopup(): void;
  readTextFromClipboard(callback?: (text: string) => void): void;
  requestWriteAccess(callback?: (granted: boolean) => void): void;
  requestContact(callback?: (granted: boolean) => void): void;
  isVersionAtLeast(version: string): boolean;
}

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp;
    };
  }
}

export {};
