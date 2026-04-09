import React from 'react'
import { getTodayStr, HOLIDAYS, getHolidayKey } from '../utils/dateUtils'
import { useCalendarStore } from '../store/calendarStore'

function DayCell({ dateStr, isCurrentMonth, isOtherMonth, isToday, isStart, isEnd, isInRange, onClick, onHover, onLeave, hasNote }) {
    const { darkMode } = useCalendarStore()

    if (!dateStr) {
        return <div className="h-9 select-none" />
    }

    const [, , dayStr] = dateStr.split('-')
    const day = parseInt(dayStr)
    const todayStr = getTodayStr()
    const holidayKey = getHolidayKey(dateStr.split('-')[1] - 1, day)
    const holiday = HOLIDAYS[holidayKey]

    let bgClass = 'bg-transparent'
    let textClass = darkMode ? 'text-slate-100' : 'text-[#2C2C2C]'
    let roundClass = 'rounded-[4px]'
    let isClickable = isCurrentMonth

    if (isOtherMonth) {
        textClass = darkMode ? 'text-slate-600' : 'text-[#CCCCCC]'
        isClickable = false
    } else if (isStart && isEnd) {
        bgClass = 'bg-accent'
        textClass = 'text-white'
        roundClass = 'rounded-full'
    } else if (isStart || isEnd) {
        bgClass = 'bg-accent'
        textClass = 'text-white'
        roundClass = isStart ? 'rounded-l-full rounded-r-none' : 'rounded-r-full rounded-l-none'
    } else if (isInRange) {
        bgClass = darkMode ? 'bg-blue-900/40' : 'bg-accent-bg'
        textClass = darkMode ? 'text-blue-300' : 'text-accent'
        roundClass = 'rounded-none'
    }

    const handleClick = () => {
        if (isClickable) onClick(dateStr)
    }

    const hoverBgClass = isClickable ? (darkMode ? 'hover:bg-slate-700' : 'hover:bg-accent-xlight') : ''

    return (
        <button
            onClick={handleClick}
            onMouseEnter={() => isClickable && onHover(dateStr)}
            onMouseLeave={onLeave}
            disabled={!isClickable}
            aria-label={`${dateStr}${isToday ? ' (today)' : ''}`}
            aria-pressed={isStart || isEnd}
            aria-selected={isInRange}
            className={`relative flex items-center justify-center h-9 w-9 transition-colors duration-150 ${bgClass} ${textClass} ${roundClass} ${isClickable ? `${hoverBgClass} cursor-pointer` : 'cursor-default'
                } ${isClickable && !isStart && !isEnd && !isInRange ? (darkMode ? 'hover:text-blue-400' : 'hover:text-accent') : ''} disabled:cursor-default font-inter text-sm font-normal`}
        >
            {day}

            {/* Today dot indicator */}
            {isToday && (
                <div
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full"
                    style={{ background: '#E74C3C' }}
                    aria-hidden="true"
                />
            )}

            {/* Holiday dot indicator */}
            {holiday && !isToday && (
                <div
                    className="absolute -bottom-1 w-1 h-1 rounded-full"
                    style={{ background: holiday.color }}
                    aria-hidden="true"
                />
            )}

            {/* Note indicator */}
            {hasNote && (
                <div
                    className="absolute -bottom-1 w-1 h-1 rounded-full"
                    style={{ background: '#1B6CA8' }}
                    aria-hidden="true"
                />
            )}
        </button>
    )
}

export default React.memo(DayCell)
