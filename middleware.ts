import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    const url = req.nextUrl.clone();
    const host = req.headers.get('host') || '';
    const [subdomain] = host.split('.');

    const { pathname } = url;
    const locale = pathname.split('/')[1] || 'ar';

    if (
        subdomain &&
        subdomain !== process.env.NEXT_PUBLIC_ROOT_DOMAIN &&
        subdomain !== 'mahjuoz' &&
        subdomain !== '127'
    ) {
        const restOfPath = pathname.replace(`/${locale}`, '');
        const rewritePath = `/${locale}/${subdomain}${restOfPath}`;

        return NextResponse.rewrite(new URL(rewritePath, req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
    ]
};
