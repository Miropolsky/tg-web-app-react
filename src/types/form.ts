export interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export interface FormState {
  isSubmitting: boolean;
  isSuccess: boolean;
}

export type FormFieldName = keyof Pick<FormData, 'name' | 'email' | 'phone'>;

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
