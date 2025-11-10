import React, { useEffect, useState } from 'react';

export default function MusicToggle() {
    const [on, setOn] = useState<boolean>(() => {
        try {
            return localStorage.getItem('hb_music') === '1';
        } catch {
            return false;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('hb_music', on ? '1' : '0');
        } catch {}
        window.dispatchEvent(new CustomEvent('hb:music-toggle', { detail: { on } }));
    }, [on]);

    return (
        <button
            onClick={() => setOn(s => !s)}
            className={`px-4 py-2 rounded-full transition-all ${
                on 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-600'
            }`}
            aria-pressed={on}
            title="Bật/Tắt nhạc nền"
        >
            {on ? '🎵 Đang phát' : '🔇 Nhạc'}
        </button>
    );
}