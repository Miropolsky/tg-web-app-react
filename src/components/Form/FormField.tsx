import React from "react";

interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  children?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  value,
  error,
  required = false,
  onChange,
  children,
}) => {
  return (
    <div className="form-group">
      <label className="form-label">
        <span className="form-label-text">
          {label} {required && "*"}
        </span>
        {children || (
          <input
            className={`form-input ${error ? "form-input--error" : ""}`}
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        )}
        {error && <span className="form-error">{error}</span>}
      </label>
    </div>
  );
};
