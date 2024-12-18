import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { PaymentMethods } from '../../components/account/PaymentMethods';
import { BillingHistory } from '../../components/account/BillingHistory';

export function Billing() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing & Payments"
        description="Manage your payment methods and view billing history"
      />
      <div className="grid grid-cols-1 gap-6">
        <PaymentMethods />
        <BillingHistory />
      </div>
    </div>
  );
}