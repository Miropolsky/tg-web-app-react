import { useCallback, useEffect } from 'react';
import { API_CONFIG, getApiUrl } from '../config/api';
import type { Cart, Order } from '../types/product';
import { useTelegram } from './useTelegram';

interface UseTelegramOrderProps {
  cart: Cart;
  onOrderSuccess?: () => void;
}

export const useTelegramOrder = ({ cart, onOrderSuccess }: UseTelegramOrderProps) => {
  const { tg } = useTelegram();

  const generateOrderId = useCallback(() => {
    return `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const formatOrderData = useCallback((cart: Cart): Order => {
    return {
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalItems: cart.totalItems,
      orderId: generateOrderId(),
      timestamp: Date.now(),
    };
  }, [generateOrderId]);

  const handleOrder = useCallback(async () => {
    if (cart.items.length === 0) {
      tg.showAlert("Корзина пуста");
      return;
    }

    try {
      const order = formatOrderData(cart);
      
      // Формируем данные в формате, ожидаемом вашим сервером
      const orderData = {
        queryId: tg.initDataUnsafe?.query_id,
        products: cart.items.map(item => ({
          id: item.product.id,
          title: item.product.title,
          price: item.product.price,
          quantity: item.quantity,
          totalPrice: item.product.price * item.quantity,
        })),
        totalPrice: cart.totalPrice,
        user: tg.initDataUnsafe?.user,
        orderId: order.orderId,
        timestamp: order.timestamp,
      };

      // Отправляем данные на ваш сервер
      const response = await fetch(getApiUrl(API_CONFIG.ENDPOINTS.WEB_DATA), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        tg.showAlert(`✅ Заказ #${order.orderId} успешно оформлен на сумму ${order.totalPrice.toLocaleString()} ₽`);
        
        setTimeout(() => {
          onOrderSuccess?.();
          tg.close();
        }, 2000);
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error("Ошибка оформления заказа:", error);
      tg.showAlert("❌ Произошла ошибка при оформлении заказа. Попробуйте еще раз.");
    }
  }, [cart, tg, formatOrderData, onOrderSuccess]);

  // Настройка MainButton для заказа
  useEffect(() => {
    if (cart.items.length > 0) {
      const buttonText = `Купить (${cart.totalItems} товаров) - ${cart.totalPrice.toLocaleString()} ₽`;
      
      tg.MainButton.setText(buttonText);
      tg.MainButton.onClick(handleOrder);
      tg.MainButton.show();
      tg.MainButton.enable();
    } else {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick(handleOrder);
      tg.MainButton.hide();
    };
  }, [tg, cart, handleOrder]);

  return {
    handleOrder,
    generateOrderId,
    formatOrderData,
  };
};
