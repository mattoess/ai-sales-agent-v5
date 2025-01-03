// src/types/common.ts
export interface LogoAttachment {
 //   id: string;           // Unique identifier (e.g., airtable attachment id)
    name: string;         // Original filename
    path: string;         // Stored path (/company-logos/{clientId}/{filename})
    type?: string;        // MIME type
    uploadedAt: string;   // Timestamp
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
    logo?: LogoAttachment;
}

export interface BaseResponse {
    status: 'success' | 'error';
    message?: string;
    timestamp?: string;
    environment?: string;
}