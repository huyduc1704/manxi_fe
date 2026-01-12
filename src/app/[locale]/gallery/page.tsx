'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;
import Image from 'next/image';

const galleryImages = [
    'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1584813470613-5b1c11359832?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=600&auto=format&fit=crop',
    '/ManxiImage/taiwan.jpg',
    '/ManxiImage/banner2.webp',
    'https://images.unsplash.com/photo-1519823551278-64ac927accc9?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=600&auto=format&fit=crop',
];

export default function GalleryPage() {
    const t = useTranslations('Header');

    return (
        <div className="min-h-screen pt-32 pb-20 px-4 md:px-10 max-w-[1440px] mx-auto">
            <div className="text-center mb-12">
                <Title level={1} className="!font-serif !text-4xl md:!text-5xl !text-[#4A4238] !mb-4">
                    {t('gallery')}
                </Title>
                <Paragraph className="text-[#8C857B] text-base md:text-lg max-w-2xl mx-auto">
                    Những khoảnh khắc thư giãn và không gian yên bình tại Manxi Spa.
                </Paragraph>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {galleryImages.map((src, index) => (
                    <div key={index} className="relative aspect-square overflow-hidden rounded-lg hover:shadow-lg transition-all duration-300 group">
                        <Image
                            src={src}
                            alt={`Gallery Image ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
