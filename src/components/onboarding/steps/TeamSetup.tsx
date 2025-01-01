// src/components/onboarding/steps/TeamSetup.tsx
import { useState } from 'react';
import { useOnboardingStore } from '../../../store/onboardingStore';
import { Copy, Check, Plus, X, Mail } from 'lucide-react';
import { StepProps } from '../../../types/onboarding';

interface InviteEmail {
  email: string;
  id: string;
}

interface EmailItem {
  email: string;
  id: string;
}

export function TeamSetup({}: StepProps) {
  const { onboarding, updateOnboardingData } = useOnboardingStore();
  const [inviteEmails, setInviteEmails] = useState<InviteEmail[]>([{ email: '', id: '1' }]);
  const [copied, setCopied] = useState(false);
  
  const invitationLink = `${window.location.origin}/invite/${onboarding.data.clientId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(invitationLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const addEmailField = () => {
    setInviteEmails([...inviteEmails, { email: '', id: Date.now().toString() }]);
  };

  const removeEmailField = (id: string) => {
    setInviteEmails(inviteEmails.filter((email: EmailItem) => email.id !== id));
  };

  const updateEmail = (id: string, value: string) => {
    setInviteEmails(inviteEmails.map((email: EmailItem) => 
      email.id === id ? { ...email, email: value } : email
    ));
  };

  const handleInvite = () => {
    const validEmails = inviteEmails
      .filter(({ email }: EmailItem) => email.trim() !== '')
      .map(({ email }: EmailItem) => email);

    if (validEmails.length > 0) {
      updateOnboardingData({
        invitedMembers: validEmails.map((email: string) => ({
          email,
          status: 'pending' as const,
          invitedAt: new Date().toISOString()
        }))
      });
    }
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Invite Your Team</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by inviting team members to collaborate in your workspace.
        </p>
      </div>

      {/* Invitation Link Section */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Share Invitation Link
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            readOnly
            value={invitationLink}
            className="flex-1 min-w-0 block px-3 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-500"
          />
          <button
            onClick={handleCopyLink}
            className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {copied ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : (
              <Copy className="h-5 w-5 text-gray-400" />
            )}
          </button>
        </div>
      </div>

      {/* Email Invites Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Invite by Email
          </label>
          <button
            onClick={addEmailField}
            className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Another
          </button>
        </div>
        
        <div className="space-y-3">
          {inviteEmails.map(({ id, email }: EmailItem) => (
            <div key={id} className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <Mail className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => updateEmail(id, e.target.value)}
                  placeholder="colleague@company.com"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {inviteEmails.length > 1 && (
                <button
                  onClick={() => removeEmailField(id)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={handleInvite}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Send Invites
      </button>

      <p className="text-sm text-gray-500">
        Team members will receive an email invitation to join your workspace.
        You can manage team members anytime from the Team settings.
      </p>
    </div>
  );
}