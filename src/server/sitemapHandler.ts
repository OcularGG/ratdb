import { generateSitemap } from '../utils/sitemapGenerator';

export const handleSitemapRequest = async (req: Request): Promise<Response> => {
  try {
    const baseUrl = import.meta.env.VITE_APP_URL || 'https://albionratdb.com';
    const sitemap = await generateSitemap(baseUrl);
    
    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
};