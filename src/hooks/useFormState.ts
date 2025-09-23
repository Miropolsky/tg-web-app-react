import { useCallback, useState } from 'react';
import type { FormState } from '../types/form';

export const useFormState = () => {
  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    isSuccess: false,
  });

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState(prev => ({ ...prev, isSubmitting }));
  }, []);

  const setSuccess = useCallback((isSuccess: boolean) => {
    setFormState(prev => ({ ...prev, isSuccess }));
  }, []);

  const resetState = useCallback(() => {
    setFormState({
      isSubmitting: false,
      isSuccess: false,
    });
  }, []);

  const handleSubmit = useCallback(async (submitFn: () => Promise<void>) => {
    try {
      setSubmitting(true);
      await submitFn();
      setSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  }, [setSubmitting, setSuccess]);

  const handleAsyncSubmit = useCallback(async (submitFn: () => Promise<void>) => {
    try {
      setSubmitting(true);
      await submitFn();
      setSuccess(true);
    } catch (error) {
      console.error('Form submission error:', error);
      throw error;
    } finally {
      setSubmitting(false);
    }
  }, [setSubmitting, setSuccess]);

  return {
    formState,
    setSubmitting,
    setSuccess,
    resetState,
    handleSubmit,
    handleAsyncSubmit,
  };
};
