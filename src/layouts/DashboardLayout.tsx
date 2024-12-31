// src/layouts/DashboardLayout.tsx
import { Outlet } from 'react-router-dom';
import { TopNav } from './TopNav';

export function DashboardLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <main className="py-6">
        <Outlet />
      </main>
    </div>
  );
}