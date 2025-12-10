export const runtime = 'edge';

import StoreContent from '@/components/store-content';
import StoreHeader from '@/components/store-header'
import { fetchStorePage } from '@/lib/read';
import { notFound } from 'next/navigation';

export default async function page({ params }: { params: Promise<{ subdomain: string; locale: string }> }) {
    const { subdomain, locale } = await params;
    const storeRes = await fetchStorePage(subdomain);

    if (!storeRes.success || !storeRes.data?.data?.store) {
        return notFound();
    }

    const { reviews, store } = storeRes.data.data;

    const totalReviews = storeRes.data.data.reviews.length;
    const averageRating = reviews.length
        ? (reviews.reduce((s, r) => s + Number(r.rate), 0) / reviews.length).toFixed(2)
        : "0.00";

    return (
        <div className='flex flex-col w-full md:max-w-5xl md:mx-auto p-4 space-y-10'>
            <StoreHeader
                locale={locale}
                storeLogo={storeRes.data.data.store.logo}
                storeNameAr={storeRes.data.data.store.storeNameAr}
                storeDescriptionAr={storeRes.data.data.store.descriptionAr}
                storeNameEn={storeRes.data.data.store.storeNameEn}
                storeDescriptionEn={storeRes.data.data.store.descriptionEn}
                totalRating={averageRating.toString()}
                totalReviews={totalReviews.toString()}
            />
            <StoreContent
                locale={locale}
                categories={storeRes.data.data.categories}
                layout={storeRes.data.data.store.serviceLayout}
                store={store}
                location={storeRes.data.data.locations}
                reviews={storeRes.data.data.reviews}
            />
        </div>
    )
}