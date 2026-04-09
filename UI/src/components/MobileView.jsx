import { useState } from 'react'
import CalendarGrid from './CalendarGrid'
import NotesColumn from './NotesColumn'
import { useCalendarStore } from '../store/calendarStore'
import { Calendar, FileText } from 'lucide-react'

export default function MobileView({ year, month }) {
    const [activeTab, setActiveTab] = useState('calendar')
    const { darkMode } = useCalendarStore()

    return (
        <div className="flex flex-col flex-1">
            {/* Tab bar */}
            <div className={`flex items-center border-b transition-colors duration-300 ${darkMode
                    ? 'border-slate-700 bg-slate-800'
                    : 'border-[#E8E6E1] bg-[#F8F7F4]'
                }`}>
                <button
                    onClick={() => setActiveTab('calendar')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-inter transition-colors duration-300 ${activeTab === 'calendar'
                            ? darkMode
                                ? 'bg-slate-700 text-blue-400 border-b-2 border-blue-400'
                                : 'bg-white text-accent border-b-2 border-accent'
                            : darkMode
                                ? 'text-slate-400 hover:text-slate-200'
                                : 'text-[#9A9A9A] hover:text-[#2C2C2C]'
                        }`}
                >
                    <Calendar size={16} />
                    Calendar
                </button>
                <button
                    onClick={() => setActiveTab('notes')}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-inter transition-colors duration-300 ${activeTab === 'notes'
                            ? darkMode
                                ? 'bg-slate-700 text-blue-400 border-b-2 border-blue-400'
                                : 'bg-white text-accent border-b-2 border-accent'
                            : darkMode
                                ? 'text-slate-400 hover:text-slate-200'
                                : 'text-[#9A9A9A] hover:text-[#2C2C2C]'
                        }`}
                >
                    <FileText size={16} />
                    Notes
                </button>
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-hidden">
                {activeTab === 'calendar' && (
                    <CalendarGrid year={year} month={month} />
                )}
                {activeTab === 'notes' && (
                    <NotesColumn />
                )}
            </div>
        </div>
    )
}
