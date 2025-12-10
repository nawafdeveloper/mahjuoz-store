import TopActionBar from '@/components/top-action-bar';
import { fetchStorePage } from '@/lib/read';
import { notFound } from 'next/navigation';
import React from 'react'

export const runtime = 'edge';

type Metadata = {
    title?: string;
    description?: string;
    icons?: {
        icon: { url: string; type: string; sizes: string };
        apple: { url: string; sizes: string };
    };
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string, subdomain: string }> }) {
    const { locale, subdomain } = await params;

    const storeRes = await fetchStorePage(subdomain);

    if (!storeRes.success || !storeRes.data?.data?.store) {
        return {};
    }

    const store = storeRes.data.data.store;

    const favicon = store.favicon;

    const metadata: Metadata = {
        title: locale === "ar" ? store.storeNameAr : store.storeNameEn,
        description: locale === "ar" ? store.descriptionAr : store.descriptionEn
    };

    if (favicon) {
        const fileExtension = favicon.split('.').pop()?.toLowerCase();
        let iconType = 'image/x-icon';
        if (fileExtension === 'png') {
            iconType = 'image/png';
        } else if (fileExtension === 'svg') {
            iconType = 'image/svg+xml';
        }

        metadata.icons = {
            icon: {
                url: favicon,
                type: iconType,
                sizes: '32x32',
            },
            apple: {
                url: favicon,
                sizes: '180x180',
            }
        };
    }

    return metadata;
}

export default async function StoreLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ subdomain: string }>;
}) {
    const { subdomain } = await params;
    const storeRes = await fetchStorePage(subdomain);

    if (!storeRes.success || !storeRes.data?.data?.store) {
        return notFound();
    }

    return (
        <main className='h-screen'>
            <TopActionBar
                twitter={storeRes.data.data.store.socialTwitter}
                instagram={storeRes.data.data.store.socialInstagram}
                tiktok={storeRes.data.data.store.socialTiktok}
                whatsapp={storeRes.data.data.store.whatsappContact}
            />
            {children}
        </main>
    )
}