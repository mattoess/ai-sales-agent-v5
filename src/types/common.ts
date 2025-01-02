// src/types/common.ts
export interface LogoAttachment {
    id: string;           // Attachment ID from storage/airtable
    name: string;         // Original filename
    size?: number;        // File size in bytes
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