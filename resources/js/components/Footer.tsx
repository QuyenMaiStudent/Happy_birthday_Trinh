import React from 'react';

export default function Footer() {
    return (
        <footer className="w-full max-w-6xl mx-auto mt-20 py-8 px-4 text-center">
            <div className="flex flex-col items-center gap-4">
                <p className="text-lg font-medium">
                    Made with <span className="text-red-500 animate-pulse">❤️</span> for Tuyết Trinh
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Dù ở xa cách xa ngàn dặm, tình bạn vẫn luôn gần bên 🌟
                </p>
                <div className="flex gap-2 text-2xl">
                    <span className="animate-bounce">🎈</span>
                    <span className="animate-bounce delay-100">🎂</span>
                    <span className="animate-bounce delay-200">🎁</span>
                    <span className="animate-bounce delay-300">🎉</span>
                </div>
            </div>
        </footer>
    );
}