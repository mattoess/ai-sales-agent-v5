import React from 'react';
import { ThemeList } from './ThemeList';
import { ImpactStatement } from './ImpactStatement';

interface ThemeSectionProps {
  title: string;
  barrierThemes?: string[];
  emotionalThemes?: string[];
  impactStatement?: string;
  impactType?: 'warning' | 'success';
}

export const ThemeSection: React.FC<ThemeSectionProps> = ({
  title,
  barrierThemes,
  emotionalThemes,
  impactStatement,
  impactType = 'warning',
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      
      {barrierThemes && (
        <ThemeList
          title="Key Themes"
          themes={barrierThemes}
          iconColor={impactType === 'warning' ? 'text-red-500' : 'text-green-500'}
        />
      )}

      {emotionalThemes && (
        <ThemeList
          title="Personal Impact Themes"
          themes={emotionalThemes}
          iconColor={impactType === 'warning' ? 'text-purple-500' : 'text-emerald-500'}
        />
      )}

      {impactStatement && (
        <ImpactStatement
          title={`${impactType === 'warning' ? 'Risk' : 'Impact'} Statement`}
          statement={impactStatement}
          type={impactType}
        />
      )}
    </div>
  );
};