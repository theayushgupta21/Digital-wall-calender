import CalendarGrid from './CalendarGrid'
import NotesColumn from './NotesColumn'
import { useCalendarStore } from '../store/calendarStore'
import { formatRange, countDays } from '../utils/dateUtils'
import { X } from 'lucide-react'

export default function CalendarSection({ year, month }) {
    const { startDate, endDate, selectionPhase, clearSelection, darkMode } = useCalendarStore()

    const showStatusBar = selectionPhase !== 'idle'
    const rangeLabel = formatRange(startDate, endDate)
    const dayCount = countDays(startDate, endDate || startDate)

    return (
        <div className="flex flex-col">
            {/* Status indicator bar */}
            {showStatusBar && (
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${showStatusBar ? 'max-h-[32px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    style={{
                        background: darkMode ? 'rgba(30, 100, 168, 0.15)' : '#EBF4FB',
                        borderTop: '1px solid rgba(27, 108, 168, 0.2)',
                        borderBottom: '1px solid rgba(27, 108, 168, 0.2)',
                    }}
                >
                    <div className="px-4 py-1.5 flex items-center justify-between text-xs text-accent gap-2">
                        <div className="flex items-center gap-2">
                            {selectionPhase === 'selecting' && (
                                <>
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span>Tap end date to complete range</span>
                                </>
                            )}
                            {selectionPhase === 'done' && (
                                <>
                                    <div className="w-2 h-2 rounded-full bg-accent" />
                                    <span>
                                        {rangeLabel} · {dayCount} day{dayCount !== 1 ? 's' : ''}
                                    </span>
                                </>
                            )}
                        </div>
                        {selectionPhase === 'done' && (
                            <button
                                onClick={clearSelection}
                                className="hover:text-accent-dark transition-colors"
                                aria-label="Clear selection"
                            >
                                <X size={14} />
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Main calendar section */}
            <div className="flex flex-col md:flex-row flex-1 bg-white dark:bg-slate-800 transition-colors duration-300">
                <NotesColumn />
                <CalendarGrid year={year} month={month} />
            </div>
        </div>
    )
}
