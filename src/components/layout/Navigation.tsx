import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Branches', path: '/branches' },
  { label: 'Daily Word', path: '/daily-word' },
  { label: 'Media', path: '/sermons' },
  { label: 'Events', path: '/events' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  return (
    <nav className="flex space-x-8">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `font-medium text-sm py-2 px-3 rounded-md transition-colors ${
              isActive
                ? 'text-tcf-gold border-b-2 border-tcf-gold'
                : 'text-gray-700 hover:text-tcf-gold'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
