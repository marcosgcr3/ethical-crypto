import { ImageLoaderProps } from 'next/image';

/**
 * Custom Image Loader for Ethical Crypto
 * Maps local image paths to our optimization API route.
 * 
 * Example: /images/example.png -> /api/images/example.png?w=640
 */
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  // If it's an external URL, return as is (or with minimal processing)
  if (src.startsWith('http')) {
    return src;
  }

  // Handle our local images through the optimization API
  if (src.startsWith('/images/')) {
    const filename = src.split('/').pop();
    return `/api/images/${filename}?w=${width}${quality ? `&q=${quality}` : ''}`;
  }

  // Handle our images already pointing to /api/images/
  if (src.startsWith('/api/images/')) {
    const baseUrl = src.split('?')[0];
    return `${baseUrl}?w=${width}${quality ? `&q=${quality}` : ''}`;
  }

  // Fallback for other paths
  return `${src}${src.includes('?') ? '&' : '?'}w=${width}`;
}
