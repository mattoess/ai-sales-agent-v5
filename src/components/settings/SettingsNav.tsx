import React from 'react';
import { NavLink } from 'react-router-dom';
import { User, Bell, Brain, Users } from 'lucide-react';

const settingsNavigation = [
  { name: 'Profile', href: '/settings/profile', icon: User },
  { name: 'Notifications', href: '/settings/notifications', icon: Bell },
  { name: 'AI Preferences', href: '/settings/ai-preferences', icon: Brain },
  { name: 'Team', href: '/settings/team', icon: Users },
];

export function SettingsNav() {
  return (
    <nav className="w-full md:w-64 bg-white rounded-lg shadow-sm p-4">
      <h2 className="text-lg font-semibold text-gray-900 px-3 mb-4">Settings</h2>
      <div className="space-y-1">
        {settingsNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-[#009A4D] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}