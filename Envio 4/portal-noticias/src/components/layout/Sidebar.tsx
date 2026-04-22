import { Link, useLocation } from 'react-router';

interface SidebarProps {
  links: { href: string; label: string }[];
}

export const Sidebar = ({ links }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside style={{
      backgroundColor: 'var(--bg-card)', borderRight: '1px solid rgba(0,0,0,0.05)',
      padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem'
    }}>
      <h3 style={{ padding: '0 1rem', marginBottom: '1rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        Navegação
      </h3>
      {links.map((link) => {
        const isActive = location.pathname === link.href;
        return (
          <Link key={link.href} to={link.href} style={{
            padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
            backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
            color: isActive ? '#fff' : 'inherit', fontWeight: isActive ? 600 : 400,
            display: 'block', transition: 'all 0.2s'
          }}>
            {link.label}
          </Link>
        );
      })}
    </aside>
  );
};
