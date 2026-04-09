import { useCalendarStore } from '../store/calendarStore'
import { MONTHS } from '../utils/constants'
import SpiralBinding from './SpiralBinding'
import HeroSection from './HeroSection'
import CalendarSection from './CalendarSection'
import MobileView from './MobileView'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function WallCalendar() {
    const { viewYear, viewMonth, isAnimating, prevMonth, nextMonth, goToToday, darkMode } = useCalendarStore()

    return (
        <div className="w-full max-w-[950px] mx-auto px-4 py-8">
            <div
                className="w-full bg-white dark:bg-slate-900 rounded-xl overflow-hidden transition-colors duration-300"
                style={{
                    boxShadow: darkMode
                        ? '0 20px 60px rgba(0,0,0,0.5), 0 4px 16px rgba(0,0,0,0.3)'
                        : '0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)',
                    borderBottom: darkMode ? '3px solid #5A5A5A' : '3px solid #E8E4DC',
                }}
            >
                {/* Spiral binding */}
                <SpiralBinding />

                {/* Hero section with photo and month/year */}
                <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                    <HeroSection month={viewMonth} year={viewYear} />
                </div>

                {/* Desktop: Calendar + Notes side-by-side | Mobile: Tabs */}
                <div className="hidden md:flex flex-col">
                    <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <CalendarSection year={viewYear} month={viewMonth} />
                    </div>
                </div>

                {/* Mobile: Tab-based view */}
                <div className="md:hidden flex flex-col">
                    <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
                        <MobileView year={viewYear} month={viewMonth} />
                    </div>
                </div>

                {/* Navigation controls */}
                <nav className="flex items-center justify-between px-4 py-3 border-t border-[#E8E6E1] dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300">
                    {/* Left: prev month */}
                    <button
                        onClick={prevMonth}
                        disabled={isAnimating}
                        aria-label="Previous month"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A9A9A] dark:text-slate-400 hover:bg-accent-xlight dark:hover:bg-slate-700 hover:text-accent transition-colors disabled:opacity-50"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {/* Center: month year + today button */}
                    <div className="flex flex-col items-center gap-0.5">
                        <span className="font-bebas text-xl tracking-wider text-[#2C2C2C] dark:text-slate-100 transition-colors duration-300">
                            {MONTHS[viewMonth]} {viewYear}
                        </span>
                        <button
                            onClick={goToToday}
                            className="text-[10px] tracking-[0.12em] uppercase text-accent hover:text-accent-dark dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-inter"
                        >
                            Today
                        </button>
                    </div>

                    {/* Right: next month */}
                    <button
                        onClick={nextMonth}
                        disabled={isAnimating}
                        aria-label="Next month"
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#9A9A9A] dark:text-slate-400 hover:bg-accent-xlight dark:hover:bg-slate-700 hover:text-accent transition-colors disabled:opacity-50"
                    >
                        <ChevronRight size={16} />
                    </button>
                </nav>
            </div>
        </div>
    )
}
