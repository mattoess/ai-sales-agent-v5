import React from 'react';
import { Calendar, Clock, User, Building, ArrowRight } from 'lucide-react';
import { Session } from '../../types/session';
import { useDiscovery } from '../../providers/DiscoveryProvider';

interface SessionCardProps {
  session: Session;
}

export function SessionCard({ session }: SessionCardProps) {
  const { openExistingSession } = useDiscovery();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {session.prospectName}
            </h3>
            <div className="flex items-center text-sm text-gray-500">
              <Building className="w-4 h-4 mr-1" />
              {session.companyName}
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
            {session.status}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            {session.date}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            {session.duration}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <User className="w-4 h-4 mr-2" />
            {session.assignedTo}
          </div>
        </div>

        <button
          onClick={() => openExistingSession(session.id)}
          className="w-full mt-4 px-4 py-2 bg-[#009A4D] text-white rounded-lg hover:bg-[#009A4D]/90 transition-colors flex items-center justify-center"
        >
          View Details
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </div>
  );
}