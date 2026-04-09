import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const today = new Date()

const store = (set, get) => ({
    // ── Navigation ──────────────────────────────────
    viewYear: today.getFullYear(),
    viewMonth: today.getMonth(), // 0-indexed
    isAnimating: false, // prevents double-click during transition

    // ── Selection ───────────────────────────────────
    startDate: null, // 'YYYY-MM-DD'
    endDate: null, // 'YYYY-MM-DD'
    hoverDate: null, // live preview target
    selectionPhase: 'idle', // 'idle' | 'selecting' | 'done'

    // ── Notes ───────────────────────────────────────
    notes: [], // persisted
    // note shape: { id, startDate, endDate, text, tag, createdAt }

    draftText: '',
    draftTag: null, // 'work'|'personal'|'travel'|'holiday'|null

    // ── Dark Mode ───────────────────────────────────
    darkMode: false, // persisted

    // ── Actions ─────────────────────────────────────

    prevMonth() {
        if (get().isAnimating) return
        set({ isAnimating: true })
        setTimeout(() => {
            const { viewYear, viewMonth } = get()
            const d = new Date(viewYear, viewMonth - 1, 1)
            set({
                viewYear: d.getFullYear(),
                viewMonth: d.getMonth(),
                isAnimating: false,
                startDate: null,
                endDate: null,
                hoverDate: null,
                selectionPhase: 'idle',
            })
        }, 350)
    },

    nextMonth() {
        if (get().isAnimating) return
        set({ isAnimating: true })
        setTimeout(() => {
            const { viewYear, viewMonth } = get()
            const d = new Date(viewYear, viewMonth + 1, 1)
            set({
                viewYear: d.getFullYear(),
                viewMonth: d.getMonth(),
                isAnimating: false,
                startDate: null,
                endDate: null,
                hoverDate: null,
                selectionPhase: 'idle',
            })
        }, 350)
    },

    goToToday() {
        set({
            viewYear: today.getFullYear(),
            viewMonth: today.getMonth(),
            startDate: null,
            endDate: null,
            hoverDate: null,
            selectionPhase: 'idle',
        })
    },

    // 2-phase click model:
    selectDate(dateStr) {
        const { selectionPhase, startDate } = get()

        if (selectionPhase === 'idle' || selectionPhase === 'done') {
            set({ startDate: dateStr, endDate: null, hoverDate: null, selectionPhase: 'selecting' })
        } else {
            // Second click
            const [s, e] = startDate <= dateStr ? [startDate, dateStr] : [dateStr, startDate]
            set({ startDate: s, endDate: e, hoverDate: null, selectionPhase: 'done' })
        }
    },

    setHoverDate(dateStr) {
        if (get().selectionPhase === 'selecting') set({ hoverDate: dateStr })
    },

    clearHover() {
        set({ hoverDate: null })
    },

    clearSelection() {
        set({
            startDate: null,
            endDate: null,
            hoverDate: null,
            selectionPhase: 'idle',
            draftText: '',
            draftTag: null,
        })
    },

    setDraftText(text) {
        set({ draftText: text })
    },

    toggleTag(tag) {
        set({ draftTag: get().draftTag === tag ? null : tag })
    },

    saveNote() {
        const { startDate, endDate, draftText, draftTag, notes } = get()
        if (!draftText.trim() || !startDate) return
        const note = {
            id: Date.now().toString(),
            startDate,
            endDate: endDate || startDate,
            text: draftText.trim(),
            tag: draftTag,
            createdAt: new Date().toISOString(),
        }
        set({ notes: [note, ...notes], draftText: '', draftTag: null })
    },

    deleteNote(id) {
        set({ notes: get().notes.filter((n) => n.id !== id) })
    },

    toggleDarkMode() {
        set({ darkMode: !get().darkMode })
    },
})

export const useCalendarStore = create(
    persist(store, {
        name: 'cal-notes-v1',
        partialize: (state) => ({ notes: state.notes, darkMode: state.darkMode }),
    })
)
