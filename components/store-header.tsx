"use client";

import { Store } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react'

type Props = {
    locale: string;
    storeLogo: string | null;
    storeNameAr: string;
    storeDescriptionAr: string;
    storeNameEn: string;
    storeDescriptionEn: string;
    totalReviews: string;
    totalRating: string;
}

export default function StoreHeader({
    locale,
    storeLogo,
    storeNameAr,
    storeDescriptionAr,
    storeNameEn,
    storeDescriptionEn,
    totalRating,
    totalReviews
}: Props) {
    return (
        <div className='flex flex-col items-center justify-center space-y-8 w-full'>
            <div className='flex flex-col items-center justify-center space-y-4'>
                {storeLogo ? (
                    <div className='relative'>
                        <Image
                            src={storeLogo}
                            alt={`${locale === 'ar' ? storeNameAr : storeNameEn} - ${locale === 'ar' ? 'شعار' : 'Logo'}`}
                            width={500}
                            height={500}
                            className='w-24 h-24 md:w-40 md:h-40 rounded-full object-contain p-0.5 border-3 md:border-4 border-secondary-text/30'
                        />
                        <div className='absolute left-0 right-0 bottom-0 z-10 w-full justify-center items-center flex'>
                            <label className='px-2 py-1 rounded-full bg-black text-white text-xs md:text-base font-semibold'>
                                {`${totalRating} (${totalReviews})`}
                            </label>
                        </div>
                    </div>
                ) : (
                    <div className='relative'>
                        <div className='w-24 h-24 md:w-40 md:h-40 rounded-full bg-gray-200 justify-center items-center flex'>
                            <Store className='size-16 text-gray-500' />
                        </div>
                        <div className='absolute left-0 right-0 bottom-0 z-10 w-full justify-center items-center flex'>
                            <label className='px-2 py-1 rounded-full bg-black text-white text-xs md:text-base font-semibold'>
                                {`${totalRating} (${totalReviews})`}
                            </label>
                        </div>
                    </div>
                )}
                <h1 className='text-2xl md:text-3xl font-semibold'>
                    {locale === 'ar' ? storeNameAr : storeNameEn}
                </h1>
            </div>
            <div className='flex bg-gray-100 rounded-md p-4 text-secondary-text text-xs md:text-sm text-center w-full md:max-w-3xl md:mx-auto'>
                {locale === 'ar' ? storeDescriptionAr : storeDescriptionEn}
            </div>
        </div>
    )
}