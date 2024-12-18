import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Bell, Settings } from 'lucide-react';
import { Logo } from '../components/Logo';
import { UserDropdown } from '../components/navigation/UserDropdown';

export function TopNav() {
  const { user } = useUser();

  return (
    <nav className="bg-[#1C355E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <Logo className="h-8 w-auto text-white" />
            </Link>
            <div className="h-6 w-px bg-gray-300/30" />
            <span className="text-lg font-semibold text-white">
              TechCXO Sales Agent
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-[#2A4A7C] transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-[#2A4A7C] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            {user && <UserDropdown user={user} />}
          </div>
        </div>
      </div>
    </nav>
  );
}