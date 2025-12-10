import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import { headers } from 'next/headers';

export default getRequestConfig(async ({ requestLocale }) => {
    let requested = await requestLocale;

    if (!requested) {
        const headersList = await headers();
        const localeFromHeader = headersList.get('x-next-intl-locale');
        if (localeFromHeader) {
            requested = localeFromHeader;
        }
    }

    const locale = hasLocale(routing.locales, requested)
        ? requested
        : routing.defaultLocale;

    return {
        locale,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});