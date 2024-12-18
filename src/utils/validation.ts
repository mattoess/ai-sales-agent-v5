export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export function validateDate(date: string): boolean {
  const selectedDate = new Date(date);
  const today = new Date();
  return selectedDate >= today;
}