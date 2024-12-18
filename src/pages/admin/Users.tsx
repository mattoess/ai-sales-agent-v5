import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { UserTable } from '../../components/admin/UserTable';
import { UserFilters } from '../../components/admin/UserFilters';

export function AdminUsers() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="User Management"
        description="View and manage all users in the system"
      >
        <button className="px-4 py-2 bg-[#009A4D] text-white rounded-lg hover:bg-[#009A4D]/90">
          Add User
        </button>
      </PageHeader>
      <UserFilters />
      <UserTable />
    </div>
  );
}