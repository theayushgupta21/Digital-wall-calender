import { useEffect } from 'react'
import WallCalendar from './components/WallCalendar'
import './index.css'
import { useCalendarStore } from './store/calendarStore'
import { Moon, Sun } from 'lucide-react'

export default function App() {
  const { darkMode, toggleDarkMode } = useCalendarStore()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F7F4] to-[#FFFFFF] dark:from-[#1A1A1A] dark:to-[#2D2D2D] flex items-center justify-center py-8 relative">
      {/* Dark mode toggle button */}
      <button
        onClick={toggleDarkMode}
        aria-label="Toggle dark mode"
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 text-slate-600 dark:text-slate-200 hover:text-accent"
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <WallCalendar />
    </div>
  )
}

