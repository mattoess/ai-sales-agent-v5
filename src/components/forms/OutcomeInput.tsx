import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface OutcomeInputProps {
  outcomes: string[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, value: string) => void;
}

export const OutcomeInput: React.FC<OutcomeInputProps> = ({
  outcomes,
  onAdd,
  onRemove,
  onChange,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Desired Outcomes - If all the barriers were gone and your company achieved success, what would be different and true?
      </label>
      {outcomes.map((outcome, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <textarea
            value={outcome}
            onChange={(e) => onChange(index, e.target.value)}
            className="flex-1 min-h-[100px] p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the desired outcome..."
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
        Add Outcome
      </button>
    </div>
  );
};