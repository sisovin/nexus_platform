import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Nexus Platform',
    description: 'Top programming languages showcase',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}
