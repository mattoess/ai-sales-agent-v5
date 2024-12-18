import React from 'react';
import { Switch } from '../common/Switch';

const notificationSettings = [
  {
    id: 'email-notifications',
    title: 'Email Notifications',
    description: 'Receive email notifications for important updates',
  },
  {
    id: 'discovery-reminders',
    title: 'Discovery Reminders',
    description: 'Get reminded about upcoming discovery sessions',
  },
  {
    id: 'team-updates',
    title: 'Team Updates',
    description: 'Notifications about team member activities',
  },
];

export function NotificationPreferences() {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
      {notificationSettings.map((setting) => (
        <div key={setting.id} className="px-4 py-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                {setting.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">{setting.description}</p>
            </div>
            <Switch id={setting.id} />
          </div>
        </div>
      ))}
    </div>
  );
}