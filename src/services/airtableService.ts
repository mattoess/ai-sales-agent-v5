import { OnboardingData } from '../types/onboarding';

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = 'Clients';

export async function createClient(data: OnboardingData) {
  try {
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [{
          fields: {
            'First Name': data.firstName,
            'Last Name': data.lastName,
            'Email': data.email,
            'Company': data.companyName,
            'Status': 'New'
          }
        }]
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create client record');
    }

    const result = await response.json();
    return result.records[0].id;
  } catch (error) {
    console.error('Airtable integration error:', error);
    throw error;
  }
}