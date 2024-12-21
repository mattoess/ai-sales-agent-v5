import { DiscoveryState } from '../../types/discovery';
import { validateEmail } from '../../utils/validation';

export function useStageValidation() {
  const validateProspectInfo = (prospectInfo: DiscoveryState['prospectInfo']) => {
    const { firstName, lastName, email, companyName } = prospectInfo;
    
    if (!firstName?.trim()) {
      throw new Error('First name is required');
    }
    if (!lastName?.trim()) {
      throw new Error('Last name is required');
    }
    if (!email?.trim()) {
      throw new Error('Email is required');
    }
    if (!validateEmail(email)) {
      throw new Error('Please enter a valid email address');
    }
    if (!companyName?.trim()) {
      throw new Error('Company name is required');
    }
  };

  const validateCurrentState = (barriers: string[]) => {
    if (!barriers.length) {
      throw new Error('Please add at least one barrier');
    }
  };

  return {
    validateProspectInfo,
    validateCurrentState
  };
}