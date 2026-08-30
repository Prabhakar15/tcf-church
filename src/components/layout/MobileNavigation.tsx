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
      className="md:hidden border-t border-gray-200 py-2"
    >
      <div className="flex flex-col gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
              `px-4 py-2 text-base font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-100'
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
