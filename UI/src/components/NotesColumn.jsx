import { useMemo } from 'react'
import { formatRange } from '../utils/dateUtils'
import { useCalendarStore } from '../store/calendarStore'
import { Trash2 } from 'lucide-react'

export default function NotesColumn() {
    const { startDate, endDate, draftText, draftTag, notes, setDraftText, toggleTag, saveNote, deleteNote, darkMode } =
        useCalendarStore()

    const rangeLabel = formatRange(startDate, endDate)

    // Get notes for current range
    const rangeNotes = useMemo(() => {
        if (!startDate) return []
        return notes.filter((n) => {
            const [nStart, nEnd] = n.startDate <= n.endDate ? [n.startDate, n.endDate] : [n.endDate, n.startDate]
            const [selStart, selEnd] = startDate <= (endDate || startDate) ? [startDate, endDate || startDate] : [endDate || startDate, startDate]
            return !(nEnd < selStart || nStart > selEnd)
        })
    }, [startDate, endDate, notes])

    const isEditing = startDate !== null

    return (
        <div className="w-full md:w-[35%] bg-[#F8F7F4] dark:bg-slate-700 border-r border-[#E0DDD8] dark:border-slate-600 p-4 flex flex-col gap-3 transition-colors duration-300">
            {/* Label */}
            <p className="font-script text-[18px] text-[#4A4A4A] dark:text-slate-200 font-normal italic transition-colors duration-300">Notes:</p>

            {/* Ruled lines area */}
            <div className="flex-1 flex flex-col gap-0">
                {isEditing ? (
                    // Show textarea when editing
                    <>
                        <p className="text-xs text-accent mb-2 font-inter dark:text-blue-400">
                            <span className="text-[#9A9A9A] dark:text-slate-400">Note for:</span> {rangeLabel}
                        </p>
                        <textarea
                            value={draftText}
                            onChange={(e) => setDraftText(e.target.value)}
                            placeholder="Write your note here..."
                            className="flex-1 font-script text-[15px] resize-none border-none outline-none bg-transparent text-[#2C2C2C] dark:text-slate-100 placeholder-[#CCCCCC] dark:placeholder-slate-500 transition-colors duration-300"
                            style={{
                                minHeight: '100px',
                                borderBottom: darkMode ? '1px solid #555555' : '1px solid #D5D0C8',
                            }}
                            onKeyDown={(e) => {
                                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                                    saveNote()
                                }
                            }}
                        />
                        {/* Tag pills */}
                        <div className="flex gap-2 mt-2 mb-2 flex-wrap">
                            {['Work', 'Personal', 'Travel', 'Holiday'].map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag.toLowerCase())}
                                    className={`text-xs px-3 py-1 rounded-full font-inter transition-colors ${draftTag === tag.toLowerCase()
                                        ? 'bg-accent text-white'
                                        : darkMode
                                            ? 'bg-slate-600 text-slate-100 hover:bg-accent hover:text-white'
                                            : 'bg-[#E8E6E1] text-[#2C2C2C] hover:bg-accent hover:text-white'
                                        }`}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                        {/* Save button */}
                        <button
                            onClick={saveNote}
                            disabled={!draftText.trim()}
                            className="self-end px-4 py-1.5 bg-accent text-white rounded text-xs font-inter font-medium hover:bg-accent-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Save
                        </button>
                    </>
                ) : (
                    // Show ruled lines when not editing
                    <>
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-8 border-b flex items-center text-[#2C2C2C] dark:text-slate-300 text-[13px] font-script hover:bg-opacity-50 cursor-text transition-colors duration-300"
                                style={{
                                    borderBottomColor: darkMode ? '#555555' : '#D5D0C8',
                                    backgroundColor: darkMode ? 'rgba(100, 116, 139, 0.1)' : 'transparent',
                                }}
                            />
                        ))}
                    </>
                )}
            </div>

            {/* Saved notes list for range */}
            {isEditing && rangeNotes.length > 0 && (
                <div className="border-t border-[#E0DDD8] dark:border-slate-600 pt-2 mt-2 transition-colors duration-300">
                    <p className="text-[11px] text-[#9A9A9A] dark:text-slate-400 font-inter uppercase mb-2 transition-colors duration-300">Saved Notes</p>
                    {rangeNotes.map((note) => (
                        <div
                            key={note.id}
                            className="flex items-start justify-between gap-2 p-2 bg-white dark:bg-slate-800 rounded border border-[#E8E6E1] dark:border-slate-600 text-xs mb-1 group transition-colors duration-300"
                        >
                            <p className="font-script text-[13px] text-[#2C2C2C] dark:text-slate-200 flex-1 line-clamp-2 transition-colors duration-300">{note.text}</p>
                            <button
                                onClick={() => deleteNote(note.id)}
                                className="opacity-0 group-hover:opacity-100 text-[#9A9A9A] dark:text-slate-400 hover:text-accent dark:hover:text-blue-400 transition-all flex-shrink-0"
                                aria-label="Delete note"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
