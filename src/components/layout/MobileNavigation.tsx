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

interface MobileNavigationProps {
  onNavigate: () => void;
}

export default function MobileNavigation({ onNavigate }: MobileNavigationProps) {
  return (
    <nav
      id="mobile-menu"
      className="md:hidden border-t-2 border-tcf-gold py-3"
    >
      <div className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `link-nav block px-4 py-3 text-base ${
                isActive
                  ? 'active bg-tcf-light-bg'
                  : 'hover:bg-tcf-light-bg'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
