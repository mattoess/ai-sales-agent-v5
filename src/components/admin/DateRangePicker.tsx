import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export function DateRangePicker() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="flex items-center space-x-4">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]"
        />
      </div>
      <span className="text-gray-500">to</span>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Calendar className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#009A4D] focus:border-[#009A4D]"
        />
      </div>
      <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
        Apply
      </button>
    </div>
  );
}