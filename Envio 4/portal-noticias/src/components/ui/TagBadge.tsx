import type { Tag } from '../../types';
import './ui.css';
import { useNavigate } from 'react-router';

interface TagBadgeProps {
  tag: Tag;
  className?: string;
}

const colors = [
  '#e63946', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51',
  '#1d3557', '#457b9d', '#8338ec', '#ff006e', '#3a86ff'
];

export const TagBadge = ({ tag, className = '' }: TagBadgeProps) => {
  const navigate = useNavigate();
  const bgColor = colors[tag.id % colors.length];

  return (
    <span
      className={`tag-badge ${className}`}
      style={{ backgroundColor: bgColor, cursor: 'pointer' }}
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/busca/tag/${tag.slug}`);
      }}
    >
      {tag.nome}
    </span>
  );
};
