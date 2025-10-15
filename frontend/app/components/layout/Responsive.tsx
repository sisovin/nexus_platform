'use client'

import React from 'react'
import { useIsMobile } from '@/hooks/use-mobile'
import Header from './Header'
import Footer from './Footer'
import { cn } from '@/app/lib/utils'

interface ResponsiveLayoutProps {
    children: React.ReactNode
    className?: string
    showHeader?: boolean
    showFooter?: boolean
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl' | 'full'
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({
    children,
    className,
    showHeader = true,
    showFooter = true,
    maxWidth = '7xl'
}) => {
    const isMobile = useIsMobile()

    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        '7xl': 'max-w-7xl',
        full: 'max-w-full'
    }

    return (
        <div className="w-full min-h-screen bg-background">
            {/* Header */}
            {showHeader && <Header />}

            {/* Main Content */}
            <main className={cn(
                "flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8",
                maxWidthClasses[maxWidth],
                className
            )}>
                <div className={cn(
                    "py-6 sm:py-8 lg:py-12",
                    // Add responsive spacing based on mobile detection
                    isMobile ? "space-y-4" : "space-y-6"
                )}>
                    {children}
                </div>
            </main>

            {/* Footer */}
            {showFooter && <Footer />}

            {/* Mobile-specific optimizations */}
            {isMobile && (
                <style jsx global>{`
                    /* Improve touch targets on mobile */
                    button, a, input, select, textarea {
                        min-height: 44px;
                    }

                    /* Better text sizing on mobile */
                    body {
                        font-size: 16px;
                        line-height: 1.5;
                    }

                    /* Prevent zoom on input focus */
                    input[type="text"],
                    input[type="email"],
                    input[type="password"],
                    textarea,
                    select {
                        font-size: 16px;
                    }
                `}</style>
            )}
        </div>
    )
}

export default ResponsiveLayout