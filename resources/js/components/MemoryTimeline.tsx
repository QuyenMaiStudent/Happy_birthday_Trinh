import React from 'react';
import { motion } from 'framer-motion';

type Memory = {
    title: string;
    date: string;
    description: string;
    icon: string;
};

type Props = {
    memories: Memory[];
};

export default function MemoryTimeline({ memories }: Props) {
    return (
        <section id="memories" className="w-full max-w-6xl mx-auto mt-20 px-4">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-center mb-12"
            >
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient-text" style={{ backgroundSize: '200% auto' }}>
                    📸 Những Kỷ Niệm Đáng Nhớ 📸
                </span>
            </motion.h2>

            <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-400 via-purple-400 to-blue-400" />

                <div className="space-y-12">
                    {memories.map((memory, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`flex items-center gap-8 ${
                                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                            }`}
                        >
                            <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                                <motion.div 
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    className="bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-purple-900/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all border-2 border-pink-200 dark:border-pink-800"
                                >
                                    <div className="text-5xl mb-3">{memory.icon}</div>
                                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        {memory.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 font-semibold">{memory.date}</p>
                                    <p className="text-gray-700 dark:text-gray-300">{memory.description}</p>
                                </motion.div>
                            </div>

                            <motion.div 
                                whileHover={{ scale: 1.2, rotate: 360 }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg text-xl">
                                    {index + 1}
                                </div>
                            </motion.div>

                            <div className="flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}