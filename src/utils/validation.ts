import type { FormData, FormErrors, FormFieldName } from '../types/form';

// Мемоизированные регулярные выражения
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[+]?[1-9]\d{0,15}$/;

/**
 * Валидация отдельного поля формы
 */
export const validateField = (name: FormFieldName, value: string): string | undefined => {
  switch (name) {
    case "name":
      if (!value.trim()) return "Имя обязательно для заполнения";
      if (value.trim().length < 2)
        return "Имя должно содержать минимум 2 символа";
      return undefined;

    case "email": {
      if (!value.trim()) return "Email обязателен для заполнения";
      if (!EMAIL_REGEX.test(value)) return "Введите корректный email";
      return undefined;
    }

    case "phone": {
      if (!value.trim()) return "Телефон обязателен для заполнения";
      const cleanPhone = value.replace(/[\s\-()]/g, "");
      if (!PHONE_REGEX.test(cleanPhone))
        return "Введите корректный номер телефона";
      return undefined;
    }

    default:
      return undefined;
  }
};

/**
 * Проверка валидности всей формы
 */
export const isFormValid = (form: FormData): boolean => {
  return !!(
    form.name.trim() &&
    form.email.trim() &&
    form.phone.trim() &&
    !validateField("name", form.name) &&
    !validateField("email", form.email) &&
    !validateField("phone", form.phone)
  );
};

/**
 * Валидация всей формы с возвратом ошибок
 */
export const validateForm = (form: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  const nameError = validateField("name", form.name);
  if (nameError) errors.name = nameError;
  
  const emailError = validateField("email", form.email);
  if (emailError) errors.email = emailError;
  
  const phoneError = validateField("phone", form.phone);
  if (phoneError) errors.phone = phoneError;
  
  return errors;
};
