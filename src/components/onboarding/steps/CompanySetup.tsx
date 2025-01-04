// src/components/onboarding/steps/CompanySetup.tsx
import { useState } from 'react';
import { useOnboardingStore } from '../../../store/onboardingStore';
import { useClientStore } from '../../../store/clientStore'; 
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { StepProps } from '../../../types/onboarding';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { saveCompanySetup } from '../../../services/clientService';
import { Button } from '../../../components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { useToast } from '../../../components/ui/use-toast';
import { LogoInfo, IndustryType } from '../../../types/common';
import { testCompanySetupWebhook } from '../../../utils/webhookTester';

interface ValidationErrors {
  companyName?: string;
  website?: string;
  logo?: string;
  industry?: string;
  submit?: string;
}

const INDUSTRY_OPTIONS: IndustryType[] = [
    'Product Technology',
    'SaaS',
    'Healthcare/HealthTech',
    'Finance/FinTech',
    'Manufacturing',
    'Retail',
    'Education/EdTech',
    'Professional Services (IT, Legal, Consulting)',
    'Marketing/MarTech',
    'Telecommunications',
    'Energy',
    'Other'
];


export function CompanySetup({}: StepProps): JSX.Element {
  const { toast } = useToast();
  const { user } = useUser();
  const { onboarding, updateOnboardingData, setCurrentStep } = useOnboardingStore();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'companyName':
        return !value.trim() ? 'Company name is required' : undefined;
      case 'website':
        if (value && !value.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)) {
          return 'Please enter a valid website URL';
        }
        return undefined;
      case 'industry':
        return !value ? 'Please select an industry' : undefined;
      default:
        return undefined;
    }
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    
    newErrors.companyName = validateField('companyName', onboarding.data.companyName);
    if (onboarding.data.website) {
      newErrors.website = validateField('website', onboarding.data.website);
    }
    if (!onboarding.data.industry) {
      newErrors.industry = 'Please select an industry';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== undefined);
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length || !user?.id) return;

    const file = files[0];
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logo: 'File size must be less than 10MB' }));
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, logo: 'Please upload an image file' }));
      return;
    }

    setLogoFile(file);
    const logoPath = `/company-logos/${user.id}/${file.name}`;
    
    const logoInfo: LogoInfo = {
      name: file.name,
      path: logoPath,
      type: file.type,
      uploadedAt: new Date().toISOString()
    };
    
    updateOnboardingData({ logo: logoInfo });
    setErrors(prev => ({ ...prev, logo: undefined }));
};

  const handleCompanyInfoUpdate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    updateOnboardingData({ [name]: value });
  };

  const handleIndustryChange = (value: string) => {
    const error = validateField('industry', value);
    setErrors(prev => ({
      ...prev,
      industry: error
    }));
    updateOnboardingData({ industry: value as IndustryType });
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleNext = async () => {
    if (!validateForm()) return;
    
    setIsSaving(true);
    const clientStore = useClientStore.getState();
  
    toast({
      title: "Saving...",
      description: "Creating your workspace",
    });
    
    try {
      const response = await saveCompanySetup({
        ...onboarding.data,
        firstName: user?.firstName || '',
        lastName: user?.lastName || '',
        email: user?.emailAddresses[0]?.emailAddress || '',
        clerkUserId: user?.id || ''
      });
  
      if (response.status === 'success' && response.data) {
        await updateOnboardingData({
          clientId: response.data.clientId,
          userID: response.data.userID,
          logo: response.data.company.logo
        });
  
        // Update client store with correct status mapping
        clientStore.setClientData(
          response.data.clientId,
          user?.id || '',
          response.data.userID
        );
  
        clientStore.updateClientData({
          role: response.data.user.role,
          status: response.data.user.status === 'pending' ? 'inactive' : 'active',
          verificationStatus: 'pending'
        });
  
        toast({
          title: "Success",
          description: "Your workspace has been created. Proceeding to next step...",
        });
        
        setTimeout(() => {
          setCurrentStep(3);
        }, 500);
      } else {
        setErrors(prev => ({
          ...prev,
          submit: response.message || 'Failed to create workspace'
        }));
      }
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to create workspace. Please try again.'
      }));
      console.error('Error creating workspace:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderError = (fieldName: keyof ValidationErrors) => {
    if (!errors[fieldName]) return null;
    
    return (
      <div className="mt-1 text-sm text-red-600 flex items-center">
        <AlertCircle className="w-4 h-4 mr-1" />
        {errors[fieldName]}
      </div>
    );
  };

  const renderLogoPreview = () => {
    if (isSaving) {
      return <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />;
    }
    
    if (logoFile) {
      return (
        <img 
          src={URL.createObjectURL(logoFile)}
          alt="Company logo preview" 
          className="mx-auto h-24 w-24 object-contain"
        />
      );
    }

    if (onboarding.data.logo?.path) {
      return (
        <div className="relative">
          <img 
            src={onboarding.data.logo.path}
            alt="Company logo" 
            className="mx-auto h-24 w-24 object-contain"
            onError={() => {
              setLogoFile(null);
              updateOnboardingData({ 
                logo: undefined 
              });
            }}
          />
        </div>
      );
    }

    return <Upload className="mx-auto h-12 w-12 text-gray-400" />;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add your company information and branding to personalize your workspace.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name: Not working for a company? We recommend you enter your First and Last Name. <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={onboarding.data.companyName}
            onChange={handleCompanyInfoUpdate}
            onBlur={handleBlur}
            className={`mt-1 block w-full border ${
              errors.companyName ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            required
          />
          {renderError('companyName')}
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700">
            Website: If you do not have a website, you can enter your LinkedIn profile url.
          </label>
          <input
            type="url"
            name="website"
            id="website"
            placeholder="https://example.com"
            value={onboarding.data.website || ''}
            onChange={handleCompanyInfoUpdate}
            onBlur={handleBlur}
            className={`mt-1 block w-full border ${
              errors.website ? 'border-red-300' : 'border-gray-300'
            } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          />
          {renderError('website')}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Company Logo: This will be displayed in your workspace when you are working with Prospects.
          </label>
          <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
            errors.logo ? 'border-red-300' : 'border-gray-300'
          } border-dashed rounded-md hover:border-gray-400 transition-colors`}>
            <div className="space-y-1 text-center">
              {renderLogoPreview()}
              <div className="flex text-sm text-gray-600">
                <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                  <span>{logoFile || onboarding.data.logo ? 'Change logo' : 'Upload a file'}</span>
                  <input
                    id="logo-upload"
                    name="logo-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleLogoUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </div>
          </div>
          {renderError('logo')}
        </div>

        <div>
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <Select
            value={onboarding.data.industry}
            onValueChange={handleIndustryChange}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent>
              {INDUSTRY_OPTIONS.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {renderError('industry')}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <Button
            onClick={() => testCompanySetupWebhook()}
            className="px-4 py-2 bg-gray-200"
            type="button"
          >
            Test Webhook
          </Button>
          <Button
            onClick={handleNext}
            disabled={isSaving}
            className="px-4 py-2"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              'Save Company Info & Continue'
            )}
          </Button>
        </div>
        
        {errors.submit && (
          <div className="mt-2 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.submit}
          </div>
        )}
      </div>
    </div>
  );
}