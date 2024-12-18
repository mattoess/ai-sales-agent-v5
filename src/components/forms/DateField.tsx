import React from 'react';

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const DateField: React.FC<DateFieldProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};