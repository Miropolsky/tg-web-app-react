import { useCallback, useEffect, useState } from "react";
import { useTelegram } from "../../hooks/useTelegram";
import "./Form.css";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  type: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
}

export const Form = () => {
  const { tg } = useTelegram();
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    type: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  // Валидация полей
  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Имя обязательно для заполнения";
        if (value.trim().length < 2)
          return "Имя должно содержать минимум 2 символа";
        return undefined;

      case "email": {
        if (!value.trim()) return "Email обязателен для заполнения";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Введите корректный email";
        return undefined;
      }

      case "phone": {
        if (!value.trim()) return "Телефон обязателен для заполнения";
        const phoneRegex = /^[+]?[1-9]\d{0,15}$/;
        const cleanPhone = value.replace(/[\s\-()]/g, "");
        if (!phoneRegex.test(cleanPhone))
          return "Введите корректный номер телефона";
        return undefined;
      }

      default:
        return undefined;
    }
  };

  // Проверка валидности всей формы
  const isFormValid = useCallback((): boolean => {
    return !!(
      form.name.trim() &&
      form.email.trim() &&
      form.phone.trim() &&
      !validateField("name", form.name) &&
      !validateField("email", form.email) &&
      !validateField("phone", form.phone)
    );
  }, [form.name, form.email, form.phone]);

  // Обработка отправки формы
  const handleSubmit = useCallback(() => {
    if (isFormValid()) {
      tg.sendData(JSON.stringify(form));
      tg.showAlert("Заявка успешно отправлена!");
      setTimeout(() => tg.close(), 1500);
    } else {
      tg.showAlert("Пожалуйста, заполните все обязательные поля корректно");
    }
  }, [form, isFormValid, tg]);

  // Настройка MainButton при инициализации
  useEffect(() => {
    tg.MainButton.setText("Отправить заявку");
    tg.MainButton.onClick(handleSubmit);
  }, [tg, handleSubmit]);

  // Показ/скрытие MainButton в зависимости от валидности формы
  useEffect(() => {
    if (isFormValid()) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [tg, isFormValid]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Валидация в реальном времени для обязательных полей
    if (name === "name" || name === "email" || name === "phone") {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleFormSubmit}>
        <h3 className="form-title">Введите ваши данные</h3>

        <div className="form-group">
          <label className="form-label">
            <span className="form-label-text">Имя *</span>
            <input
              className={`form-input ${errors.name ? "form-input--error" : ""}`}
              type="text"
              name="name"
              placeholder="Введите ваше имя"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="form-label-text">Email *</span>
            <input
              className={`form-input ${
                errors.email ? "form-input--error" : ""
              }`}
              type="email"
              name="email"
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="form-label-text">Телефон *</span>
            <input
              className={`form-input ${
                errors.phone ? "form-input--error" : ""
              }`}
              type="tel"
              name="phone"
              placeholder="+7 (999) 123-45-67"
              value={form.phone}
              onChange={handleChange}
            />
            {errors.phone && <span className="form-error">{errors.phone}</span>}
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="form-label-text">Адрес</span>
            <input
              className="form-input"
              type="text"
              name="address"
              placeholder="Введите ваш адрес"
              value={form.address}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">
            <span className="form-label-text">Тип организации</span>
            <select
              className="form-select"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option value="">Выберите тип</option>
              <option value="Юр. лицо">Юридическое лицо</option>
              <option value="ИП">Индивидуальный предприниматель</option>
              <option value="Физ. лицо">Физическое лицо</option>
            </select>
          </label>
        </div>

        <button className="form-button" type="submit">
          <span className="button-text">Отправить заявку</span>
          <span className="button-icon">→</span>
        </button>
      </form>
    </div>
  );
};
