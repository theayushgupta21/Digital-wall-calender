// src/utils/dateUtils.js — ALL pure functions, zero imports

export const MONTHS = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

export const MONTH_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

// Week starts Monday
export const DAY_HEADERS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

export const HOLIDAYS = {
    '01-01': { label: "New Year's Day", color: '#E74C3C' },
    '01-26': { label: 'Republic Day', color: '#E74C3C' },
    '02-14': { label: "Valentine's Day", color: '#E91E63' },
    '03-08': { label: "Women's Day", color: '#9C27B0' },
    '03-25': { label: 'Holi', color: '#FF5722' },
    '04-14': { label: 'Baisakhi', color: '#FF9800' },
    '08-15': { label: 'Independence Day', color: '#FF9800' },
    '10-02': { label: 'Gandhi Jayanti', color: '#2196F3' },
    '10-20': { label: 'Diwali', color: '#FF9800' },
    '11-14': { label: "Children's Day", color: '#4CAF50' },
    '12-25': { label: 'Christmas', color: '#4CAF50' },
    '12-31': { label: "New Year's Eve", color: '#9C27B0' },
}

// Converts JS Date's getDay() (Sun=0) to Monday-first index
export function toMondayIndex(jsDay) {
    return (jsDay + 6) % 7
}

// Returns 'YYYY-MM-DD' string
export function toDateStr(year, month, day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function parseDateStr(str) {
    const [y, m, d] = str.split('-').map(Number)
    return { year: y, month: m - 1, day: d }
}

export function getTodayStr() {
    const t = new Date()
    return toDateStr(t.getFullYear(), t.getMonth(), t.getDate())
}

export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate()
}

// Returns Monday-based first day offset (0=Mon, 6=Sun)
export function getFirstDayOffset(year, month) {
    return toMondayIndex(new Date(year, month, 1).getDay())
}

export function getHolidayKey(month, day) {
    return `${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export function formatRange(start, end) {
    if (!start) return null
    const s = parseDateStr(start)
    const e = end ? parseDateStr(end) : null
    if (!e || start === end)
        return `${MONTH_SHORT[s.month]} ${s.day}, ${s.year}`
    if (s.year === e.year && s.month === e.month)
        return `${MONTH_SHORT[s.month]} ${s.day}–${e.day}`
    if (s.year === e.year)
        return `${MONTH_SHORT[s.month]} ${s.day} – ${MONTH_SHORT[e.month]} ${e.day}`
    return `${MONTH_SHORT[s.month]} ${s.day}, ${s.year} – ${MONTH_SHORT[e.month]} ${e.day}, ${e.year}`
}

export function countDays(start, end) {
    if (!start || !end) return 1
    return Math.round(Math.abs(new Date(end) - new Date(start)) / 86400000) + 1
}
