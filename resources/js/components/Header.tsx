import React from 'react';
import MusicToggle from './MusicToggle';

export default function Header() {
    return (
        <header className="w-full max-w-6xl mx-auto py-6 flex items-center justify-between px-4">
            <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                    HB
                </div>
                <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                        Happy Birthday
                    </h1>
                    <p className="text-xs text-gray-500">Dành tặng Tuyết Trinh</p>
                </div>
            </div>
            <nav className="flex items-center gap-6">
                <a href="#card" className="text-sm text-gray-600 hover:text-pink-500 transition">Thiệp</a>
                <a href="#memories" className="text-sm text-gray-600 hover:text-pink-500 transition">Kỷ niệm</a>
                <a href="#wishes" className="text-sm text-gray-600 hover:text-pink-500 transition">Lời chúc</a>
                <MusicToggle />
            </nav>
        </header>
    );
}