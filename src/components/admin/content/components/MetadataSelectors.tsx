// src/components/admin/content/components/MetadataSelectors.tsx
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { X } from 'lucide-react';
import { AudienceType } from '../types';

interface MetadataSelectorsProps {
  value: {
    solutions: string[];
    audience: AudienceType[];
    isCompanyWide: boolean;
  };
  onChange: (value: MetadataSelectorsProps['value']) => void;
}

// Keep SOLUTIONS and AUDIENCE, remove INDUSTRIES and OUTCOMES
const SOLUTIONS = [
  'Executive Coaching',
  'Team Alignment',
  'Leadership Development',
  'Change Management',
  'Strategic Planning'
];

const AUDIENCE: readonly AudienceType[] = ['technical', 'business', 'executive'];

export function MetadataSelectors({ value, onChange }: MetadataSelectorsProps) {
  const handleAdd = <T extends string | AudienceType>(
    field: keyof Pick<MetadataSelectorsProps['value'], 'solutions' | 'audience'>,
    item: T
  ) => {
    if (!value[field].includes(item as any)) {
      onChange({
        ...value,
        [field]: [...value[field], item]
      });
    }
  };

  const handleRemove = <T extends string | AudienceType>(
    field: keyof Pick<MetadataSelectorsProps['value'], 'solutions' | 'audience'>,
    item: T
  ) => {
    onChange({
      ...value,
      [field]: value[field].filter(i => i !== item)
    });
  };

  const handleCompanyWideChange = (checked: boolean) => {
    onChange({
      ...value,
      isCompanyWide: checked
    });
  };

  return (
    <div className="space-y-4">
      {/* Solutions */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Related Solutions</label>
        <div className="space-y-2">
          <Select onValueChange={(v: string) => handleAdd('solutions', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select solutions..." />
            </SelectTrigger>
            <SelectContent>
              {SOLUTIONS.map(solution => (
                <SelectItem key={solution} value={solution}>
                  {solution}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2">
            {value.solutions.map(solution => (
              <Badge key={solution} variant="default" className="flex items-center gap-1">
                {solution}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleRemove('solutions', solution)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Target Audience</label>
        <div className="flex flex-wrap gap-2">
          {AUDIENCE.map(type => (
            <Badge 
              key={type}
              variant={value.audience.includes(type) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                value.audience.includes(type) 
                  ? handleRemove('audience', type)
                  : handleAdd('audience', type);
              }}
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>

      {/* Company-wide Content */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Document Scope</label>
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={value.isCompanyWide}
            onCheckedChange={handleCompanyWideChange}
          />
          <span className="text-sm text-gray-700">Company-wide content</span>
        </div>
      </div>
    </div>
  );
}