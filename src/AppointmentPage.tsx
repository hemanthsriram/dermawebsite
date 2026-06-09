import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Phone, MessageSquare, Video, MapPin, Monitor, User, Calendar, Clock, ChevronUp, ChevronDown, Check, ArrowLeft, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from '@/components/ui/header-2';

export default function AppointmentPage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [stripStartDate, setStripStartDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('10:00');
    const [appointmentType, setAppointmentType] = useState('video');
    const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

    // Custom Calendar State
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const [calendarViewDate, setCalendarViewDate] = useState(new Date());
    const calendarRef = useRef<HTMLDivElement>(null);

    // Custom Time Picker State
    const [isTimeOpen, setIsTimeOpen] = useState(false);
    const [customHour, setCustomHour] = useState(10);
    const [customMinute, setCustomMinute] = useState(0);
    const timeRef = useRef<HTMLDivElement>(null);
    const dateStripRef = useRef<HTMLDivElement>(null);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Close popovers when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
                setIsCalendarOpen(false);
            }
            if (timeRef.current && !timeRef.current.contains(event.target as Node)) {
                setIsTimeOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Generate next 14 days for the calendar strip based on stripStartDate
    const dateStrip = Array.from({ length: 14 }).map((_, i) => {
        const d = new Date(stripStartDate);
        d.setDate(d.getDate() + i);
        return d;
    });

    // Predefined times including 30-min intervals within clinic bounds
    const predefinedTimes = [
        '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
        '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
    ];

    const isSunday = selectedDate.getDay() === 0;

    // --- Calendar Helper Functions ---
    const daysInMonth = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 0).getDate();
    const firstDayOfMonth = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), 1).getDay();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

    const handlePrevMonth = () => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() - 1, 1));
    const handleNextMonth = () => setCalendarViewDate(new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + 1, 1));

    const handleDateSelect = (day: number) => {
        const newDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), day);
        setSelectedDate(newDate);
        setStripStartDate(newDate);
        setIsCalendarOpen(false);
    };

    const toggleCalendar = () => {
        if (!isCalendarOpen) setCalendarViewDate(new Date(selectedDate));
        setIsCalendarOpen(!isCalendarOpen);
    };

    // --- Time Picker Helper Functions ---
    const validHours = [10, 11, 12, 13, 14, 17, 18, 19, 20];

    const incrementHour = () => {
        const currentIndex = validHours.indexOf(customHour);
        const nextHour = validHours[(currentIndex + 1) % validHours.length];
        setCustomHour(nextHour);
        if (nextHour === 14 || nextHour === 20) setCustomMinute(0);
    };

    const decrementHour = () => {
        const currentIndex = validHours.indexOf(customHour);
        const prevHour = validHours[(currentIndex - 1 + validHours.length) % validHours.length];
        setCustomHour(prevHour);
        if (prevHour === 14 || prevHour === 20) setCustomMinute(0);
    };

    const incrementMinute = () => {
        if (customHour === 14 || customHour === 20) return;
        setCustomMinute((prev) => (prev + 5) % 60);
    };

    const decrementMinute = () => {
        if (customHour === 14 || customHour === 20) return;
        setCustomMinute((prev) => (prev - 5 + 60) % 60);
    };

    const applyCustomTime = () => {
        const formattedTime = `${customHour.toString().padStart(2, '0')}:${customMinute.toString().padStart(2, '0')}`;
        setSelectedTime(formattedTime);
        setIsTimeOpen(false);
    };

    const toggleTimePicker = () => {
        if (!isTimeOpen) {
            const [h, m] = selectedTime.split(':').map(Number);
            if (validHours.includes(h)) {
                setCustomHour(h);
                setCustomMinute(m);
            }
        }
        setIsTimeOpen(!isTimeOpen);
    };

    const generateGoogleCalendarUrl = () => {
        const [hours, minutes] = selectedTime.split(':').map(Number);
        const startDate = new Date(selectedDate);
        startDate.setHours(hours, minutes, 0, 0);

        const endDate = new Date(startDate);
        endDate.setHours(startDate.getHours() + 1);

        const pad = (n: number) => n < 10 ? '0' + n : n;
        const formatGoogleDate = (date: Date) => {
            return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
        };

        const title = encodeURIComponent(`Consultation with Dr. Soujanya D.`);
        const details = encodeURIComponent(`Appointment Type: ${appointmentType}\n\nThank you for booking with ADCS Clinic!`);
        const location = encodeURIComponent(appointmentType === 'in-person' ? '95, Rd Number 72, Road No. 72, Jubilee Hills, Hyderabad, 500033' : 'Video Call Link will be provided');

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formatGoogleDate(startDate)}/${formatGoogleDate(endDate)}&details=${details}&location=${location}`;
    };

    const scrollStrip = (direction: 'left' | 'right') => {
        if (dateStripRef.current) {
            const scrollAmount = 300;
            dateStripRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-stone-900">
            {/* Top Bar */}
            <div className="hidden lg:block bg-stone-900 text-stone-300 py-2 px-6 text-xs font-medium tracking-wider uppercase">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2"><Phone className="w-3 h-3" /> ADCS Clinic</span>
                        <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> 95, Rd Number 72, Jubilee Hills, Hyderabad, 500033</span>
                    </div>
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2"><Clock className="w-3 h-3" /> Mon - Sat: 10:00 AM - 8:00 PM | Sun: 10:00 AM - 1:00 PM</span>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <Header />

            {/* Appointment Content */}
            <div className="bg-stone-50 min-h-screen">
                <div className="max-w-5xl mx-auto px-6 py-10 md:py-16">
                    {/* Back link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors font-medium text-sm mb-8 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-10">Book Your <span className="text-emerald-600 italic">Appointment</span></h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Date and Time Card */}
                            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100">
                                <h2 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-6">Choose date and time</h2>

                                {/* Month Selector with Custom Calendar */}
                                <div className="flex justify-between items-center mb-6 relative" ref={calendarRef}>
                                    <h3 className="text-lg font-semibold text-stone-800">
                                        {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                    </h3>
                                    <button
                                        onClick={toggleCalendar}
                                        className={`p-2 rounded-full transition-colors ${isCalendarOpen ? 'bg-emerald-50 text-emerald-600' : 'text-stone-400 hover:text-emerald-600 hover:bg-emerald-50'}`}
                                    >
                                        <Calendar className="w-5 h-5" />
                                    </button>

                                    {/* Custom Calendar Popover */}
                                    {isCalendarOpen && (
                                        <div className="absolute top-12 right-0 bg-white rounded-2xl shadow-xl border border-stone-100 p-5 z-20 w-80">
                                            <div className="flex justify-between items-center mb-4">
                                                <button onClick={handlePrevMonth} className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-full transition-colors">
                                                    <ChevronLeft className="w-5 h-5" />
                                                </button>
                                                <span className="font-semibold text-stone-800">
                                                    {calendarViewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                                </span>
                                                <button onClick={handleNextMonth} className="p-1 text-stone-400 hover:text-stone-700 hover:bg-stone-50 rounded-full transition-colors">
                                                    <ChevronRight className="w-5 h-5" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                                                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                                                    <div key={d} className="text-stone-400 font-medium py-1">{d}</div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-7 gap-1 text-sm">
                                                {blanks.map(b => <div key={`blank-${b}`} />)}
                                                {days.map(d => {
                                                    const dateObj = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth(), d);
                                                    const isSelected = dateObj.toDateString() === selectedDate.toDateString();
                                                    const isPast = dateObj < new Date(new Date().setHours(0, 0, 0, 0));

                                                    return (
                                                        <button
                                                            key={d}
                                                            disabled={isPast}
                                                            onClick={() => handleDateSelect(d)}
                                                            className={`w-9 h-9 mx-auto rounded-full flex items-center justify-center transition-all ${isSelected
                                                                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                                                    : isPast
                                                                        ? 'text-stone-300 cursor-not-allowed'
                                                                        : 'text-stone-700 hover:bg-stone-100'
                                                                }`}
                                                        >
                                                            {d}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Calendar Strip */}
                                <div className="relative group">
                                    <button
                                        onClick={() => scrollStrip('left')}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm border border-stone-100 rounded-full flex items-center justify-center shadow-lg text-stone-400 hover:text-emerald-600 hover:bg-white transition-all -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>

                                    <div
                                        ref={dateStripRef}
                                        className="flex overflow-x-auto pb-4 hide-scrollbar space-x-2 md:space-x-3 items-end scroll-smooth"
                                    >
                                        {dateStrip.map((d, i) => {
                                            const isSelected = d.toDateString() === selectedDate.toDateString();
                                            return (
                                                <div key={i} className="flex flex-col items-center min-w-[3.5rem] md:min-w-[4rem]">
                                                    <span className="text-[10px] md:text-xs text-stone-400 font-bold mb-3 uppercase tracking-tighter">
                                                        {d.toLocaleDateString('en-US', { weekday: 'short' })}
                                                    </span>
                                                    <button
                                                        onClick={() => setSelectedDate(d)}
                                                        className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex flex-col items-center justify-center transition-all border ${isSelected
                                                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-xl shadow-emerald-100'
                                                                : 'bg-white border-stone-100 text-stone-600 hover:border-emerald-200 hover:bg-emerald-50/30'
                                                            }`}
                                                    >
                                                        <span className="text-lg font-bold">{d.getDate()}</span>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <button
                                        onClick={() => scrollStrip('right')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm border border-stone-100 rounded-full flex items-center justify-center shadow-lg text-stone-400 hover:text-emerald-600 hover:bg-white transition-all translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>

                                <hr className="border-stone-100 my-8" />

                                {/* Time Selector */}
                                {isSunday ? (
                                    <div className="py-8 text-center bg-red-50 rounded-2xl border border-red-100 mb-8">
                                        <p className="text-red-500 font-medium">Clinic is closed on Sundays.</p>
                                        <p className="text-sm text-red-400 mt-1">Please select another date.</p>
                                    </div>
                                ) : (
                                    <>
                                        <h3 className="text-base font-semibold text-stone-800 mb-4">Select time</h3>
                                        <div className="flex flex-wrap gap-3 items-center">
                                            {predefinedTimes.map((time) => (
                                                <button
                                                    key={time}
                                                    onClick={() => setSelectedTime(time)}
                                                    className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${selectedTime === time
                                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                                                            : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300'
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}

                                            {/* Custom Time Button & Popover */}
                                            <div className="relative flex items-center" ref={timeRef}>
                                                <button
                                                    onClick={toggleTimePicker}
                                                    className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all border ${!predefinedTimes.includes(selectedTime)
                                                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-200'
                                                            : 'bg-white text-stone-600 border-stone-200 hover:border-emerald-300'
                                                        }`}
                                                >
                                                    <Clock className="w-4 h-4" />
                                                    <span>{!predefinedTimes.includes(selectedTime) ? selectedTime : 'Custom'}</span>
                                                </button>

                                                {isTimeOpen && (
                                                    <div className="absolute top-12 right-0 sm:left-0 sm:right-auto bg-white rounded-2xl shadow-xl border border-stone-100 p-5 z-20 w-56">
                                                        <h4 className="text-sm font-semibold text-stone-800 mb-4 text-center">Custom Time</h4>
                                                        <div className="flex justify-center items-center space-x-4 mb-6">
                                                            {/* Hour Selector */}
                                                            <div className="flex flex-col items-center">
                                                                <button onClick={incrementHour} className="p-1 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                                                                    <ChevronUp className="w-6 h-6" />
                                                                </button>
                                                                <span className="text-2xl font-bold text-stone-800 w-12 text-center py-1">
                                                                    {customHour.toString().padStart(2, '0')}
                                                                </span>
                                                                <button onClick={decrementHour} className="p-1 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                                                                    <ChevronDown className="w-6 h-6" />
                                                                </button>
                                                            </div>

                                                            <span className="text-2xl font-bold text-stone-300 pb-1">:</span>

                                                            {/* Minute Selector */}
                                                            <div className="flex flex-col items-center">
                                                                <button onClick={incrementMinute} className="p-1 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                                                                    <ChevronUp className="w-6 h-6" />
                                                                </button>
                                                                <span className="text-2xl font-bold text-stone-800 w-12 text-center py-1">
                                                                    {customMinute.toString().padStart(2, '0')}
                                                                </span>
                                                                <button onClick={decrementMinute} className="p-1 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors">
                                                                    <ChevronDown className="w-6 h-6" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={applyCustomTime}
                                                            className="w-full bg-emerald-600 hover:bg-stone-900 text-white py-2.5 rounded-xl font-medium transition-colors shadow-md shadow-emerald-200"
                                                        >
                                                            Apply
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <hr className="border-stone-100 my-8" />
                                    </>
                                )}

                                {/* Appointment Type */}
                                <h3 className="text-base font-semibold text-stone-800 mb-4">Type of appointment</h3>
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => setAppointmentType('video')}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${appointmentType === 'video'
                                                ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700'
                                                : 'border-stone-200 text-stone-600 hover:border-stone-300'
                                            }`}
                                    >
                                        <Monitor className={`w-5 h-5 ${appointmentType === 'video' ? 'text-emerald-600' : 'text-stone-400'}`} />
                                        <span className="font-medium text-sm">Video call</span>
                                    </button>
                                    <button
                                        onClick={() => setAppointmentType('in-person')}
                                        className={`flex items-center space-x-2 px-6 py-3 rounded-full border transition-all ${appointmentType === 'in-person'
                                                ? 'border-emerald-600 bg-emerald-50/50 text-emerald-700'
                                                : 'border-stone-200 text-stone-600 hover:border-stone-300'
                                            }`}
                                    >
                                        <User className={`w-5 h-5 ${appointmentType === 'in-person' ? 'text-emerald-600' : 'text-stone-400'}`} />
                                        <span className="font-medium text-sm">In-person</span>
                                    </button>
                                </div>

                                <hr className="border-stone-100 my-8" />

                                {/* Price */}
                                <h3 className="text-base font-semibold text-stone-800 mb-4">Consultation Fee</h3>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-stone-500 text-sm">1 hour consultation</span>
                                    <span className="font-bold text-lg text-stone-800">₹500</span>
                                </div>
                                <p className="text-xs text-stone-400 mb-8">
                                    * To be paid at the reception after the consultation.
                                </p>

                                {/* Booking Bar */}
                                <div className="flex flex-col sm:flex-row items-center justify-between border border-stone-200 rounded-2xl p-2 sm:pl-6 gap-4 sm:gap-0">
                                    <span className="text-stone-700 font-medium text-sm">
                                        {selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        {!isSunday && ` \u00A0\u00A0\u00A0 ${selectedTime}`}
                                    </span>
                                    <button
                                        disabled={isSunday}
                                        onClick={() => setIsBookingConfirmed(true)}
                                        className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold transition-all shadow-md ${isSunday
                                                ? 'bg-stone-300 text-stone-500 cursor-not-allowed shadow-none'
                                                : 'bg-stone-900 hover:bg-emerald-600 text-white shadow-emerald-100'
                                            }`}
                                    >
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Doctor Profile Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-stone-100 flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div className="w-24 h-24 bg-emerald-50 rounded-2xl overflow-hidden">
                                        <img
                                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=250"
                                            alt="Dr. Soujanya D."
                                            className="w-full h-full object-cover"
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>
                                    <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white translate-x-1/2 -translate-y-1/2"></div>
                                </div>

                                <h3 className="text-lg font-bold text-stone-900">Dr. Soujanya D.</h3>
                                <p className="text-stone-400 text-sm mb-6">Dermatologist</p>

                                <div className="flex space-x-4 mb-8">
                                    <button className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors">
                                        <MessageSquare className="w-5 h-5" />
                                    </button>
                                    <button className="w-12 h-12 rounded-full border border-stone-100 flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors">
                                        <Video className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-3 w-full gap-2 divide-x divide-stone-100 border-t border-stone-100 pt-6">
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="font-bold text-stone-900 text-sm">10+</span>
                                        <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Years Exp</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="font-bold text-stone-900 text-sm">1000s</span>
                                        <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Patients</span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="font-bold text-stone-900 text-sm">₹500</span>
                                        <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">Consult</span>
                                    </div>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div>
                                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4 ml-2">Clinic Location</h3>
                                <div className="bg-white rounded-3xl p-2 shadow-sm border border-stone-100">
                                    <div className="relative h-48 rounded-2xl overflow-hidden bg-stone-800">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.823357240556!2d78.4048813!3d17.4202628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb96b5a7fce4b1%3A0xa872ec463ff40980!2sAdvanced%20Dermatology%20and%20Cosmetic%20Surgery%20Center!5e0!3m2!1sen!2sin!4v1773307354829!5m2!1sen!2sin"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="ADCS Clinic Location"
                                        ></iframe>
                                        {/* Address Pill */}
                                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-medium text-stone-700 shadow-sm">
                                            95, Rd No. 72, Jubilee Hills
                                        </div>
                                        <a
                                            href="https://maps.app.goo.gl/4JvGmmMnNeYJSgLo7"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-stone-900 p-2 rounded-lg shadow-sm hover:bg-white hover:scale-105 transition-all"
                                            title="Open in Google Maps"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Working Hours Card */}
                            <div className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100">
                                <h3 className="text-sm font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">Working Hours</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-600 font-medium">Monday - Saturday</span>
                                        <span className="text-stone-800 font-bold">10:00 AM - 8:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-600 font-medium">Sunday</span>
                                        <span className="text-stone-800 font-bold">10:00 AM - 1:00 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {isBookingConfirmed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm"
                        onClick={() => setIsBookingConfirmed(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl text-center"
                            onClick={e => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                                className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <Check className="w-10 h-10 text-emerald-600" strokeWidth={3} />
                            </motion.div>
                            <h3 className="text-2xl font-serif font-bold text-stone-800 mb-2">Booking Confirmed!</h3>
                            <p className="text-stone-500 mb-8 leading-relaxed">
                                Thank you for choosing Dr. Soujanya D. Your {appointmentType} consultation is set for <span className="font-medium text-stone-700">{selectedDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span> at <span className="font-medium text-stone-700">{selectedTime}</span>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                                <a
                                    href={generateGoogleCalendarUrl()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-3.5 px-4 rounded-xl font-medium transition-colors border border-emerald-100 whitespace-nowrap"
                                >
                                    <Calendar className="w-5 h-5" />
                                    Add to Calendar
                                </a>
                                <button
                                    onClick={() => setIsBookingConfirmed(false)}
                                    className="w-full bg-stone-900 hover:bg-emerald-600 text-white py-3.5 px-4 rounded-xl font-bold transition-colors shadow-md"
                                >
                                    Done
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
