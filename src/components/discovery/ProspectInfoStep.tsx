import React from 'react';
import { useDiscoveryStore } from '../../store/discoveryStore';

export function ProspectInfoStep() {
  const { prospectInfo, updateProspectInfo } = useDiscoveryStore((state) => ({
    prospectInfo: state.discovery.prospectInfo,
    updateProspectInfo: state.updateProspectInfo,
  }));

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
      </div>
    </div>
  );
}