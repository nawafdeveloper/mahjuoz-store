import { BookingPage, BookingStatusPage, ServicePage, StorePage } from "@/types/read.type";

export async function fetchStorePage(webId: string) {
    try {
        const res = await fetch(
            `https://customer.mahjuoz.com/v1/read/get-store-page/${webId}`,
            { method: "GET" }
        );

        if (!res.ok) {
            return { success: false, data: null };
        }

        const data: StorePage = await res.json();

        return { success: true, data };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}

export async function fetchServicePage(serviceId: string) {
    try {
        const res = await fetch(
            `https://customer.mahjuoz.com/v1/read/get-service-page/${serviceId}`,
            { method: "GET" }
        );

        if (!res.ok) {
            return { success: false, data: null };
        }

        const data: ServicePage = await res.json();

        return { success: true, data };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}

export async function fetchStartBookingPage(serviceId: string) {
    try {
        const res = await fetch(
            `https://customer.mahjuoz.com/v1/read/start-booking-page/${serviceId}`,
            { method: "GET" }
        );

        if (!res.ok) {
            return { success: false, data: null };
        }

        const data: BookingPage = await res.json();

        return { success: true, data };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}

export async function fetchBookingDetailsPage(bookingId: string) {
    try {
        const res = await fetch(
            `https://customer.mahjuoz.com/v1/read/booking-details/${bookingId}`,
            { method: "GET" }
        );

        if (!res.ok) {
            return { success: false, data: null };
        }

        const data: BookingStatusPage = await res.json();

        return { success: true, data };
    } catch (err) {
        return { success: false, error: (err as Error).message };
    }
}
