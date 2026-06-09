import React from 'react';
import { motion } from 'motion/react';

const cards = [
    {
        title: "About",
        content: (
            <div className="flex flex-col justify-center h-full text-base">
                <p className="font-medium text-stone-900">MBBS, DNB – Dermatology & Venereology</p>
                <p className="text-stone-500 mt-1">17 years experience overall • Dermatologist</p>
            </div>
        )
    },
    {
        title: "Qualification",
        content: (
            <div className="flex flex-col justify-center h-full text-sm space-y-1.5">
                <p><span className="font-medium text-stone-900">DNB</span> <span className="text-stone-500">(CARE Institute Of Medical Sciences – 2012)</span></p>
                <p><span className="font-medium text-stone-900">DDVL</span> <span className="text-stone-500">(Mahatma Gandhi Medical College)</span></p>
                <p><span className="font-medium text-stone-900">MBBS</span> <span className="text-stone-500">(Govt Medical College, Anantapur – 2007)</span></p>
            </div>
        )
    },
    {
        title: "Awards",
        content: (
            <div className="flex flex-col justify-center h-full text-base">
                <p className="font-medium text-stone-900">Achieved Distinction in Dermatology Residency</p>
                <p className="text-stone-500 mt-1">Mahatma Gandhi Medical College & Research Institute</p>
            </div>
        )
    },
    {
        title: "Membership",
        content: (
            <div className="flex flex-col justify-center h-full text-base space-y-1">
                <p className="font-medium text-stone-900">Cosmetic Dermatology Society Of India (CDSI)</p>
                <p className="font-medium text-stone-900">IADVL</p>
            </div>
        )
    },
    {
        title: "Registration",
        content: (
            <div className="flex flex-col justify-center h-full text-base">
                <p className="font-medium text-stone-900">58842</p>
                <p className="text-stone-500 mt-1">Andhra Pradesh Medical Council – 2007</p>
            </div>
        )
    }
];

export function DoctorSection() {
    const marqueeCards = [...cards, ...cards, ...cards];

    return (
        <section
            id="doctor"
            className="h-screen w-full relative overflow-hidden font-sans bg-white text-stone-900"
        >
            {/* Full Screen Background Image */}
            <div className="absolute inset-0 z-0 bg-white">
                <img
                    src="/doctor-portrait.png"
                    alt="Dr. Soujanya Dhulipala"
                    className="w-full h-full object-contain object-right-bottom lg:pr-20"
                />
            </div>

            <div className="relative w-full h-full max-w-[120rem] mx-auto">

                {/* Left Side: Floating Typography */}
                <div className="absolute inset-0 z-20 pointer-events-none">

                    {/* Box 1 — Name */}
                    <motion.div
                        className="absolute top-[12%] left-[8%] animate-float-slow pointer-events-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="font-serif text-4xl md:text-5xl lg:text-[4rem] leading-[0.9] tracking-tight font-light text-stone-900">
                            Dr. Soujanya<br />
                            <span className="ml-[10vw] lg:ml-[6.25rem] text-emerald-700">Dhulipala</span>
                        </h2>
                    </motion.div>

                    {/* Box 2 — Title */}
                    <motion.div
                        className="absolute top-[38%] left-[22%] animate-float-medium pointer-events-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h3 className="font-serif text-3xl md:text-4xl lg:text-[3.25rem] leading-[1] tracking-tight font-light text-stone-900">
                            Dermatologist<br />
                            <span className="ml-[6vw] lg:ml-[3.75rem] text-stone-500">& Skin Specialist</span>
                        </h3>
                    </motion.div>

                    {/* Box 3 — Experience */}
                    <motion.div
                        className="absolute top-[62%] left-[10%] animate-float-fast pointer-events-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <h4 className="font-serif text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.1] tracking-tight font-light text-stone-900">
                            17+ Years of<br />
                            <span className="ml-[4vw] lg:ml-[2.5rem] text-emerald-600">Clinical Experience</span>
                        </h4>
                    </motion.div>

                </div>

                {/* Bottom Marquee Carousel */}
                <div className="absolute bottom-6 md:bottom-8 left-0 w-full overflow-hidden z-30">
                    <div className="flex w-max animate-marquee hover:[animation-play-state:paused] items-center">
                        {marqueeCards.map((card, idx) => (
                            <div
                                key={idx}
                                className="w-[37.5rem] lg:w-[46.5rem] h-[8.25rem] shrink-0 bg-stone-50 text-stone-900 rounded-[24px] px-8 lg:px-10 py-0 mx-3 shadow-[0_4px_20px_rgba(28,25,23,0.05)] border border-stone-100 flex flex-row items-center gap-6 lg:gap-8 transition-transform duration-300"
                            >
                                <h5 className="font-serif text-xl lg:text-2xl text-emerald-700 w-1/4 text-right leading-tight">{card.title}</h5>
                                <div className="w-[1px] h-16 bg-stone-200 shrink-0"></div>
                                <div className="font-sans flex-1 h-full flex items-center">
                                    {card.content}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
