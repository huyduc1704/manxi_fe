'use client';

import React from 'react';
import { Carousel } from 'antd';
import Image from 'next/image';

const BANNERS = [
    '/ManxiImage/banner1.webp',
    '/ManxiImage/banner2.webp',
    '/ManxiImage/banner3.webp',
    '/ManxiImage/banner4.webp',
];

const BannerSection = () => {
    return (
        <section style={{
            padding: 0, // No padding for full bleed
            width: '100%',
        }}>
            <Carousel
                autoplay
                autoplaySpeed={3000}
                effect="fade"
                dots={true} // Enable dots
                infinite
            >
                {BANNERS.map((src, index) => (
                    <div key={index}>
                        <div className="relative w-full h-[50vh] md:h-[850px]">
                            <Image
                                src={src}
                                fill
                                className="object-cover md:object-fill"
                                alt={`Banner ${index + 1}`}
                            />
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default BannerSection;
