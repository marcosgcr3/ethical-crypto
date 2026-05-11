/**
 * Calculates the estimated reading time for a given HTML content string.
 * Strips HTML tags and assumes a reading speed of 200 words per minute.
 * Returns a minimum of 5 minutes as per project design.
 */
export function calculateReadTime(content: string): number {
  if (!content) return 5;
  
  // Strip HTML tags to get plain text
  const plainText = content.replace(/<[^>]*>/g, ' ');
  
  // Count words (handle multiple spaces and newlines)
  const words = plainText.trim().split(/\s+/).filter(word => word.length > 0).length;
  
  // Standard reading speed: 200 words per minute
  // Round up to the nearest minute
  const minutes = Math.ceil(words / 200);
  
  // Maintain the design choice of minimum 5 minutes
  return Math.max(5, minutes);
}
