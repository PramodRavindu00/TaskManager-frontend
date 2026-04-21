import React from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";

interface FieldRenderProps<TField extends FieldValues> {
  name: Path<TField>;
  placeholder?: string;
  className?: string;
  register: UseFormRegister<TField>;
}

interface FormFieldProps<TField extends FieldValues> {
  label: string;
  name: Path<TField>;
  placeholder?: string;
  error?: string;
  register: UseFormRegister<TField>;
  render: (props: FieldRenderProps<TField>) => React.ReactElement;
}

const FormField = <TField extends FieldValues>({
  label,
  name,
  placeholder,
  render,
  error,
  register,
}: FormFieldProps<TField>) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      {render({
        name,
        placeholder,
        className: `form-input ${error ? "form-input-error" : ""}`,
        register,
      })}
      {error && <p className="form-error">{error}</p>}
    </div>
  );
};

export default FormField;