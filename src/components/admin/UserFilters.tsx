import React from 'react';
import { Search, Filter } from 'lucide-react';

export function UserFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search users..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]"
        />
      </div>
      <div className="flex gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]">
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="manager">Manager</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]">
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="pending">Pending</option>
        </select>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <Filter className="h-5 w-5" />
          More Filters
        </button>
      </div>
    </div>
  );
}