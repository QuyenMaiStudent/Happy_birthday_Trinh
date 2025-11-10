import React, { useState, useEffect, useRef } from 'react';
import Confetti from './Confetti';
import Envelope from './Envelope';

type Props = {
    recipient?: string;
    specialMessage?: string;
};

export default function GreetingCard({ recipient = 'Bạn', specialMessage }: Props) {
    const [opened, setOpened] = useState(false);
    const confettiRef = useRef<any>(null);

    useEffect(() => {
        function onMusicToggle(e: any) {
            const on = !!e?.detail?.on;
            if (on) {
                playBirthdaySong();
            } else {
                stopMusic();
            }
        }
        
        try {
            if (localStorage.getItem('hb_music') === '1') {
                playBirthdaySong();
            }
        } catch {}
        
        window.addEventListener('hb:music-toggle', onMusicToggle as EventListener);
        return () => {
            window.removeEventListener('hb:music-toggle', onMusicToggle as EventListener);
            stopMusic();
        };
    }, []);

    function playBirthdaySong() {
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            
            // Happy Birthday melody - Full song
            const notes = [
                // "Happy birthday to you"
                { freq: 264, duration: 0.5 },  // C - Hap
                { freq: 264, duration: 0.25 }, // C - py
                { freq: 297, duration: 0.75 }, // D - birth
                { freq: 264, duration: 0.75 }, // C - day
                { freq: 352, duration: 0.75 }, // F - to
                { freq: 330, duration: 1.5 },  // E - you
                
                // "Happy birthday to you"
                { freq: 264, duration: 0.5 },  // C
                { freq: 264, duration: 0.25 }, // C
                { freq: 297, duration: 0.75 }, // D
                { freq: 264, duration: 0.75 }, // C
                { freq: 396, duration: 0.75 }, // G
                { freq: 352, duration: 1.5 },  // F
                
                // "Happy birthday dear [name]"
                { freq: 264, duration: 0.5 },  // C
                { freq: 264, duration: 0.25 }, // C
                { freq: 528, duration: 0.75 }, // C (high)
                { freq: 440, duration: 0.75 }, // A
                { freq: 352, duration: 0.75 }, // F
                { freq: 330, duration: 0.75 }, // E
                { freq: 297, duration: 0.75 }, // D
                
                // "Happy birthday to you"
                { freq: 466, duration: 0.5 },  // Bb
                { freq: 466, duration: 0.25 }, // Bb
                { freq: 440, duration: 0.75 }, // A
                { freq: 352, duration: 0.75 }, // F
                { freq: 396, duration: 0.75 }, // G
                { freq: 352, duration: 1.5 },  // F
            ];

            let time = ctx.currentTime;
            notes.forEach((note) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                
                osc.type = 'sine';
                osc.frequency.value = note.freq;
                
                gain.gain.setValueAtTime(0.15, time);
                gain.gain.exponentialRampToValueAtTime(0.01, time + note.duration);
                
                osc.connect(gain);
                gain.connect(ctx.destination);
                
                osc.start(time);
                osc.stop(time + note.duration);
                
                time += note.duration;
            });

            // Loop the song
            setTimeout(() => {
                try {
                    if (localStorage.getItem('hb_music') === '1') {
                        playBirthdaySong();
                    }
                } catch {}
            }, time * 1000);
            
        } catch (e) {
            console.error('Audio error:', e);
        }
    }

    function stopMusic() {
        // Stop is handled by checking localStorage in the loop
    }

    function handleOpen() {
        setOpened(true);
        
        // Play celebration sound
        try {
            const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
            const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
            let t = ctx.currentTime;
            melody.forEach((f, i) => {
                const o = ctx.createOscillator();
                const g = ctx.createGain();
                o.type = 'sine';
                o.frequency.value = f;
                g.gain.value = 0.15 * Math.pow(0.85, i);
                o.connect(g);
                g.connect(ctx.destination);
                o.start(t + i * 0.12);
                o.stop(t + i * 0.12 + 0.25);
            });
        } catch {}

        // Multiple confetti bursts
        try {
            confettiRef.current?.fireworks?.();
            setTimeout(() => confettiRef.current?.burst?.(), 800);
            setTimeout(() => confettiRef.current?.fireworks?.(), 2000);
        } catch {}

        try {
            document.body.style.overflow = 'hidden';
        } catch {}
    }

    useEffect(() => {
        if (!opened) {
            try {
                document.body.style.overflow = '';
            } catch {}
        }
    }, [opened]);

    return (
        <section id="card" className="w-full max-w-6xl mx-auto mt-12 relative px-4">
            <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 dark:bg-gradient-to-br dark:from-[#161615] dark:via-[#1a1419] dark:to-[#1a1419] rounded-2xl shadow-2xl p-12 relative overflow-hidden" style={{ minHeight: 400 }}>
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff69b4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '60px 60px',
                    }}/>
                </div>

                <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 text-6xl animate-float">🎈</div>
                    <div className="absolute top-20 right-20 text-5xl animate-float-delay">🎁</div>
                    <div className="absolute bottom-10 left-20 text-5xl animate-float-delay-2">🌟</div>
                    <div className="absolute bottom-20 right-10 text-6xl animate-float">🎂</div>
                </div>

                <Envelope onOpen={handleOpen} recipientName={recipient} />
            </div>

            {opened && (
                <>
                    <Confetti ref={confettiRef} />
                    
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 animate-gradient-shift" />
                        
                        {/* Floating particles background */}
                        <div className="absolute inset-0">
                            {[...Array(30)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute animate-float-particle"
                                    style={{
                                        left: `${Math.random() * 100}%`,
                                        top: `${Math.random() * 100}%`,
                                        animationDelay: `${Math.random() * 3}s`,
                                        fontSize: `${20 + Math.random() * 30}px`,
                                    }}
                                >
                                    {['✨', '💖', '🎈', '🎊', '⭐', '💝'][i % 6]}
                                </div>
                            ))}
                        </div>

                        <div className="relative z-60 max-w-3xl w-full my-8">
                            <div className="bg-white/95 dark:bg-gradient-to-br dark:from-[#1a1419]/95 dark:to-[#0b0b10]/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 transform animate-openCard border-4 border-pink-200 dark:border-pink-800">
                                
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-3xl opacity-40 animate-pulse" />
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />

                                <div className="relative">
                                    <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-4 leading-tight">
                                        <span className="inline-block animate-bounce-slow bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent" style={{ backgroundSize: '200% auto', animation: 'gradient-shift 3s linear infinite' }}>
                                            {recipient}
                                        </span>
                                        <span className="inline-block ml-2 text-4xl md:text-5xl animate-spin-slow">🎉</span>
                                    </h2>

                                    <div className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-pink-900/30 dark:via-purple-900/30 dark:to-blue-900/30 rounded-2xl p-6 shadow-inner mb-6 border-2 border-pink-300 dark:border-pink-700">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-3 text-center">
                                            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-text">
                                                🎂 Chúc mừng sinh nhật! 🎂
                                            </span>
                                        </h3>
                                        
                                        <div className="space-y-3 text-base md:text-lg text-gray-700 dark:text-gray-300">
                                            <p className="leading-relaxed">
                                                Gửi đến <strong className="text-pink-600 dark:text-pink-400">{recipient}</strong> - người bạn tuyệt vời đang ở xứ Đài xinh đẹp!
                                            </p>
                                            
                                            <p className="leading-relaxed">
                                                Chúc Trinh một tuổi mới tràn đầy niềm vui và hạnh phúc. Dù cách xa ngàn dặm, tình bạn của chúng ta vẫn luôn gần gũi và ấm áp như những ngày đầu. 
                                            </p>

                                            <p className="leading-relaxed">
                                                Mong rằng trên đất Đài Loan, Trinh sẽ học được nhiều điều mới, gặp gỡ những người bạn tốt, và có những trải nghiệm đáng nhớ. Hãy luôn tự tin, mạnh mẽ và theo đuổi ước mơ của mình!
                                            </p>

                                            <p className="leading-relaxed font-semibold text-pink-600 dark:text-pink-400 text-center text-lg md:text-xl">
                                                {specialMessage}
                                            </p>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-pink-300 dark:border-pink-700">
                                            <p className="text-right text-xs md:text-sm text-gray-600 dark:text-gray-400 italic">
                                                Từ Mai Xuân Gia Quyến 💝
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap justify-center gap-3">
                                        <button
                                            onClick={() => {
                                                setOpened(false);
                                                confettiRef.current?.burst?.();
                                            }}
                                            className="px-6 py-2.5 text-sm md:text-base rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all animate-gradient-shift"
                                        >
                                            Cảm ơn bạn! ❤️
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </section>
    );
}