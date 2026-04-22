import type { InputHTMLAttributes } from 'react';
import './ui.css';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField = ({ label, error, id, className = '', ...props }: InputFieldProps) => {
  const inputId = id || `input-${label.replace(/\s/g, '-').toLowerCase()}`;

  return (
    <div className={`input-group ${className}`}>
      <label htmlFor={inputId} className="input-label">{label}</label>
      <input id={inputId} className={`input-field ${error ? 'input-error' : ''}`} {...props} />
      {error && <span className="input-error-msg">{error}</span>}
    </div>
  );
};
