"use client";

import { Category, Location, Review, Store } from '@/types/read.type';
import { Calendar, MapPin, StarFill } from '@gravity-ui/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react'

type Props = {
    locale: string;
    categories: Category[];
    layout: string;
    store: Store;
    location: Location[];
    reviews: Review[];
}

export default function StoreContent({ locale, categories, layout, store, location, reviews }: Props) {
    const [tab, setTab] = useState<'services' | 'locations' | 'reviews'>('services');
    const [selectedCategory, setSelectedCategory] = useState(categories[0].id);

    const handleSelectTab = (selectedTab: 'services' | 'locations' | 'reviews') => {
        setTab(selectedTab);
    };

    const getHexColor = (color: string | undefined) => {
        switch (color) {
            case 'bg-purple-500':
                return '#A855F7';
            case 'bg-green-500':
                return '#22C55E';
            case 'bg-orange-500':
                return '#F97316';
            case 'bg-red-500':
                return '#EF4444';
            case 'bg-pink-500':
                return '#EC4899';

            default:
                return '#3B82F6';
        }
    };

    const mainColor = getHexColor(store.storeThemeColor);

    const services = categories.filter((cat) => cat.id === selectedCategory);

    return (
        <div className='flex flex-col space-y-8 w-full'>
            <div className='flex flex-row items-center justify-evenly w-full border-b border-secondary-text/20'>
                <div className='relative w-full'>
                    <button onClick={() => handleSelectTab('services')} className={`text-sm font-semibold py-2 cursor-pointer w-full`} style={{ color: tab === 'services' ? mainColor : 'gray' }}>
                        {locale === 'ar' ? 'الخدمات' : 'Services'}
                    </button>
                    {tab === 'services' && (
                        <div className='w-full bg-primary h-0.5 absolute left-0 right-0 bottom-0' />
                    )}
                </div>
                <div className='relative w-full'>
                    <button onClick={() => handleSelectTab('locations')} className={`text-sm font-semibold py-2 cursor-pointer w-full`} style={{ color: tab === 'locations' ? mainColor : 'gray' }}>
                        {locale === 'ar' ? 'المواقع' : 'Locations'}
                    </button>
                    {tab === 'locations' && (
                        <div className='w-full bg-primary h-0.5 absolute left-0 right-0 bottom-0' />
                    )}
                </div>
                <div className='relative w-full'>
                    <button onClick={() => handleSelectTab('reviews')} className={`text-sm font-semibold py-2 cursor-pointer w-full`} style={{ color: tab === 'reviews' ? mainColor : 'gray' }}>
                        {locale === 'ar' ? 'التقييمات' : 'Reviews'}
                    </button>
                    {tab === 'reviews' && (
                        <div className='w-full h-0.5 absolute left-0 right-0 bottom-0' style={{ backgroundColor: mainColor }} />
                    )}
                </div>
            </div>
            {tab === 'services' && (
                <div className='flex flex-col space-y-6'>
                    <div className='flex flex-row gap-x-4 overflow-x-auto'>
                        {categories.map((item) => (
                            <button onClick={() => setSelectedCategory(item.id)} key={item.id} className={`px-2 py-1 md:px-3 md:py-1.5 cursor-pointer rounded-full text-sm ${selectedCategory === item.id ? '' : 'border border-gray-200'}`} style={{ backgroundColor: selectedCategory === item.id ? mainColor : '#f2f2f2', color: selectedCategory === item.id ? 'white' : 'gray' }}>
                                {locale === 'ar' ? item.titleAr : item.titleEn}
                            </button>
                        ))}
                    </div>
                    {layout === 'grid' ? (
                        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                            {services.map((item) => (
                                <div key={item.id}>
                                    {item.services.map((item) => (
                                        <Link key={item.id} href={`http://${store.webIdentifier}.localhost:3000/${locale}/service/${item.id}`} className='flex flex-col space-y-2 overflow-hidden rounded-md'>
                                            <Image
                                                src={item.images[0]}
                                                alt={`${item.titleEn} - Image`}
                                                width={500}
                                                height={500}
                                                className='w-full h-48 object-cover object-center'
                                            />
                                            <span className='space-y-1 px-4'>
                                                <h1 className='text-lg md:text-xl font-semibold'>{locale === 'ar' ? item.titleAr : item.titleEn}</h1>
                                                <p className='text-sm text-secondary-text line-clamp-2'>{locale === 'ar' ? item.descriptionAr : item.descriptionEn}</p>
                                            </span>
                                            <div className='flex flex-row items-start justify-start gap-x-3 w-full px-4'>
                                                <span className='flex flex-col justify-start items-start space-y-1'>
                                                    <p className='text-sm font-light text-secondary-text'>{locale === 'ar' ? 'السعر' : 'Price'}</p>
                                                    <span className='flex flex-row items-center gap-x-1'>
                                                        <p className={`text-sm ${item.discountPrice ? 'line-through font-light text-secondary-text' : 'font-semibold text-black'}`}>{`${item.originalPrice} ${locale === 'ar' ? 'ر.س' : 'SAR'}`}</p>
                                                        {item.discountPrice && (
                                                            <span className='flex flex-row items-center gap-x-1'>
                                                                <p className='text-sm font-semibold'>{`${item.discountPrice} ${locale === 'ar' ? 'ر.س' : 'SAR'}`}</p>
                                                                <label className='text-sm text-red-500 px-1 rounded-md bg-red-100'>{`${(Number(item.discountPrice) / Number(item.originalPrice)) - 1}%`}</label>
                                                            </span>
                                                        )}
                                                    </span>
                                                </span>
                                                <span className='flex flex-col justify-start items-start space-y-1'>
                                                    <p className='text-sm font-light text-secondary-text'>{locale === 'ar' ? 'المدة' : 'Duration'}</p>
                                                    <p className='text-sm font-semibold'>{item.duration} {locale === 'ar' ? 'د' : 'min'}</p>
                                                </span>
                                            </div>
                                            <div className='pb-2 px-2'>
                                                <button className='text-white py-2 rounded-md w-full' style={{ backgroundColor: mainColor }}>
                                                    {locale === 'ar' ? 'حجز الآن' : 'Book now'}
                                                </button>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className='flex flex-col space-y-3'>
                            {services.map((item) => (
                                <div key={item.id}>
                                    {item.services.map((item) => (
                                        <Link key={item.id} href={`http://${store.webIdentifier}.localhost:3000/${locale}/service/${item.id}`} className='flex flex-row gap-x-3 p-3 rounded-md bg-gray-50'>
                                            <Image
                                                src={item.images[0]}
                                                alt={`${item.titleEn} - Image`}
                                                width={500}
                                                height={500}
                                                className='w-30 h-32 md:w-32 md:h-32 object-cover object-center rounded-md'
                                            />
                                            <div className='flex flex-col flex-1 justify-between min-w-0'>
                                                <span className='space-y-1'>
                                                    <h1 className='text-base md:text-lg lg:text-xl font-semibold'>{locale === 'ar' ? item.titleAr : item.titleEn}</h1>
                                                    <p className='text-xs md:text-sm text-secondary-text line-clamp-2'>{locale === 'ar' ? item.descriptionAr : item.descriptionEn}</p>
                                                </span>
                                                <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between w-full gap-2 mt-2'>
                                                    <div className='flex flex-row items-start gap-x-3 md:gap-x-4'>
                                                        <span className='flex flex-col justify-start items-start space-y-1'>
                                                            <p className='text-xs md:text-sm font-light text-secondary-text'>{locale === 'ar' ? 'السعر' : 'Price'}</p>
                                                            <span className='flex flex-row items-center gap-x-1'>
                                                                <p className={`text-xs md:text-sm ${item.discountPrice ? 'line-through font-light text-secondary-text' : 'font-semibold text-black'}`}>{`${item.originalPrice} ${locale === 'ar' ? 'ر.س' : 'SAR'}`}</p>
                                                                {item.discountPrice && (
                                                                    <span className='flex flex-row items-center gap-x-1'>
                                                                        <p className='text-xs md:text-sm font-semibold'>{`${item.discountPrice} ${locale === 'ar' ? 'ر.س' : 'SAR'}`}</p>
                                                                        <label className='text-xs md:text-sm text-red-500 px-1 rounded-md bg-red-100'>{`${(Number(item.discountPrice) / Number(item.originalPrice)) - 1}%`}</label>
                                                                    </span>
                                                                )}
                                                            </span>
                                                        </span>
                                                        <span className='flex flex-col justify-start items-start space-y-1'>
                                                            <p className='text-xs md:text-sm font-light text-secondary-text'>{locale === 'ar' ? 'المدة' : 'Duration'}</p>
                                                            <p className='text-xs md:text-sm font-semibold'>{item.duration} {locale === 'ar' ? 'د' : 'min'}</p>
                                                        </span>
                                                    </div>
                                                    <button className='text-white py-1.5 md:py-2 px-3 md:px-4 rounded-md text-sm md:text-base whitespace-nowrap' style={{ backgroundColor: mainColor }}>
                                                        {locale === 'ar' ? 'حجز الآن' : 'Book now'}
                                                    </button>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
            {tab === 'locations' && (
                <div className='flex flex-col w-full space-y-2 bg-gray-50 py-3 px-4 rounded-md'>
                    {location.map((item) => (
                        <div key={item.id} className={`flex flex-row items-start gap-x-3 ${location.length < 2 ? '' : 'border-b border-secondary-text/20'}`}>
                            <MapPin className='size-4' />
                            <span className='flex flex-col items-start justify-start space-y-1 text-sm'>
                                <p className='font-semibold'>{locale === 'ar' ? item.cityAr : item.cityEn}</p>
                                <p className='text-secondary-text'>{locale === 'ar' ? item.addressAr : item.addressEn}</p>
                                <p className='text-secondary-text'>{locale === 'ar' ? item.destictAr : item.destictEn}, {item.postalCode}</p>
                            </span>
                        </div>
                    ))}
                </div>
            )}
            {tab === 'reviews' && (
                <div className="flex flex-col w-full space-y-2 bg-gray-50 py-3 px-4 rounded-md">
                    {reviews.map((item, index) => (
                        <div
                            key={item.id}
                            className={`flex flex-col space-y-2 py-4 ${location.length < 2 && index !== location.length ? "border-b border-secondary-text/15" : ""}`}
                        >
                            <div className="flex flex-row items-center justify-between w-full">
                                <div className="flex flex-row items-center gap-x-1">
                                    {[...Array(5)].map((_, index) => (
                                        <StarFill
                                            key={index}
                                            className="size-3"
                                            style={{ color: index < Number(item.rate) ? mainColor : "#A4A4A4" }}
                                        />
                                    ))}
                                </div>
                                <span className="flex flex-row items-center gap-x-1 text-xs text-secondary-text">
                                    <Calendar className="size-3" />
                                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                                </span>
                            </div>
                            <span className='flex flex-col space-y-1 text-sm'>
                                <p className='font-semibold'>{item.title}</p>
                                <p className='text-secondary-text'>{item.description}</p>
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}