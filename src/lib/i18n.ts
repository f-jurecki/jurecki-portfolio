export type Locale = 'en' | 'ru';

export const getLocale = (pathname: string): Locale => pathname === '/ru' || pathname.startsWith('/ru/') ? 'ru' : 'en';

export const stripLocale = (pathname: string) => {
	if (pathname === '/ru' || pathname === '/ru/') return '/';
	return pathname.replace(/^\/ru(?=\/)/, '');
};

export const localizedPath = (href: string, locale: Locale) => {
	if (/^(?:[a-z]+:|#)/i.test(href)) return href;
	const match = href.match(/^([^?#]*)(.*)$/);
	const pathname = stripLocale(match?.[1] || '/');
	const suffix = match?.[2] || '';
	return `${locale === 'ru' ? (pathname === '/' ? '/ru/' : `/ru${pathname}`) : pathname}${suffix}`;
};
