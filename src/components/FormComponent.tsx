import type React from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
}
const FormComponent = ({ onSubmit, children, className }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={`space-y-5 p-5 rounded-2xl border-2 border-main ${className ?? ""}`}>
      {children}
    </form>
  );
};

export default FormComponent;
