import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import AppLayout from '@/components/layout/AppLayout';
import { Playfair_Display } from 'next/font/google';
import '../globals.css';
import { Metadata } from 'next';

const playfair = Playfair_Display({
    subsets: ['latin', 'vietnamese'],
    display: 'swap',
    variable: '--font-serif',
});

export const metadata: Metadata = {
    title: {
        template: '%s | Manxi Spa',
        default: 'Manxi Spa - Gội Đầu Dưỡng Sinh Chuẩn Đài Loan',
    },
    description: 'Góc nhỏ chữa lành tại Hóc Môn. Trải nghiệm quy trình gội đầu và massage chuẩn Đài Loan.',
    icons: {
        icon: '/icon.png',
    },
};


export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    // Ensure that the incoming `locale` is valid
    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${playfair.variable} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <AppLayout>
                        {children}
                    </AppLayout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
