import { useCallback, useState } from 'react';
import type { FormData, FormErrors, FormFieldName } from '../types/form';
import { isFormValid, validateField } from '../utils/validation';

export const useFormValidation = (initialForm: FormData) => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = useCallback((name: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    // Валидация в реальном времени для обязательных полей
    if (name === "name" || name === "email" || name === "phone") {
      const error = validateField(name as FormFieldName, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  }, []);

  const validateFormField = useCallback((name: FormFieldName, value: string) => {
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
    return error;
  }, []);

  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  const formValid = useCallback(() => isFormValid(form), [form]);

  return {
    form,
    errors,
    updateField,
    validateFormField,
    clearErrors,
    isFormValid: formValid,
  };
};
