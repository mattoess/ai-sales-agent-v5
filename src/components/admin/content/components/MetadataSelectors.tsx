import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { AudienceType } from '../types';

interface MetadataSelectorsProps {
  value: {
    solutions: string[];
    industries: string[];
    outcomes: string[];
    audience: AudienceType[];
  };
  onChange: (value: MetadataSelectorsProps['value']) => void;
}

// Predefined options based on discovery types
const SOLUTIONS = [
  'Executive Coaching',
  'Team Alignment',
  'Leadership Development',
  'Change Management',
  'Strategic Planning'
];

const INDUSTRIES = [
  'Technology',
  'Healthcare',
  'Financial Services',
  'Professional Services',
  'Manufacturing'
];

const OUTCOMES = [
  'Increased Revenue',
  'Cost Reduction',
  'Team Performance',
  'Process Efficiency',
  'Customer Satisfaction'
];

// Update AUDIENCE to use the type
const AUDIENCE: readonly AudienceType[] = ['technical', 'business', 'executive'];

export function MetadataSelectors({ value, onChange }: MetadataSelectorsProps) {
  // Update handleAdd to handle different types
  const handleAdd = <T extends string | AudienceType>(
    field: keyof typeof value,
    item: T
  ) => {
    if (!value[field].includes(item as any)) {
      onChange({
        ...value,
        [field]: [...value[field], item]
      });
    }
  };

  // Update handleRemove to handle different types
  const handleRemove = <T extends string | AudienceType>(
    field: keyof typeof value,
    item: T
  ) => {
    onChange({
      ...value,
      [field]: value[field].filter(i => i !== item)
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

      {/* Industries */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Target Industries</label>
        <div className="space-y-2">
          <Select onValueChange={(v: string) => handleAdd('industries', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select industries..." />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRIES.map(industry => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2">
            {value.industries.map(industry => (
              <Badge key={industry} variant="default" className="flex items-center gap-1">
                {industry}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleRemove('industries', industry)}
                />
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Business Outcomes */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Business Outcomes</label>
        <div className="space-y-2">
          <Select onValueChange={(v: string) => handleAdd('outcomes', v)}>
            <SelectTrigger>
              <SelectValue placeholder="Select outcomes..." />
            </SelectTrigger>
            <SelectContent>
              {OUTCOMES.map(outcome => (
                <SelectItem key={outcome} value={outcome}>
                  {outcome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2">
            {value.outcomes.map(outcome => (
              <Badge key={outcome} variant="outline" className="flex items-center gap-1">
                {outcome}
                <button onClick={() => handleRemove('outcomes', outcome)}>
                  <X className="w-3 h-3 hover:text-destructive" />
                </button>
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
    </div>
  );
}