import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Branches', path: '/branches' },
  { label: 'Daily Word', path: '/daily-word' },
    { label: 'Testimonies', path: '/testimonies' },
  { label: 'Media', path: '/media' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
];

interface MobileNavigationProps {
  onNavigate: () => void;
}

export default function MobileNavigation({ onNavigate }: MobileNavigationProps) {
  return (
    <div className="space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          onClick={onNavigate}
          className={({ isActive }) =>
            `block font-medium text-base px-3 py-2 rounded-md transition-colors ${
              isActive
                ? 'bg-tcf-gold text-white'
                : 'text-gray-700 hover:bg-gray-100 hover:text-tcf-gold'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}
