import React, { useState } from 'react';

interface SwitchProps {
  id: string;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
}

export function Switch({ id, defaultChecked = false, onChange }: SwitchProps) {
  const [enabled, setEnabled] = useState(defaultChecked);

  const handleChange = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange?.(newValue);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      className={`${
        enabled ? 'bg-[#009A4D]' : 'bg-gray-200'
      } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#009A4D] focus:ring-offset-2`}
      onClick={handleChange}
    >
      <span className="sr-only">Toggle {id}</span>
      <span
        aria-hidden="true"
        className={`${
          enabled ? 'translate-x-5' : 'translate-x-0'
        } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
      />
    </button>
  );
}