'use client';

import React from 'react';
import HeroSection from '@/components/sections/HeroSection';
import StorySection from '@/components/sections/StorySection';
import ServiceSection from '@/components/sections/ServiceSection';
import BannerSection from '@/components/sections/BannerSection';
import Testimonials from '@/components/sections/Testimonials';
import ConnectSection from '@/components/sections/ConnectSection';

export default function Home() {
    return (
        <main>
            <HeroSection />
            <ServiceSection />
            <BannerSection />
            <StorySection />
            <Testimonials />
            <ConnectSection />
            {/* Additional sections will go here */}
        </main>
    );
}
