import { useDiscoveryStore } from '../../store/discoveryStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function ProspectInfoStep() {
  const { prospectInfo, updateProspectInfo, showError, setShowError } = useDiscoveryStore((state) => ({
    prospectInfo: state.discovery.prospectInfo,
    updateProspectInfo: state.updateProspectInfo,
    showError: state.discovery.showError,
    setShowError: state.setShowError,
  }));

  // Handlers for dropdown selectors
  const handleIndustryTypeChange = (value: string) => {
    updateProspectInfo({ industryType: value });
    if (showError) setShowError(false);
  };

  const handleCompanySizeChange = (value: string) => {
    updateProspectInfo({ companySize: value });
    if (showError) setShowError(false);
  };

  const handleUrgencyLevelChange = (value: 'low' | 'medium' | 'high') => {
    updateProspectInfo({ urgencyLevel: value });
    if (showError) setShowError(false);
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      
      {showError && (
        <Alert variant="destructive">
          <AlertDescription>
            Please make sure you select Industry, Company Size, and Urgency Level before moving forward
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Contact Information */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            value={prospectInfo.firstName}
            onChange={(e) => updateProspectInfo({ firstName: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#009A4D] focus:border-[#009A4D]"
            placeholder="Enter first name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            value={prospectInfo.lastName}
            onChange={(e) => updateProspectInfo({ lastName: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#009A4D] focus:border-[#009A4D]"
            placeholder="Enter last name"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={prospectInfo.email}
            onChange={(e) => updateProspectInfo({ email: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#009A4D] focus:border-[#009A4D]"
            placeholder="Enter email address"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            value={prospectInfo.companyName || ''}
            onChange={(e) => updateProspectInfo({ companyName: e.target.value })}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-[#009A4D] focus:border-[#009A4D]"
            placeholder="Enter company name"
          />
        </div>

        {/* Additional Fields */}
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
              <SelectItem value="prod-technology">Technology-Product</SelectItem>
              <SelectItem value="SaaS">SaaS</SelectItem>
              <SelectItem value="healthcare">Healthcare/HealthTech</SelectItem>
              <SelectItem value="finance">Finance/FinTech</SelectItem>
              <SelectItem value="manufacturing">Manufacturing</SelectItem>
              <SelectItem value="pro-serve">Professional Services</SelectItem>
              <SelectItem value="marketing">Marketing/MarTech</SelectItem>
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
              <SelectItem value="1-10 Employees">1-10 Employees</SelectItem>
              <SelectItem value="11-50 Employees">11-50 Employees</SelectItem>
              <SelectItem value="51-200 Employees">51-200 Employees</SelectItem>
              <SelectItem value="201-500 Employees">201-500 Employees</SelectItem>
              <SelectItem value="500+ Employees">500+ Employees</SelectItem>
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
}