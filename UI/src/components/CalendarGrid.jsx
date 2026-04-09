import { useMemo } from 'react'
import { getDaysInMonth, getFirstDayOffset, toDateStr, getTodayStr } from '../utils/dateUtils'
import { DAY_HEADERS } from '../utils/constants'
import DayCell from './DayCell'
import { useCalendarStore } from '../store/calendarStore'

export default function CalendarGrid({ year, month }) {
    const {
        startDate,
        endDate,
        hoverDate,
        selectionPhase,
        selectDate,
        setHoverDate,
        clearHover,
        notes,
        darkMode,
    } = useCalendarStore()

    const todayStr = getTodayStr()

    // Memoized grid calculation
    const gridDays = useMemo(() => {
        const daysInMonth = getDaysInMonth(year, month)
        const firstDayOffset = getFirstDayOffset(year, month)
        const prevMonthDays = getDaysInMonth(year, month - 1)

        const grid = []

        // Previous month's trailing days
        for (let i = firstDayOffset - 1; i >= 0; i--) {
            const day = prevMonthDays - i
            const prevMonthIdx = month === 0 ? 11 : month - 1
            const prevYear = month === 0 ? year - 1 : year
            grid.push({
                dateStr: toDateStr(prevYear, prevMonthIdx, day),
                isCurrentMonth: false,
            })
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            grid.push({
                dateStr: toDateStr(year, month, day),
                isCurrentMonth: true,
            })
        }

        // Next month's leading days (to fill 42 slots for 6 rows × 7 cols)
        const remainingCells = 42 - grid.length
        for (let day = 1; day <= remainingCells; day++) {
            const nextMonthIdx = month === 11 ? 0 : month + 1
            const nextYear = month === 11 ? year + 1 : year
            grid.push({
                dateStr: toDateStr(nextYear, nextMonthIdx, day),
                isCurrentMonth: false,
            })
        }

        return grid
    }, [year, month])

    // Compute range for display
    const effectiveEnd = selectionPhase === 'selecting' && hoverDate ? hoverDate : endDate
    const isDateInRange = (dateStr) => {
        if (!startDate || !effectiveEnd) return false
        return dateStr >= startDate && dateStr <= effectiveEnd
    }

    // Compute which dates have notes
    const notesMap = useMemo(() => {
        const map = new Map()
        notes.forEach((note) => {
            const [start, end] = note.startDate <= note.endDate ? [note.startDate, note.endDate] : [note.endDate, note.startDate]
            let current = new Date(start)
            const endDate = new Date(end)
            while (current <= endDate) {
                const dateStr = toDateStr(current.getFullYear(), current.getMonth(), current.getDate())
                map.set(dateStr, true)
                current.setDate(current.getDate() + 1)
            }
        })
        return map
    }, [notes])

    return (
        <div className="flex-1 flex flex-col p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 gap-1 mb-3">
                {DAY_HEADERS.map((day) => (
                    <div
                        key={day}
                        className={`text-center border-b pb-2 text-xs font-inter font-semibold tracking-[0.1em] uppercase transition-colors duration-300 ${darkMode
                            ? 'text-slate-500 border-slate-700'
                            : 'text-[#9A9A9A] border-[#E8E6E1]'
                            }`}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-1">
                {gridDays.map((day, idx) => {
                    const isToday = day.dateStr === todayStr
                    const isStart = day.dateStr === startDate
                    const isEnd = day.dateStr === effectiveEnd
                    const isInRange = isDateInRange(day.dateStr)
                    const hasNote = notesMap.has(day.dateStr)

                    return (
                        <DayCell
                            key={idx}
                            dateStr={day.dateStr}
                            isCurrentMonth={day.isCurrentMonth}
                            isOtherMonth={!day.isCurrentMonth}
                            isToday={isToday}
                            isStart={isStart}
                            isEnd={isEnd}
                            isInRange={isInRange}
                            onClick={selectDate}
                            onHover={setHoverDate}
                            onLeave={clearHover}
                            hasNote={hasNote}
                        />
                    )
                })}
            </div>
        </div>
    )
}
