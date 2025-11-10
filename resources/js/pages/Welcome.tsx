import React from 'react';
import { Head } from '@inertiajs/react';
import MemoryTimeline from '@/components/MemoryTimeline';
import Header from '@/components/Header';
import GreetingCard from '@/components/GreetingCard';
import WishesSection from '@/components/WishesSection';
import Footer from '@/components/Footer';

type Props = {
    recipient: string;
    memories: any[];
    wishes: any[];
    specialMessage: string;
};

export default function Welcome({ recipient, memories, wishes, specialMessage }: Props) {
    return (
        <>
            <Head title="Happy Birthday Tuyết Trinh">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700,800" rel="stylesheet" />
            </Head>

            <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 text-gray-900 dark:text-gray-100">
                {/* Animated Background Layers */}
                <div className="fixed inset-0 z-0">
                    {/* Gradient Orbs */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
                    <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
                    
                    {/* Floating Hearts */}
                    {[...Array(15)].map((_, i) => (
                        <div
                            key={`heart-${i}`}
                            className="absolute text-pink-400 dark:text-pink-600 opacity-20 animate-float-up"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${20 + Math.random() * 30}px`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${10 + Math.random() * 10}s`,
                            }}
                        >
                            💖
                        </div>
                    ))}
                    
                    {/* Floating Stars */}
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={`star-${i}`}
                            className="absolute text-yellow-300 dark:text-yellow-500 opacity-30 animate-twinkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${15 + Math.random() * 20}px`,
                                animationDelay: `${Math.random() * 3}s`,
                            }}
                        >
                            ⭐
                        </div>
                    ))}
                    
                    {/* Floating Balloons */}
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={`balloon-${i}`}
                            className="absolute animate-float-up"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                fontSize: `${25 + Math.random() * 25}px`,
                                opacity: 0.3,
                                animationDelay: `${Math.random() * 7}s`,
                                animationDuration: `${15 + Math.random() * 10}s`,
                            }}
                        >
                            🎈
                        </div>
                    ))}
                </div>

                <div className="relative z-10">
                    <Header />

                    <main className="pb-12">
                        <GreetingCard recipient={recipient} specialMessage={specialMessage} />
                        <MemoryTimeline memories={memories} />
                        <WishesSection wishes={wishes} />
                    </main>

                    <Footer />
                </div>
            </div>
        </>
    );
}