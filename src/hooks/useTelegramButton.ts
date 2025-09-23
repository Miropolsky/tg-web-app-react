import { useCallback, useEffect } from 'react';
import type { FormData } from '../types/form';
import { useTelegram } from './useTelegram';

interface UseTelegramButtonProps {
  form: FormData;
  isFormValid: boolean;
  isSubmitting: boolean;
  isSuccess: boolean;
  onSubmit: () => void;
}

export const useTelegramButton = ({
  form,
  isFormValid,
  isSubmitting,
  isSuccess,
  onSubmit,
}: UseTelegramButtonProps) => {
  const { tg } = useTelegram();

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) {
      tg.showAlert("Пожалуйста, заполните все обязательные поля корректно");
      return;
    }

    if (isSubmitting) {
      return;
    }

    try {
      tg.sendData(JSON.stringify(form));
      tg.showAlert("Заявка успешно отправлена!");
      
      setTimeout(() => tg.close(), 1500);
      onSubmit();
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      tg.showAlert("Произошла ошибка при отправке заявки");
    }
  }, [form, isFormValid, isSubmitting, tg, onSubmit]);

  // Настройка MainButton при инициализации
  useEffect(() => {
    const buttonText = isSubmitting
      ? "Отправляем..."
      : isSuccess
      ? "Отправлено!"
      : "Отправить заявку";

    tg.MainButton.setText(buttonText);
    tg.MainButton.onClick(handleSubmit);

    if (isSubmitting) {
      tg.MainButton.showProgress();
    } else {
      tg.MainButton.hideProgress();
    }

    if (isSuccess) {
      tg.MainButton.hide();
    }

    return () => {
      tg.MainButton.offClick(handleSubmit);
      tg.MainButton.hide();
    };
  }, [tg, handleSubmit, isSubmitting, isSuccess]);

  // Показ/скрытие MainButton в зависимости от валидности формы
  useEffect(() => {
    if (isFormValid && !isSuccess) {
      tg.MainButton.show();
      tg.MainButton.enable();
    } else {
      tg.MainButton.hide();
    }
  }, [tg, isFormValid, isSuccess]);

  return {
    handleSubmit,
  };
};
