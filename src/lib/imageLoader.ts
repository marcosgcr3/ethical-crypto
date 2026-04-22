import { ImageLoaderProps } from 'next/image';

/**
 * Custom Image Loader for Ethical Crypto
 * Maps local image paths to our optimization API route.
 * 
 * Example: /images/example.png -> /api/images/example.png?w=640
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  // If it's an external URL or a brand asset, return as is
  if (src.startsWith('http') || src.startsWith('/brand/')) {
    return src;
  }

  // Handle our local images through the optimization API
  if (src.startsWith('/images/')) {
    const relativePath = src.substring(8); // Remove '/images/'
    return `/api/images/${relativePath}?w=${width}${quality ? `&q=${quality}` : ''}`;
  }

  // Handle our images already pointing to /api/images/
  if (src.startsWith('/api/images/')) {
    const baseUrl = src.split('?')[0];
    const relativePath = baseUrl.substring(12); // Remove '/api/images/'
    return `/api/images/${relativePath}?w=${width}${quality ? `&q=${quality}` : ''}`;
  }

  // Fallback for other paths
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
}
