import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignOutButton, useUser } from '@clerk/clerk-react';
import { 
  User as UserIcon,
  Settings,
  CreditCard,
  LogOut
} from 'lucide-react';

interface UserDropdownProps {
  user: ReturnType<typeof useUser>['user']
}

export function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-full hover:bg-[#2A4A7C] transition-colors"
      >
        {user.profileImageUrl ? (
          <img
            src={user.profileImageUrl}
            alt={user.fullName || 'User'}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-[#009A4D] flex items-center justify-center">
            <span className="text-white text-sm font-medium">
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </span>
          </div>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
            <p className="text-sm text-gray-500">{user.primaryEmailAddress?.emailAddress}</p>
          </div>

          <Link
            to="/settings/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <UserIcon className="w-4 h-4 mr-3" />
            Profile
          </Link>

          <Link
            to="/settings"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </Link>

          <Link
            to="/account/subscription"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <CreditCard className="w-4 h-4 mr-3" />
            Billing
          </Link>

          <div className="border-t">
            <SignOutButton signOutCallback={() => navigate('/')}>
              <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                <LogOut className="w-4 h-4 mr-3" />
                Sign out
              </button>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
}