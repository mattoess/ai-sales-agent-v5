import { Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Dashboard } from '../pages/Dashboard';
import { Pricing } from '../components/Pricing';
import { Account } from '../components/Account';
import { LandingPage } from '../components/landing/LandingPage';
import { Settings } from '../pages/Settings';
import { Profile } from '../pages/settings/Profile';
import { Notifications } from '../pages/settings/Notifications';
import { AIPreferences } from '../pages/settings/AIPreferences';
import { Team } from '../pages/settings/Team';
import { Subscription } from '../pages/account/Subscription';
import { Billing } from '../pages/account/Billing';
import { AdminUsers } from '../pages/admin/Users';
import { AdminAnalytics } from '../pages/admin/Analytics';
import { ContentManager } from '../components/admin/ContentManager';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/pricing" element={<Pricing />} />
      <Route
        path="/"
        element={
          <>
            <SignedIn>
              <DashboardLayout />
            </SignedIn>
            <SignedOut>
              <LandingPage />
            </SignedOut>
          </>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />}>
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="ai-preferences" element={<AIPreferences />} />
          <Route path="team" element={<Team />} />
        </Route>
        <Route path="account">
          <Route path="subscription" element={<Subscription />} />
          <Route path="billing" element={<Billing />} />
        </Route>
        <Route path="admin">
          <Route path="users" element={<AdminUsers />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="content" element={<ContentManager />} />
        </Route>
      </Route>
    </Routes>
  );
}