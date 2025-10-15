import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ResponsiveLayout from '@/app/components/layout/Responsive';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Nexus - Transform Your Digital Experience',
    description: 'The all-in-one platform that helps teams collaborate, create, and scale with ease.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning className={inter.className}>
                <ResponsiveLayout>
                    {children}
                </ResponsiveLayout>
            </body>
        </html>
    );
}