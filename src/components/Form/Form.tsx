import { useCallback } from "react";
import { useFormState } from "../../hooks/useFormState";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useTelegramButton } from "../../hooks/useTelegramButton";
import type { FormData } from "../../types/form";
import "./Form.css";
import { FormField } from "./FormField";
import { FormSelect } from "./FormSelect";

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  type: "",
};

const organizationTypes = [
  { value: "Юр. лицо", label: "Юридическое лицо" },
  { value: "ИП", label: "Индивидуальный предприниматель" },
  { value: "Физ. лицо", label: "Физическое лицо" },
];

export const Form = () => {
  const { form, errors, updateField, isFormValid } =
    useFormValidation(initialForm);
  const { formState, setSuccess } = useFormState();

  const onSubmit = useCallback(() => {
    // Дополнительная логика после успешной отправки
    setSuccess(true);
  }, [setSuccess]);

  useTelegramButton({
    form,
    isFormValid: isFormValid(),
    isSubmitting: formState.isSubmitting,
    isSuccess: formState.isSuccess,
    onSubmit,
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      updateField(name as keyof FormData, value);
    },
    [updateField]
  );

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Логика отправки обрабатывается в useTelegramButton
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <h3 className="form-title">Введите ваши данные</h3>

        <FormField
          name="name"
          label="Имя"
          placeholder="Введите ваше имя"
          value={form.name}
          error={errors.name}
          required
          onChange={handleChange}
        />

        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="example@email.com"
          value={form.email}
          error={errors.email}
          required
          onChange={handleChange}
        />

        <FormField
          name="phone"
          label="Телефон"
          type="tel"
          placeholder="+7 (999) 123-45-67"
          value={form.phone}
          error={errors.phone}
          required
          onChange={handleChange}
        />

        <FormField
          name="address"
          label="Адрес"
          placeholder="Введите ваш адрес"
          value={form.address}
          onChange={handleChange}
        />

        <FormSelect
          name="type"
          label="Тип организации"
          placeholder="Выберите тип"
          value={form.type}
          options={organizationTypes}
          onChange={handleChange}
        />

        {/* Кнопка отправки управляется через Telegram MainButton */}
        <div className="form-info">
          <p className="form-info-text">
            📱 Нажмите кнопку "Отправить заявку" внизу экрана
          </p>
        </div>
      </form>
    </div>
  );
};
