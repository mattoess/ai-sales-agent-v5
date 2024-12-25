import React from 'react';
import { useDiscoveryStore } from '../../store/discoveryStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export const ProspectInfoForm: React.FC = () => {
  const { prospectInfo, updateProspectInfo } = useDiscoveryStore((state) => ({
    prospectInfo: state.discovery.prospectInfo,
    updateProspectInfo: state.updateProspectInfo,
  }));

  const handleIndustryTypeChange = (value: string) => {
    updateProspectInfo({ industryType: value });
  };

  const handleCompanySizeChange = (value: string) => {
    const size = parseInt(value, 10);
    if (!isNaN(size)) {
      updateProspectInfo({ companySize: size });
    }
  };

  const handleUrgencyLevelChange = (value: 'low' | 'medium' | 'high') => {
    updateProspectInfo({ urgencyLevel: value });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Industry Type
          </label>
          <Select
            onValueChange={handleIndustryTypeChange}
            value={prospectInfo.industryType || ''}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="healthcare">Healthcare</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="retail">Retail</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Size
          </label>
          <Select
            onValueChange={handleCompanySizeChange}
            value={prospectInfo.companySize?.toString() || ''}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Company Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1-10 Employees</SelectItem>
              <SelectItem value="2">11-50 Employees</SelectItem>
              <SelectItem value="3">51-200 Employees</SelectItem>
              <SelectItem value="4">201-500 Employees</SelectItem>
              <SelectItem value="5">500+ Employees</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level
          </label>
          <Select
            onValueChange={handleUrgencyLevelChange}
            value={prospectInfo.urgencyLevel || ''}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
