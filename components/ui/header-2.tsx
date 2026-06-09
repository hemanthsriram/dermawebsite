'use client';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

export function Header() {
    const [open, setOpen] = React.useState(false);
    const scrolled = useScroll(10);

    const links = [
        {
            label: 'Home',
            href: '#home',
        },
        {
            label: 'Services',
            href: '#services',
        },
        {
            label: 'About',
            href: '#about',
        },
        {
            label: 'Doctor',
            href: '#doctor',
        },
        {
            label: 'Reviews',
            href: '#reviews',
        },
        {
            label: 'Contact',
            href: '#contact',
        },
    ];

    const location = useLocation();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
        e.preventDefault();
        setOpen(false);
        if (location.pathname !== '/') {
            window.location.href = '/' + href;
            return;
        }
        const targetId = href.replace('#', '');
        const elem = document.getElementById(targetId);
        if (elem) {
            elem.scrollIntoView({
                behavior: 'smooth',
            });
        }
    };

    React.useEffect(() => {
        if (open) {
            // Disable scroll
            document.body.style.overflow = 'hidden';
        } else {
            // Re-enable scroll
            document.body.style.overflow = '';
        }

        // Cleanup when component unmounts (important for Next.js)
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    return (
        <header
            className={cn(
                'sticky top-0 z-[9999] mx-auto w-full border-b border-transparent md:transition-all md:duration-300 md:ease-out',
                {
                    'bg-white/80 backdrop-blur-md border-stone-100': !scrolled && !open,
                    'bg-white/80 supports-[backdrop-filter]:bg-white/50 backdrop-blur-lg md:top-4 md:max-w-4xl md:rounded-full md:border md:border-stone-100 md:shadow-lg':
                        scrolled && !open,
                    'bg-white/90': open,
                },
            )}
        >
            <nav
                className={cn(
                    'mx-auto flex w-full items-center justify-between md:transition-all md:duration-300 md:ease-out',
                    {
                        'max-w-7xl px-6 py-4': !scrolled,
                        'h-16 px-6 md:h-14 md:px-6': scrolled,
                    },
                )}
            >
                <div className="flex items-center gap-2">
                    <img src="/adcs-logo-transparent.png" alt="ADCS Clinic Logo" className="h-10 w-auto object-contain rounded-md" />
                    <span className="text-xl font-bold tracking-tight">ADCS<span className="text-emerald-600">CLINIC</span></span>
                </div>
                <div className="hidden items-center gap-2 md:flex">
                    {links.map((link, i) => (
                        <a
                            key={i}
                            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <Link to="/appointment">
                        <Button className="ml-2">Appointment</Button>
                    </Link>
                </div>
                <Button size="icon" variant="ghost" onClick={() => setOpen(!open)} className="md:hidden">
                    <MenuToggleIcon open={open} className="size-6 text-stone-900" duration={300} />
                </Button>
            </nav>

            <div
                className={cn(
                    'bg-white/95 backdrop-blur-md fixed top-20 right-0 bottom-0 left-0 z-50 flex flex-col overflow-hidden border-t md:hidden',
                    open ? 'block' : 'hidden',
                )}
            >
                <div
                    data-slot={open ? 'open' : 'closed'}
                    className={cn(
                        'data-[slot=open]:animate-in data-[slot=open]:zoom-in-95 data-[slot=closed]:animate-out data-[slot=closed]:zoom-out-95 ease-out',
                        'flex h-full w-full flex-col justify-between gap-y-2 p-6',
                    )}
                >
                    <div className="grid gap-y-4">
                        {links.map((link) => (
                            <a
                                key={link.label}
                                className="text-2xl font-semibold border-b border-stone-100 pb-4 text-stone-900"
                                href={link.href}
                                onClick={(e) => handleScroll(e, link.href)}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex flex-col gap-2 pb-8">
                        <Link to="/appointment">
                            <Button className="w-full py-6 text-lg">Book Appointment</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}


