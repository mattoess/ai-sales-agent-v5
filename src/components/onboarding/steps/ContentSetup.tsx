// src/components/onboarding/steps/ContentSetup.tsx
import { useState } from 'react';
import { useOnboardingStore } from '../../../store/onboardingStore';
import { useFileUpload } from '../../../components/admin/content/hooks/useFileUpload';
import { File, Link, Video, AlertCircle } from 'lucide-react';
import { StepProps } from '../../../types/onboarding';

interface UploadError {
  type: 'document' | 'video' | 'link';
  message: string;
}

export function ContentSetup({}: StepProps) {
  const { onboarding, addContent } = useOnboardingStore();
  const { uploadFiles } = useFileUpload();
  const [error, setError] = useState<UploadError | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'document' | 'video') => {
    const files = event.target.files;
    if (!files?.length) return;

    // Validate file size (100MB limit for videos, 10MB for documents)
    const maxSize = type === 'video' ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (files[0].size > maxSize) {
      setError({
        type,
        message: `File size must be less than ${type === 'video' ? '100MB' : '10MB'}`
      });
      return;
    }

    setIsUploading(true);
    try {
      const path = type === 'document' ? '/documents' : '/videos';
      await uploadFiles(files, path);

      addContent({
        type,
        data: {
          id: Date.now().toString(),
          title: files[0].name,
          url: `${path}/${files[0].name}`
        }
      });

      setError(null);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      setError({
        type,
        message: `Failed to upload ${type}. Please try again.`
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleLinkAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('url') as string;
    const title = formData.get('title') as string;

    if (!url.match(/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/)) {
      setError({
        type: 'link',
        message: 'Please enter a valid URL'
      });
      return;
    }

    addContent({
      type: 'link',
      data: {
        id: Date.now().toString(),
        title,
        url
      }
    });

    setError(null);
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Add Your Content</h3>
        <p className="mt-1 text-sm text-gray-500">
          Upload materials and resources for your discovery sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Document Upload */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <File className="h-6 w-6 text-blue-500 mr-2" />
            <h4 className="text-lg font-medium">Documents</h4>
          </div>
          <div className="mt-2">
            <label className="block">
              <span className="sr-only">Choose documents</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept=".pdf,.ppt,.pptx,.doc,.docx"
                onChange={(e) => handleFileUpload(e, 'document')}
              />
            </label>
            {error?.type === 'document' && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error.message}
              </p>
            )}
            {isUploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Uploading...</p>
              </div>
            )}
          </div>
        </div>

        {/* Video Upload */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Video className="h-6 w-6 text-blue-500 mr-2" />
            <h4 className="text-lg font-medium">Videos</h4>
          </div>
          <div className="mt-2">
            <label className="block">
              <span className="sr-only">Choose video</span>
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                accept="video/*"
                onChange={(e) => handleFileUpload(e, 'video')}
              />
            </label>
            {error?.type === 'video' && (
              <p className="mt-2 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error.message}
              </p>
            )}
            {isUploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: '100%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">Uploading...</p>
              </div>
            )}
          </div>
        </div>

        {/* Web Resources */}
        <div className="border rounded-lg p-6">
          <div className="flex items-center mb-4">
            <Link className="h-6 w-6 text-blue-500 mr-2" />
            <h4 className="text-lg font-medium">Web Resources</h4>
          </div>
          <form onSubmit={handleLinkAdd} className="space-y-4">
            <div>
              <input
                type="text"
                name="title"
                placeholder="Resource Title"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <input
                type="url"
                name="url"
                placeholder="https://"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            {error?.type === 'link' && (
              <p className="text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {error.message}
              </p>
            )}
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Resource
            </button>
          </form>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>
          You can always add or modify content later from the Content Management section.
        </p>
      </div>
    </div>
  );
}