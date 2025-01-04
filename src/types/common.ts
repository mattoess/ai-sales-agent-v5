// src/types/common.ts
export interface LogoInfo {
    name: string;
    path: string;    // URL path to the logo in public folder
    type?: string;
    uploadedAt: string;
}

export type IndustryType =
  | 'Product Technology'
  | 'SaaS'
  | 'Healthcare/HealthTech'
  | 'Finance/FinTech'
  | 'Manufacturing'
  | 'Retail'
  | 'Education/EdTech'
  | 'Professional Services (IT, Legal, Consulting)'
  | 'Marketing/MarTech'
  | 'Telecommunications'
  | 'Energy'
  | 'Other';

export interface BaseClientData {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    clerkUserId?: string;
    clientId?: string;
    website?: string;
    industry?: IndustryType;
    logo?: LogoInfo;  // Changed from LogoAttachment to LogoInfo
}

export interface BaseResponse {
    status: 'success' | 'error';
    message?: string;
    timestamp?: string;
    environment?: string;
}