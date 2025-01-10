import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { MultiSelect } from '@/components/ui/multi-select'
import { Solution } from '@/types/discovery'
import { AudienceType } from '../types'

export interface MetadataSelectorsProps {
  value: {
    solutions: string[];
    audience: AudienceType[];
    vectorNamespace: string;
  };
  onChange: (value: {
    solutions: string[];
    audience: AudienceType[];
    vectorNamespace: string;
  }) => void;
  availableSolutions?: Solution[]; // Make this optional
}

export function MetadataSelectors({ 
  value, 
  onChange,
  availableSolutions = [] // Provide default empty array
}: MetadataSelectorsProps) {
  const audienceOptions = [
    { label: 'Technical', value: 'technical' },
    { label: 'Business', value: 'business' },
    { label: 'Executive', value: 'executive' },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Solutions</Label>
        <MultiSelect
          options={availableSolutions.map(solution => ({
            label: solution.name,
            value: solution.id
          }))}
          value={value.solutions}
          onChange={(selected) => 
            onChange({ ...value, solutions: selected })}
          placeholder="Select solutions..."
        />
      </div>

      <div className="space-y-2">
        <Label>Target Audience</Label>
        <MultiSelect
          options={audienceOptions}
          value={value.audience}
          onChange={(selected) => 
            onChange({ ...value, audience: selected as AudienceType[] })}
          placeholder="Select target audience..."
        />
      </div>
    </div>
  )
}