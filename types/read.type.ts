export type Store = {
    id: string;
    userId: string;
    webIdentifier: string;
    maintenanceMode: boolean;
    storeNameAr: string;
    storeNameEn: string;
    subscriptionEndAt: Date | null;
    logo: string | null;
    favicon: string | null;
    descriptionAr: string;
    descriptionEn: string;
    storeCategory: string;
    phoneContact: string | null;
    whatsappContact: string | null;
    emailContact: string | null;
    socialInstagram: string | null;
    socialTwitter: string | null;
    socialTiktok: string | null;
    showStoreRating: boolean;
    allowCancelBooking: boolean;
    allowModifyBooking: boolean;
    bookingNotification: string;
    forceCustomerGender: boolean;
    forceCustomerBirthday: boolean;
    forceCustomerCity: boolean;
    storeThemeColor: string;
    hideMahjuozCopyright: boolean;
    customCopyrightAr: string | null;
    customCopyrightEn: string | null;
    serviceLayout: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Category = {
    services: {
        id: string;
        storeId: string;
        categoryId: string;
        titleAr: string;
        titleEn: string;
        descriptionAr: string | null;
        descriptionEn: string | null;
        images: string[];
        originalPrice: string;
        discountPrice: string | null;
        duration: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
    id: string;
    storeId: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string | null;
    descriptionEn: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Location = {
    id: string;
    storeId: string;
    addressAr: string;
    cityAr: string;
    destictAr: string;
    addressEn: string;
    cityEn: string;
    destictEn: string;
    postalCode: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type Review = {
    id: string;
    storeId: string;
    bookingId: string;
    title: string;
    description: string;
    rate: string;
    createdAt: Date;
    updatedAt: Date;
};

type Service = {
    id: string;
    storeId: string;
    categoryId: string;
    titleAr: string;
    titleEn: string;
    descriptionAr: string | null;
    descriptionEn: string | null;
    images: string[];
    originalPrice: string;
    discountPrice: string | null;
    duration: string;
    createdAt: Date;
    updatedAt: Date;
};

type ServiceRow = {
    id: string;
    storeId: string;
    categoryId: string;
    titleAr: string;
    titleEn: string;
    descriptionAr?: string | null;
    descriptionEn?: string | null;
    images: string[];
    originalPrice: string;
    discountPrice?: string | null;
    duration: string;
};

type LocationRow = {
    id: string;
    storeId: string;
    addressAr: string;
    cityAr: string;
    destictAr: string;
    addressEn: string;
    cityEn: string;
    destictEn: string;
};

type Calendar = {
    date: string;
    slots: string[];
};

type Booking = {
    id: string;
    bookingNumber: string;
    storeId: string;
    categoryId: string;
    serviceId: string;
    locationId: string;
    bookingStatus: string;
    bookingDate: string;
    startTime: string;
    endTime: string;
    customerEmail: string;
    customerName: string;
    customerPhone: string;
    customerCity: string | null;
    customerBirthday: string | null;
    customerGender: string | null;
    createdAt: Date;
    updatedAt: Date;
};

export type StorePage = {
    data: {
        store: Store,
        categories: Category[],
        locations: Location[],
        reviews: Review[],
    };
};

export type ServicePage = {
    data: {
        service: Service
    };
};

export type BookingPage = {
    data: {
        service: ServiceRow,
        locations: LocationRow[],
        calendar: Calendar[]
    };
};

export type BookingStatusPage = {
    data: {
        booking: Booking
    };
};