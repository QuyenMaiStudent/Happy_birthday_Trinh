import React, { useRef, useImperativeHandle, forwardRef } from 'react';

type ConfettiHandle = {
    burst: () => void;
    fireworks: () => void;
};

const Confetti = forwardRef<ConfettiHandle, {}>((_props, ref) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const particlesRef = useRef<any[]>([]);

    useImperativeHandle(ref, () => ({
        burst: () => runBurst(),
        fireworks: () => runFireworks(),
    }));

    function resize() {
        const c = canvasRef.current;
        if (!c) return;
        c.width = window.innerWidth * devicePixelRatio;
        c.height = window.innerHeight * devicePixelRatio;
    }

    function runFireworks() {
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext('2d');
        if (!ctx) return;
        
        cancelAnim();
        particlesRef.current = [];

        const cw = c.width, ch = c.height;
        const colors = ['#ff6b6b', '#ffd166', '#06ffa5', '#4ecdc4', '#f472b6', '#a78bfa', '#fbbf24', '#fb923c'];

        // Tạo nhiều đợt pháo hoa
        let fireworkCount = 0;
        const maxFireworks = 8;
        
        function createFirework(x: number, y: number) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            const particleCount = 80 + Math.floor(Math.random() * 40);
            
            // Tạo vụ nổ ban đầu (rockets flying up)
            for (let i = 0; i < 3; i++) {
                particlesRef.current.push({
                    kind: 'rocket',
                    x: x,
                    y: ch - 50,
                    targetY: y,
                    vx: (Math.random() - 0.5) * 2,
                    vy: -12 - Math.random() * 4,
                    size: 3,
                    color: color,
                    exploded: false,
                    particleCount: particleCount,
                    life: 100,
                });
            }
        }

        // Hàm tạo pháo hoa tự động
        const fireworkInterval = setInterval(() => {
            if (fireworkCount >= maxFireworks) {
                clearInterval(fireworkInterval);
                return;
            }
            
            const x = cw * (0.2 + Math.random() * 0.6);
            const y = ch * (0.15 + Math.random() * 0.35);
            createFirework(x, y);
            fireworkCount++;
        }, 600);

        let t = 0;
        function frame() {
            t++;
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, cw, ch);

            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                
                if (p.kind === 'rocket') {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.3; // gravity
                    p.life--;
                    
                    // Vẽ rocket trail
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    
                    // Nổ khi đến target hoặc hết vận tốc lên
                    if (!p.exploded && (p.y <= p.targetY || p.vy >= 0)) {
                        p.exploded = true;
                        
                        // Tạo các hạt nổ
                        for (let j = 0; j < p.particleCount; j++) {
                            const angle = (Math.PI * 2 * j) / p.particleCount + Math.random() * 0.5;
                            const speed = 2 + Math.random() * 8;
                            const hue = Math.random() * 60 - 30; // color variation
                            
                            particlesRef.current.push({
                                kind: 'spark',
                                x: p.x,
                                y: p.y,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                size: 2 + Math.random() * 3,
                                color: p.color,
                                hue: hue,
                                life: 60 + Math.random() * 60,
                                friction: 0.96,
                                gravity: 0.15,
                            });
                        }
                        
                        // Thêm sparkles sáng ở tâm vụ nổ
                        for (let j = 0; j < 20; j++) {
                            const angle = Math.random() * Math.PI * 2;
                            const speed = 12 + Math.random() * 8;
                            particlesRef.current.push({
                                kind: 'flash',
                                x: p.x,
                                y: p.y,
                                vx: Math.cos(angle) * speed,
                                vy: Math.sin(angle) * speed,
                                size: 4 + Math.random() * 4,
                                color: '#ffffff',
                                life: 20 + Math.random() * 20,
                                friction: 0.90,
                            });
                        }
                    }
                    
                    if (p.exploded || p.life <= 0) {
                        particlesRef.current.splice(i, 1);
                    }
                } else if (p.kind === 'spark') {
                    p.vx *= p.friction;
                    p.vy *= p.friction;
                    p.vy += p.gravity;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    
                    const alpha = Math.max(0, p.life / 60);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = alpha;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;
                    
                    // Trail effect
                    ctx.globalAlpha = alpha * 0.5;
                    ctx.fillStyle = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x - p.vx * 2, p.y - p.vy * 2, p.size * 0.6, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.globalAlpha = 1;
                    
                    if (p.life <= 0) {
                        particlesRef.current.splice(i, 1);
                    }
                } else if (p.kind === 'flash') {
                    p.vx *= p.friction;
                    p.vy *= p.friction;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    
                    const alpha = Math.max(0, p.life / 20);
                    ctx.fillStyle = p.color;
                    ctx.globalAlpha = alpha;
                    ctx.shadowBlur = 25;
                    ctx.shadowColor = '#ffffff';
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                    ctx.globalAlpha = 1;
                    
                    if (p.life <= 0) {
                        particlesRef.current.splice(i, 1);
                    }
                }
            }

            if (particlesRef.current.length > 0 || fireworkCount < maxFireworks) {
                rafRef.current = requestAnimationFrame(frame);
            } else {
                clearInterval(fireworkInterval);
                cancelAnim();
                ctx.clearRect(0, 0, cw, ch);
            }
        }

        frame();
    }

    function runBurst() {
        const c = canvasRef.current;
        if (!c) return;
        const ctx = c.getContext('2d');
        if (!ctx) return;
        cancelAnim();

        const cw = c.width, ch = c.height;
        const colors = ['#ff6b6b', '#ffd166', '#06ffa5', '#4ecdc4', '#f472b6', '#a78bfa'];

        // Confetti pieces
        for (let i = 0; i < 250; i++) {
            particlesRef.current.push({
                kind: 'confetti',
                x: cw / 2 + (Math.random() - 0.5) * 300,
                y: ch / 2,
                vx: (Math.random() - 0.5) * 15,
                vy: -12 - Math.random() * 10,
                size: 8 + Math.random() * 12,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.5,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 140 + Math.random() * 120,
            });
        }

        // Stars
        for (let i = 0; i < 60; i++) {
            const ang = Math.random() * Math.PI * 2;
            const speed = 10 + Math.random() * 12;
            particlesRef.current.push({
                kind: 'star',
                x: cw / 2,
                y: ch / 2,
                vx: Math.cos(ang) * speed,
                vy: Math.sin(ang) * speed,
                r: 2 + Math.random() * 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 90 + Math.random() * 70,
            });
        }

        // Hearts
        for (let i = 0; i < 40; i++) {
            particlesRef.current.push({
                kind: 'heart',
                x: Math.random() * cw,
                y: ch + 150,
                vx: (Math.random() - 0.5) * 3,
                vy: -3 - Math.random() * 4,
                size: 20 + Math.random() * 25,
                life: 200 + Math.random() * 120,
            });
        }

        let t = 0;
        function frame() {
            t++;
            ctx.clearRect(0, 0, cw, ch);

            for (let i = particlesRef.current.length - 1; i >= 0; i--) {
                const p = particlesRef.current[i];
                
                if (p.kind === 'confetti') {
                    p.vy += 0.45;
                    p.vx *= 0.995;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.angle += p.spin;
                    p.life--;
                    
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.angle);
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
                    ctx.shadowBlur = 0;
                    ctx.restore();
                } else if (p.kind === 'star') {
                    p.vy += 0.25;
                    p.vx *= 0.99;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.life--;
                    
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = p.color;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                } else if (p.kind === 'heart') {
                    p.x += p.vx + Math.sin((t + i) * 0.06) * 0.7;
                    p.y += p.vy;
                    p.life--;
                    
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = 'rgba(255, 105, 180, 0.6)';
                    ctx.font = `${p.size}px Arial`;
                    ctx.fillText('❤️', -p.size/2, p.size/2);
                    ctx.shadowBlur = 0;
                    ctx.restore();
                }

                if (p.life <= 0 || p.y > ch + 400) {
                    particlesRef.current.splice(i, 1);
                }
            }

            if (particlesRef.current.length > 0 && t < 4000) {
                rafRef.current = requestAnimationFrame(frame);
            } else {
                cancelAnim();
                ctx.clearRect(0, 0, cw, ch);
            }
        }

        frame();
    }

    function cancelAnim() {
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
    }

    React.useEffect(() => {
        resize();
        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnim();
        };
    }, []);

    return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 w-full h-full z-40" />;
});

export default Confetti;