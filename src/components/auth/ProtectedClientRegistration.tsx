// src/components/auth/ProtectedClientRegistration.tsx
import { useUser } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientStore } from '../../store/clientStore';
import { ClientRegistrationForm } from '../ClientRegistrationForm';
import { getClientByClerkId } from '../../services/clientService';
import { ROUTES } from '../../config/constants';
import { Loader2 } from 'lucide-react';

export const ProtectedClientRegistration = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { setRegistered } = useClientStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      navigate(ROUTES.SIGN_IN);
      return;
    }

    // Check if user already has a client account
    const checkClientRegistration = async () => {
      try {
        const result = await getClientByClerkId(user.id);
        if (result.status === 'success') {
          setRegistered(true);
          navigate(ROUTES.DASHBOARD);
        }
      } catch (error) {
        console.error('Error checking client registration:', error);
      } finally {
        setIsChecking(false);
      }
    };

    checkClientRegistration();
  }, [user, isLoaded, navigate, setRegistered]);

  if (!isLoaded || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-techcxo-green" />
      </div>
    );
  }

  if (!user) return null;

  return <ClientRegistrationForm />;
};