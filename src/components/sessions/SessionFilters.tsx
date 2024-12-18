import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export function SessionFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search sessions..."
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]"
        />
      </div>
      
      <div className="flex gap-4">
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="in_progress">In Progress</option>
          <option value="scheduled">Scheduled</option>
        </select>

        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]">
          <option value="">All Time</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>

        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5" />
          More Filters
        </button>
      </div>
    </div>
  );
}