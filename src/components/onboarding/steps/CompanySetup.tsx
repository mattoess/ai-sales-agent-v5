// src/components/onboarding/steps/CompanySetup.tsx
import { useState } from 'react';
import { useOnboardingStore } from '../../../store/onboardingStore';
import { useFileUpload } from '../../../components/admin/content/hooks/useFileUpload';
import { Upload, Loader2, AlertCircle } from 'lucide-react';
import { StepProps } from '../../../types/onboarding';

interface ValidationErrors {
  companyName?: string;
  website?: string;
  logoUrl?: string;
}

export function CompanySetup({}: StepProps) {
  const { onboarding, updateOnboardingData } = useOnboardingStore();
  const { uploadFiles } = useFileUpload();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isUploading, setIsUploading] = useState(false);

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case 'companyName':
        return !value.trim() ? 'Company name is required' : undefined;
      case 'website':
        if (value && !value.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)) {
          return 'Please enter a valid website URL';
        }
        return undefined;
      default:
        return undefined;
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;

    const file = files[0];
    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, logoUrl: 'File size must be less than 10MB' }));
      return;
    }

    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, logoUrl: 'Please upload an image file' }));
      return;
    }

    setLogoFile(file);
    setIsUploading(true);
    try {
      await uploadFiles(files, '/company-logos');
      updateOnboardingData({ logoUrl: `/company-logos/${file.name}` });
      setErrors(prev => ({ ...prev, logoUrl: undefined }));
    } catch (error) {
      console.error('Error uploading logo:', error);
      setErrors(prev => ({ ...prev, logoUrl: 'Failed to upload logo. Please try again.' }));
    } finally {
      setIsUploading(false);
    }
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

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
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

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
        <p className="mt-1 text-sm text-gray-500">
          Add your company information and branding to personalize your workspace.
        </p>
      </div>

      {/* Logo Upload Section */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">
          Company Logo
        </label>
        <div className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
          errors.logoUrl ? 'border-red-300' : 'border-gray-300'
        } border-dashed rounded-md hover:border-gray-400 transition-colors`}>
          <div className="space-y-1 text-center">
            {isUploading ? (
              <Loader2 className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
            ) : logoFile ? (
              <img 
                src={URL.createObjectURL(logoFile)} 
                alt="Preview" 
                className="mx-auto h-24 w-24 object-contain"
              />
            ) : (
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
            )}
            <div className="flex text-sm text-gray-600">
              <label htmlFor="logo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                <span>Upload a file</span>
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
        {renderError('logoUrl')}
      </div>

      {/* Company Information Form */}
      <div className="space-y-4">
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Company Name <span className="text-red-500">*</span>
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
            Website
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
          <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
            Industry
          </label>
          <input
            type="text"
            name="industry"
            id="industry"
            value={onboarding.data.industry || ''}
            onChange={handleCompanyInfoUpdate}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
    </div>
  );
}