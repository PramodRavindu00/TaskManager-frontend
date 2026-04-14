import type React from "react";

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  className?: string;
}
const FormComponent = ({ onSubmit, children }: FormProps) => {
  return (
    <form onSubmit={onSubmit} className={`flex flex-col gap-5`}>
      {children}
    </form>
  );
};

export default FormComponent;
