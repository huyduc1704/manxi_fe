import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import AppLayout from '@/components/layout/AppLayout';
import { Playfair_Display } from 'next/font/google';
import '../globals.css';

const playfair = Playfair_Display({
    subsets: ['latin', 'vietnamese'],
    display: 'swap',
    variable: '--font-serif',
});

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

    // Providing all messages to the client
    // side is the easiest way to get started
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
