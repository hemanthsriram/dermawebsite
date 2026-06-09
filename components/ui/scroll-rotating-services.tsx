import React, { useRef, useLayoutEffect, useMemo } from 'react';
import { Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/* Types                                                             */
/* ------------------------------------------------------------------ */

interface ServiceItem {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    image: string;
}

interface Props {
    services: ServiceItem[];
}

/* ------------------------------------------------------------------ */
/* Component - Version 1 (With Pop-up)                               */
/* ------------------------------------------------------------------ */

export function ScrollRotatingServices({ services }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const displayServices = useMemo(() => {
        if (!services || services.length === 0) return [];
        const lastThree = services.slice(-3);
        const firstThree = services.slice(0, 3);
        return [...lastThree, ...services, ...firstThree];
    }, [services]);

    const setCard = (el: HTMLDivElement | null, i: number) => {
        cardsRef.current[i] = el;
    };

    useLayoutEffect(() => {
        const section = sectionRef.current;
        if (!section || displayServices.length === 0) return;

        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        const originalCount = services.length;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                {
                    isDesktop: '(min-width: 1024px)',
                    isTablet: '(min-width: 640px) and (max-width: 1023px)',
                    isMobile: '(max-width: 639px)',
                },
                (context) => {
                    const { isDesktop, isTablet } = context.conditions!;

                    const R = isDesktop ? 2600 : isTablet ? 2000 : 1400;
                    const angularGap = isDesktop ? 14 : isTablet ? 18 : 22;

                    const totalShift = (originalCount - 1) * angularGap;

                    const scaleFor = (deg: number) => {
                        const a = Math.abs(deg);
                        if (a < 5) return 1.05;  // Center card pops out
                        if (a < 20) return 0.98;
                        return 0.92;
                    };

                    const opacityFor = (deg: number) => {
                        const a = Math.abs(deg);
                        if (a < 5) return 1;
                        if (a < 20) return 0.85;
                        if (a < 35) return 0.4;
                        return 0;
                    };

                    cards.forEach((card, i) => {
                        const angle = (i - 3) * angularGap;

                        gsap.set(card, {
                            rotation: angle,
                            scale: scaleFor(angle),
                            opacity: opacityFor(angle),
                            transformOrigin: `50% ${R}px`,
                            xPercent: -50,
                            yPercent: -50,
                            left: '50%',
                            // Pushed down significantly to 75% to stay clear of text
                            top: '75%',
                            zIndex: 100 - Math.abs(angle),
                        });
                    });

                    ScrollTrigger.create({
                        trigger: section,
                        start: 'top top',
                        end: `+=${originalCount * 400}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            const progress = self.progress;
                            const currentShift = progress * totalShift;

                            cards.forEach((card, i) => {
                                const currentAngle = ((i - 3) * angularGap) - currentShift;

                                gsap.set(card, {
                                    rotation: currentAngle,
                                    scale: scaleFor(currentAngle),
                                    opacity: opacityFor(currentAngle),
                                    zIndex: 100 - Math.round(Math.abs(currentAngle)),
                                });
                            });

                            // Smooth background transition in last 20% of scroll
                            if (progress > 0.8) {
                                const fadeProgress = (progress - 0.8) / 0.2; // 0 → 1
                                const r = Math.round(250 + (236 - 250) * fadeProgress); // stone-50 → emerald-50
                                const g = Math.round(250 + (253 - 250) * fadeProgress);
                                const b = Math.round(249 + (250 - 249) * fadeProgress);
                                section.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
                            } else {
                                section.style.backgroundColor = '';
                            }
                        }
                    });
                }
            );
        }, section);

        return () => ctx.revert();
    }, [services, displayServices.length]);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="relative z-40 w-full h-screen overflow-visible bg-stone-50/50 flex flex-col items-center"
        >
            <div className="absolute top-10 left-[10%] w-[31.25rem] h-[31.25rem] bg-emerald-100/20 rounded-full blur-[10rem] pointer-events-none" />
            <div className="absolute bottom-10 right-[8%] w-[37.5rem] h-[37.5rem] bg-blue-50/15 rounded-full blur-[11.25rem] pointer-events-none" />

            {/* Tightened top padding so text stays strictly at the top */}
            <div className="relative z-20 text-center px-6 pt-12 lg:pt-16 flex flex-col items-center gap-4 shrink-0">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    Our Services
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight text-stone-900">
                    Advanced Dermatology <br className="hidden md:block" /> Solutions For You.
                </h3>
            </div>

            <div className="absolute inset-0 z-10 pointer-events-none">
                {displayServices.map((service, i) => (
                    <div
                        key={i}
                        ref={(el) => setCard(el, i)}
                        className="absolute cursor-pointer group pointer-events-auto"
                        style={{
                            width: 'clamp(16.25rem, 28vw, 26.25rem)',
                            height: 'clamp(20rem, 32vw, 28rem)',
                            willChange: 'transform, opacity, z-index',
                        }}
                    >
                        <div className="relative w-full h-full rounded-[22px] border border-stone-200/50 bg-white/95 backdrop-blur-sm shadow-[0_12px_40px_rgba(0,0,0,0.07)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.14)] transition-shadow duration-500 overflow-hidden flex flex-col group">

                            {/* Service Top Image Header */}
                            <div className="relative w-full h-48 lg:h-56 shrink-0 overflow-hidden">
                                <img
                                    src={service.image}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    referrerPolicy="no-referrer"
                                />
                                {/* Bottom vignette fade into the card content */}
                                <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent bottom-0 pointer-events-none" />
                            </div>

                            <div className="flex flex-col flex-1 px-7 lg:px-9 pb-7 lg:pb-9 relative -mt-10">
                                {/* Service Icon floating overlapping image and text */}
                                <div
                                    className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-md border-4 border-white mb-4 ${service.color}`}
                                >
                                    {service.icon}
                                </div>

                                <h4 className="text-xl lg:text-2xl font-bold mb-3 group-hover:text-emerald-700 transition-colors duration-200">
                                    {service.title}
                                </h4>
                                <p className="text-stone-500 text-sm lg:text-base leading-relaxed group-hover:text-stone-600 transition-colors duration-200 line-clamp-4">
                                    {service.description}
                                </p>
                            </div>

                            <div className="absolute bottom-0 left-0 h-1.5 bg-emerald-500 w-0 group-hover:w-full transition-all duration-500 ease-out" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom gradient fade into next section (emerald-50) */}
            <div
                className="absolute bottom-0 left-0 right-0 h-40 z-[5] pointer-events-none"
                style={{
                    background: 'linear-gradient(to bottom, transparent, #ecfdf5)',
                }}
            />
        </section>
    );
}