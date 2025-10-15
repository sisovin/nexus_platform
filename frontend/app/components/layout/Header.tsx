import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X, User, LogIn, UserPlus } from 'lucide-react'

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    const navigation = [
        { name: 'Home', href: '/' },
        { name: 'Languages', href: '/languages' },
        { name: 'Bookmarks', href: '/bookmarks' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Features', href: '/features' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Desktop Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">N</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 hidden sm:block">
                                Nexus Platform
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Authentication */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/signin" className="flex items-center gap-2">
                                <LogIn className="h-4 w-4" />
                                Sign In
                            </Link>
                        </Button>
                        <Button size="sm" asChild>
                            <Link href="/signup" className="flex items-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                Sign Up
                            </Link>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <Menu className="h-6 w-6" />
                                    <span className="sr-only">Open menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-80">
                                <div className="flex flex-col h-full">
                                    {/* Mobile Logo */}
                                    <div className="flex items-center justify-between pb-6 border-b">
                                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                                <span className="text-white font-bold text-sm">N</span>
                                            </div>
                                            <span className="text-lg font-bold text-gray-900">
                                                Nexus Platform
                                            </span>
                                        </Link>
                                    </div>

                                    {/* Mobile Navigation Links */}
                                    <nav className="flex-1 py-6">
                                        <div className="space-y-2">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    href={item.href}
                                                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </nav>

                                    {/* Mobile Authentication */}
                                    <div className="border-t pt-6 space-y-3">
                                        <Button variant="outline" className="w-full justify-start" asChild>
                                            <Link href="/signin" onClick={() => setIsOpen(false)}>
                                                <LogIn className="h-4 w-4 mr-2" />
                                                Sign In
                                            </Link>
                                        </Button>
                                        <Button className="w-full justify-start" asChild>
                                            <Link href="/signup" onClick={() => setIsOpen(false)}>
                                                <UserPlus className="h-4 w-4 mr-2" />
                                                Sign Up
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
