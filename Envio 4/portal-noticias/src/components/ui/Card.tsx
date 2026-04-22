import type { ReactNode, CSSProperties } from 'react';
import './ui.css';

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

export const Card = ({ children, className = '', style, onClick }: CardProps) => {
  return (
    <div className={`card ${className}`} onClick={onClick} style={{ ...style, ...(onClick ? { cursor: 'pointer' } : {}) }}>
      {children}
    </div>
  );
};
