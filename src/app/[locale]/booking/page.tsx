import React from 'react';
import BookingForm from '@/components/booking/BookingForm';
import { useTranslations } from 'next-intl';

export default function BookingPage() {
    const t = useTranslations('BookingPage');

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4 font-serif text-[#6D5B4B]">{t('title')}</h1>
                    <p className="text-gray-600 text-lg">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <BookingForm />
                </div>
            </div>
        </div>
    );
}
