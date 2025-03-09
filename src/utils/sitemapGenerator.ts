import { supabase } from '../lib/supabaseClient';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = async (baseUrl: string): Promise<string> => {
  const urls: SitemapURL[] = [];

  // Add static pages
  urls.push(
    { loc: `${baseUrl}`, priority: 1.0, changefreq: 'hourly' },
    { loc: `${baseUrl}/login`, priority: 0.5, changefreq: 'monthly' },
    { loc: `${baseUrl}/register`, priority: 0.5, changefreq: 'monthly' },
    { loc: `${baseUrl}/privacy-policy`, priority: 0.3, changefreq: 'monthly' },
    { loc: `${baseUrl}/terms-of-use`, priority: 0.3, changefreq: 'monthly' }
  );

  // Add dynamic report pages
  const { data: reports } = await supabase
    .from('rat_reports')
    .select('id, updated_at')
    .order('updated_at', { ascending: false });

  if (reports) {
    reports.forEach(report => {
      urls.push({
        loc: `${baseUrl}/report/${report.id}`,
        lastmod: report.updated_at,
        priority: 0.8,
        changefreq: 'daily'
      });
    });
  }

  return generateXMLSitemap(urls);
};

const generateXMLSitemap = (urls: SitemapURL[]): string => {
  const xmlUrls = urls
    .map(url => `
      <url>
        <loc>${url.loc}</loc>
        ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
        ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
        ${url.priority ? `<priority>${url.priority}</priority>` : ''}
      </url>
    `)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${xmlUrls}
    </urlset>`;
};