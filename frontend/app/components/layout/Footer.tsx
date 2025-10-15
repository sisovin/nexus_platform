import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4 hover:opacity-80 transition-opacity">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">N</span>
                            </div>
                            <span className="text-xl font-bold">Nexus</span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            The all-in-one platform that helps teams collaborate, create, and scale with ease.
                        </p>
                        <div className="flex space-x-4">
                            <Button variant="ghost" size="sm" asChild>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Facebook className="w-6 h-6" />
                                    <span className="sr-only">Facebook</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Twitter className="w-6 h-6" />
                                    <span className="sr-only">Twitter</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Instagram className="w-6 h-6" />
                                    <span className="sr-only">Instagram</span>
                                </a>
                            </Button>
                            <Button variant="ghost" size="sm" asChild>
                                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                    <Linkedin className="w-6 h-6" />
                                    <span className="sr-only">LinkedIn</span>
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Product</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="/languages" className="hover:text-white transition-colors">
                                    Languages
                                </Link>
                            </li>
                            <li>
                                <Link href="/testimonials" className="hover:text-white transition-colors">
                                    Testimonials
                                </Link>
                            </li>
                            <li>
                                <Link href="/bookmarks" className="hover:text-white transition-colors">
                                    Bookmarks
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Updates
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white transition-colors">
                                    Status
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <Separator className="bg-gray-800 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-4 md:mb-0">
                        <div className="flex items-center text-gray-400">
                            <Mail className="w-4 h-4 mr-2" />
                            <span>hello@nexus.com</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                            <Phone className="w-4 h-4 mr-2" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center text-gray-400">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>San Francisco, CA</span>
                        </div>
                    </div>

                    <div className="text-gray-400 text-sm">
                        © 2025 Nexus. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;