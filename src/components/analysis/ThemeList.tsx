import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ThemeListProps {
  title: string;
  themes: string[];
  iconColor?: string;
}

export const ThemeList: React.FC<ThemeListProps> = ({
  title,
  themes,
  iconColor = 'text-blue-500',
}) => {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-700 mb-2">{title}</h4>
      <ul className="space-y-2">
        {themes.map((theme, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className={`w-5 h-5 ${iconColor} mt-0.5`} />
            <span className="text-gray-700">{theme}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};