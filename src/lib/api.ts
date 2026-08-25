export interface Service {
    _id: string;
    name: string;
    description: string;
    shortDescription?: string;
    price: number;
    duration: number; // in minutes
    images?: string[];
    category?: any;
    categorySlug?: string;
    slug?: string;
}

export interface ServiceCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export async function getServices(): Promise<Service[]> {
    try {
        const res = await fetch(`${API_URL}/services`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            console.error('Failed to fetch services:', res.statusText);
            return [];
        }

        const data = await res.json();
        return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
        console.error('Error fetching services:', error);
        return [];
    }
}

export async function getServiceCategories(): Promise<ServiceCategory[]> {
    try {
        const res = await fetch(`${API_URL}/service-categories`, {
            cache: 'no-store',
        });

        if (!res.ok) {
            console.error('Failed to fetch categories:', res.statusText);
            return [];
        }

        const data = await res.json();
        return Array.isArray(data) ? data : (data.data || []);
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

export interface CreateBookingDto {
    bookingType: 'GUEST' | 'MEMBER';
    guestInfo?: {
        fullName: string;
        phone: string;
        email?: string;
    };
    serviceIds: string[];
    bookingDate: string; // ISO Date String
    bookingTime: string; // HH:mm
    customerNote?: string;
    paymentMethod?: string;
}

export async function createBooking(data: CreateBookingDto): Promise<any> {
    try {
        const res = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create booking');
        }

        return await res.json();
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
}
