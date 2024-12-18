import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart3,
  MessageSquare,
  FileText
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Discovery Sessions', href: '/sessions', icon: MessageSquare },
  { name: 'Team', href: '/settings/team', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Content Management', href: '/admin/content', icon: FileText },
  { name: 'Settings', href: '/settings/profile', icon: Settings },
  { name: 'Billing', href: '/account/subscription', icon: CreditCard },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-[calc(100vh-4rem)] border-r">
      <nav className="mt-6 px-4">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
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
    </div>
  );
}