import React from 'react';
import { User } from '@clerk/clerk-react';

interface ProfileFormProps {
  user: User | null | undefined;
}

export function ProfileForm({ user }: ProfileFormProps) {
  if (!user) return null;

  return (
    <form className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              defaultValue={user.firstName || ''}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009A4D] focus:ring-[#009A4D] sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              defaultValue={user.lastName || ''}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#009A4D] focus:ring-[#009A4D] sm:text-sm"
            />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={user.primaryEmailAddress?.emailAddress || ''}
              disabled
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-[#009A4D] focus:ring-[#009A4D] sm:text-sm"
            />
          </div>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-[#009A4D] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#009A4D]/90 focus:outline-none focus:ring-2 focus:ring-[#009A4D] focus:ring-offset-2"
        >
          Save changes
        </button>
      </div>
    </form>
  );
}