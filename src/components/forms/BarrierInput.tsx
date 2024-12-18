import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface BarrierInputProps {
  barriers: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

export const BarrierInput: React.FC<BarrierInputProps> = ({
  barriers,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Pain Points - What is getting in the way of what you are trying to achieve?
      </label>
      {barriers.map((barrier, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <textarea
            value={barrier}
            onChange={(e) => onChange(index, e.target.value)}
            className="flex-1 min-h-[100px] p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the barrier..."
          />
          <button
            onClick={() => onRemove(index)}
            className="p-2 text-red-500 hover:text-red-700"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
      <button
        onClick={onAdd}
        className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
      >
        <Plus className="w-4 h-4" />
        Add Barrier
      </button>
    </div>
  );
};