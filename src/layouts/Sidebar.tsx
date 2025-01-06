import type { HTMLAttributes } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  CreditCard, 
  BarChart3,
  MessageSquare,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type IconComponent = typeof LayoutDashboard;

interface NavigationItem {
  name: string;
  href: string;
  icon: IconComponent;
}

const navigation: NavigationItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Discovery Sessions', href: '/sessions', icon: MessageSquare },
  { name: 'Team', href: '/settings/team', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Content Management', href: '/admin/content', icon: FileText },
  { name: 'Settings', href: '/settings/profile', icon: Settings },
  { name: 'Billing', href: '/account/subscription', icon: CreditCard },
];

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Sidebar({ className, ...props }: SidebarProps) {
  return (
    <div
      className={cn(
        "w-64 bg-white h-[calc(100vh-4rem)] border-r flex-shrink-0",
        className
      )}
      {...props}
    >
      <nav className="mt-6 px-4" aria-label="Main Navigation">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  "flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#009A4D]",
                  isActive
                    ? "bg-[#009A4D] text-white hover:bg-[#008A45]"
                    : "text-gray-600 hover:bg-gray-50"
                )
              }
              aria-current="page"
            >
              <item.icon className="w-5 h-5 mr-3 flex-shrink-0" aria-hidden="true" />
              <span className="truncate">{item.name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}