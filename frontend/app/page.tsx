'use client';

import { Hero } from '@/app/components/sections/Hero';
import { Stats } from '@/app/components/sections/Stats';
import { Features } from '@/app/components/sections/Features';
import { Testimonials } from '@/app/components/sections/Testimonials';
import { CTA } from '@/app/components/sections/CTA';

export default function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Hero />
            <Stats />
            <Features />
            <Testimonials />
            <CTA />
        </div>
    );
}