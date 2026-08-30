import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Daily Word', path: '/daily-word' },
  { label: 'Sermons', path: '/sermons' },
  { label: 'Events', path: '/events' },
  { label: 'About TCF', path: '/about' },
  { label: 'Pastor', path: '/pastor' },
  { label: 'Prayer', path: '/prayer' },
  { label: 'Contact', path: '/contact' },
];

interface NavigationProps {
  onNavigate?: () => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  return (
    <nav className="flex gap-8">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            `link-nav ${isActive ? 'active border-b-2 border-tcf-gold pb-1' : 'pb-1'}`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
