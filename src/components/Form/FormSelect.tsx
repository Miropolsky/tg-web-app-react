import React from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  name: string;
  label: string;
  value: string;
  error?: string;
  required?: boolean;
  placeholder: string;
  options: SelectOption[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  label,
  value,
  error,
  required = false,
  placeholder,
  options,
  onChange,
}) => {
  return (
    <div className="form-group">
      <label className="form-label">
        <span className="form-label-text">
          {label} {required && "*"}
        </span>
        <select
          className={`form-select ${error ? "form-input--error" : ""}`}
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className="form-error">{error}</span>}
      </label>
    </div>
  );
};
