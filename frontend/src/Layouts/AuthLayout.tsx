import React from 'react';
import { Telescope } from 'lucide-react';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
    return (
        <div className="h-screen flex w-full overflow-hidden">
            {/* Left Side - Branding */}
            <div className="hidden lg:flex lg:w-1/3 bg-blue-600 flex-col justify-between p-12 text-white relative overflow-hidden h-full">
                {/* Logo */}
                <div className="flex items-center gap-2 z-10">
                    <Telescope className="w-8 h-8" />
                    <span className="text-xl font-semibold">AIsee</span>
                </div>

                {/* Content */}
                <div className="z-10 max-w-lg">
                    <h1 className="text-4xl font-bold mb-6">
                        Start monitoring your brand today
                    </h1>
                    <p className="text-blue-100 text-lg mb-12">
                        Join hundreds of brands using AI-powered OSINT intelligence to protect and grow their digital presence.
                    </p>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Real-time Monitoring</h3>
                                <p className="text-blue-100 text-sm">Track mentions across social media, news, and forums</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Advanced Analytics</h3>
                                <p className="text-blue-100 text-sm">AI powered sentiment analysis and insights</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-12 h-12 bg-blue-500/30 rounded-lg flex items-center justify-center shrink-0">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Instant Alerts</h3>
                                <p className="text-blue-100 text-sm">Get notified of critical mentions immediately</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 opacity-50 pointer-events-none" />
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-2/3 h-full overflow-y-auto bg-gray-50">
                <div className="min-h-full flex items-center justify-center p-8">
                    <div className="w-full max-w-[38rem] bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};
