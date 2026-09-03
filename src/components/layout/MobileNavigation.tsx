import { NavLink } from 'react-router-dom';
import { navItems } from '../../config/navigationItems';

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
