import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Wish = {
    type: string;
    content: string;
    icon: string;
};

type Props = {
    wishes: Wish[];
};

export default function WishesSection({ wishes }: Props) {
    const [selectedWish, setSelectedWish] = useState<number | null>(null);

    return (
        <section id="wishes" className="w-full max-w-6xl mx-auto mt-20 px-4">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-12"
            >
                <span className="bg-gradient-to-r from-pink-600 via-red-500 to-purple-600 bg-clip-text text-transparent animate-gradient-text" style={{ backgroundSize: '200% auto' }}>
                    💝 Những Lời Chúc Dành Cho Trinh 💝
                </span>
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {wishes.map((wish, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        onClick={() => setSelectedWish(selectedWish === index ? null : index)}
                        className={`cursor-pointer transition-all duration-300 rounded-2xl p-6 border-2 ${
                            selectedWish === index
                                ? 'bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 dark:from-pink-900/60 dark:via-purple-900/60 dark:to-blue-900/60 shadow-2xl border-pink-400 dark:border-pink-600'
                                : 'bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-purple-900/20 shadow-lg border-pink-200 dark:border-pink-800'
                        }`}
                    >
                        <div className="flex items-start gap-4">
                            <motion.div 
                                animate={{ 
                                    rotate: selectedWish === index ? 360 : 0,
                                    scale: selectedWish === index ? 1.2 : 1
                                }}
                                transition={{ duration: 0.5 }}
                                className="text-5xl flex-shrink-0"
                            >
                                {wish.icon}
                            </motion.div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                                    {wish.type}
                                </h3>
                                <AnimatePresence>
                                    <motion.p 
                                        initial={{ opacity: 0.7 }}
                                        animate={{ opacity: selectedWish === index ? 1 : 0.85 }}
                                        className="text-gray-700 dark:text-gray-300"
                                    >
                                        {wish.content}
                                    </motion.p>
                                </AnimatePresence>
                            </div>
                        </div>

                        <AnimatePresence>
                            {selectedWish === index && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 pt-4 border-t border-pink-300 dark:border-pink-700"
                                >
                                    <p className="text-sm text-pink-600 dark:text-pink-400 italic font-semibold">
                                        ✨ Nhấn để đóng
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}