import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EnvelopeProps {
    onOpen: () => void;
    recipientName: string;
}

export default function Envelope({ onOpen, recipientName }: EnvelopeProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
        setTimeout(() => onOpen(), 1500);
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-full"
                        style={{
                            background: `linear-gradient(135deg, 
                                ${['#ff6b9d', '#ffd93d', '#6bcfff', '#c084fc', '#fb923c'][i % 5]}, 
                                ${['#c026d3', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444'][i % 5]})`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0.3, 1, 0.3],
                            scale: [1, 1.5, 1],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full px-4">
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="text-center mb-8"
                        >
                            <motion.h1
                                className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
                                animate={{
                                    backgroundPosition: ['0%', '100%', '0%'],
                                }}
                                transition={{ duration: 5, repeat: Infinity }}
                            >
                                🎁 Surprise! 🎁
                            </motion.h1>
                            <motion.p
                                className="text-xl md:text-2xl text-gray-300"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Nhấn vào thiệp để mở nha! 💝
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative flex items-center justify-center">
                    <motion.div
                        className="relative w-80 h-56 cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                    >
                        {/* Envelope body */}
                        <motion.div
                            className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden"
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            }}
                            animate={{
                                boxShadow: [
                                    '0 25px 50px -12px rgba(139, 92, 246, 0.5)',
                                    '0 25px 50px -12px rgba(236, 72, 153, 0.5)',
                                    '0 25px 50px -12px rgba(139, 92, 246, 0.5)',
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            {/* Decorative patterns */}
                            <div className="absolute inset-0 opacity-20">
                                {[...Array(15)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                        animate={{
                                            rotate: 360,
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{
                                            duration: 4 + Math.random() * 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 2,
                                        }}
                                    >
                                        {['❤️', '⭐', '✨', '💕', '🌸'][i % 5]}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Envelope flap */}
                            <motion.div
                                className="absolute inset-x-0 top-0 h-32 origin-top"
                                style={{
                                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                                }}
                                animate={isOpen ? { rotateX: 180 } : { rotateX: 0 }}
                                transition={{ duration: 1, ease: 'easeInOut' }}
                            />

                            {/* Address label */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div
                                    className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg border-2 border-pink-300"
                                    animate={{
                                        borderColor: ['#f9a8d4', '#c084fc', '#60a5fa', '#f9a8d4'],
                                    }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <div className="text-center">
                                        <p className="text-sm text-gray-600 mb-2 font-semibold">
                                            💌 Gửi đến 💌
                                        </p>
                                        <motion.p
                                            className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                                            animate={{
                                                backgroundPosition: ['0%', '200%', '0%'],
                                            }}
                                            transition={{ duration: 3, repeat: Infinity }}
                                        >
                                            {recipientName} 🎂
                                        </motion.p>
                                        <p className="text-xs text-gray-500 mt-2">
                                            ✨ Người đặc biệt ✨
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Decorative hearts */}
                            <motion.div
                                className="absolute top-2 right-2 text-2xl"
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                💝
                            </motion.div>
                            <motion.div
                                className="absolute bottom-2 left-2 text-2xl"
                                animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                            >
                                🎀
                            </motion.div>
                        </motion.div>

                        {/* Card inside envelope */}
                        <motion.div
                            className="absolute inset-x-4 -bottom-2 h-48 rounded-t-lg shadow-xl"
                            style={{
                                background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                            }}
                            initial={{ y: 0 }}
                            animate={isOpen ? { y: -200 } : { y: 0 }}
                            transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
                        >
                            <div className="p-4 text-center">
                                <p className="text-3xl mb-2">🎉</p>
                                <p className="text-lg font-bold text-purple-800">
                                    Happy Birthday!
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Floating elements - positioned relative to envelope center */}
                    <AnimatePresence>
                        {!isOpen && (
                            <>
                                {[...Array(8)].map((_, i) => {
                                    const angle = (i * Math.PI) / 4;
                                    const radius = 180;
                                    return (
                                        <motion.div
                                            key={i}
                                            className="absolute text-4xl pointer-events-none"
                                            style={{
                                                left: `calc(50% + ${Math.cos(angle) * radius}px)`,
                                                top: `calc(50% + ${Math.sin(angle) * radius}px)`,
                                                transform: 'translate(-50%, -50%)',
                                            }}
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: [0, 1, 0],
                                                scale: [0, 1, 0],
                                                y: [0, -20, -40],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                delay: i * 0.2,
                                            }}
                                        >
                                            {['🎈', '🎊', '🎉', '✨', '💖', '🌟', '🎁', '🌺'][i]}
                                        </motion.div>
                                    );
                                })}
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}