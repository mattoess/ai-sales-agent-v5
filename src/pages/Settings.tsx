import React from 'react';
import { Outlet } from 'react-router-dom';
import { SettingsNav } from '../components/settings/SettingsNav';

export function Settings() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        <SettingsNav />
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}