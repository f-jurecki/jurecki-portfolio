import type { APIRoute } from 'astro';

const routes = [
	'/',
	'/projects/branding',
	'/projects/coming-soon',
	'/projects/infographics',
	'/projects/personal',
	'/projects/personal/cards',
	'/projects/personal/digital-scrapbook',
	'/projects/personal/posters',
	'/projects/personal/republica',
	'/projects/presentations',
	'/projects/product-design/shelfr',
	'/projects/vibecoding',
	'/projects/vibecoding/adobe-scripts',
	'/projects/vibecoding/dataforge',
	'/projects/publications',
	'/projects/publications/iofs',
	'/projects/publications/kipd',
	'/projects/publications/unesco',
];

const escapeXml = (value: string) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export const GET: APIRoute = ({ site }) => {
	const origin = site ?? new URL('https://jurecki-portfolio.vercel.app');
	const urls = routes.map((route) => `\t<url><loc>${escapeXml(new URL(route, origin).toString())}</loc></url>`).join('\n');
	const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
