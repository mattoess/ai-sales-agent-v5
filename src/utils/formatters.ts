// src/utils/formatters.ts

/**
 * Formats a duration in minutes to a readable "h:mm" format
 * @param minutes Total number of minutes
 * @returns Formatted string in "h:mm" format
 * @example
 * formatDuration(90) // returns "1:30"
 * formatDuration(45) // returns "0:45"
 * formatDuration(150) // returns "2:30"
 */
export function formatDuration(minutes: number): string {
    if (!minutes || isNaN(minutes)) return '0:00';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}
  
/**
 * Parses a duration string back to minutes
 * @param duration Duration string in "h:mm" format
 * @returns Total minutes as a number
 * @example
 * parseDuration("1:30") // returns 90
 * parseDuration("0:45") // returns 45
 */
export function parseDuration(duration: string): number {
    if (!duration) return 0;
    
    const [hours, minutes] = duration.split(':').map(Number);
    return (hours * 60) + (minutes || 0);
}

/**
 * Formats an ISO date string to a readable format
 * @param isoDate ISO date string
 * @returns Formatted date string
 * @example
 * formatDate("2024-01-20T15:30:00Z") // returns "Jan 20, 2024, 3:30 PM"
 */
export function formatDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}