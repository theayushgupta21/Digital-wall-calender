# Digital Wall Calendar 

A pixel-perfect interactive wall calendar built with React 18, Tailwind CSS v3, and Zustand. Inspired by premium physical wall calendars with modern interactive features.

## Features

- **Date Range Selection** — Two-click model with live hover preview
- **Smart Notes System** — Month-attached notes with 4 category tags (Work, Personal, Travel, Holiday)
- **Persistent Storage** — Notes survive page refresh via Zustand + localStorage
- **Smooth Animations** — Month-flip transitions, note entry animations, responsive transforms
- **Holiday Markers** — Automatic holiday indicators for major Indian + global holidays
- **Full Responsiveness** — Desktop side-by-side layout, mobile tab-based interface
- **Accessibility First** — ARIA labels, keyboard navigation (Tab + Enter), focus rings
- **Reduced Motion Support** — Respects `prefers-reduced-motion` system setting

## Design Decisions

### Aesthetic
- **Light Editorial Theme** — Inspired by premium physical wall calendars
- **Monday-First Week** — Aligns with international calendar conventions
- **Diagonal Blue Accent** — Recreates the bold geometric shape from the reference
- **Dancing Script Font** — Handwritten feel for personal notes section
- **Metal Spiral Binding** — Full-width binding rings like real wall calendars

### Architecture
- **React.memo(DayCell)** — Optimizes re-renders, only updates on cell state change
- **useMemo(gridDays, notesMap)** — Prevents unnecessary grid recalculations
- **Zustand + persist middleware** — Minimal boilerplate, built-in localStorage sync
- **Zero prop drilling** — All components read store directly
- **Pure date utilities** — `dateUtils.js` has zero dependencies, zero side effects

### UX
- **Two-phase selection** — First click = start date (enters 'selecting' phase), second click = end date (enters 'done' phase)
- **Live range preview** — Hover shows where range will end before clicking
- **Status bar** — Shows current selection state with day count ("Apr 5 – Apr 12 · 8 days")
- **Notes appear inline** — Saved notes show as text on ruled lines (handwritten aesthetic)

## Tech Stack

```
Framework:      React 18 (Vite, functional components + hooks)
Styling:        Tailwind CSS v3 (utility-first, no CSS Modules)
State:          Zustand v4 (with persist middleware for localStorage)
Icons:          Lucide React
Language:       JavaScript (ESM modules, no TypeScript)
Fonts:          Google Fonts (Bebas Neue, Inter, Dancing Script)
Build:          Vite (fast HMR, native ES modules)
```

## Project Structure

```
src/
├── components/
│   ├── WallCalendar.jsx       ← Root: orchestrates layout + navigation
│   ├── SpiralBinding.jsx      ← Metal spiral binding rings
│   ├── HeroSection.jsx        ← Photo + diagonal accent + month/year
│   ├── DiagonalAccent.jsx     ← SVG parallelogram overlay
│   ├── CalendarSection.jsx    ← Desktop: side-by-side notes + grid
│   ├── CalendarGrid.jsx       ← 7×6 day grid (memoized)
│   ├── DayCell.jsx            ← Individual day (React.memo'd)
│   ├── NotesColumn.jsx        ← Ruled lines + note input + tags
│   └── MobileView.jsx         ← Tabs (Calendar | Notes)
├── store/
│   └── calendarStore.js       ← Zustand: all state + all actions
├── utils/
│   ├── dateUtils.js           ← Pure date functions
│   └── constants.js           ← Month images, re-exports
├── App.jsx                    ← Root wrapper
├── main.jsx                   ← React DOM entry
└── index.css                  ← Tailwind directives + base styles
```

## Color Palette

```js
// Structure
#FFFFFF            — Card background (white)
#F8F7F4            — Calendar section background (warm off-white)
#E8E6E1            — Subtle borders, ruled lines
#2C2C2C            — Primary text (numbers, labels)
#9A9A9A            — Day headers, placeholder text

// Brand Accent (deep sky blue)
#1B6CA8            — Primary: start/end dates, buttons
#2E86C1            — Hover/light variant
#154E7A            — Pressed/dark variant
#EBF4FB            — Very light blue (range background)
#D6EAF8            — Light blue tint

// Special Indicators
#E74C3C            — Today dot (red)
#B8B0A0            — Spiral metal (bronze)
```

## Getting Started

### Prerequisites
- Node.js 16+ (for ES modules)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start dev server (opens in browser)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### First Time Setup

1. **Install Tailwind CSS** (if not already done):
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

2. **Fonts Already Configured** — Google Fonts links are in `index.html`

3. **State Persistence** — Zustand automatically saves notes to localStorage at key `cal-notes-v1`

## Usage

### Basic Component Usage

```jsx
import WallCalendar from './components/WallCalendar'

export default function App() {
  return <WallCalendar />
}
```

### Accessing Store Directly

```jsx
import { useCalendarStore } from './store/calendarStore'

function MyComponent() {
  const { startDate, endDate, notes, saveNote } = useCalendarStore()
  
  // Use store state and actions
  return <div>{startDate}</div>
}
```

## Responsiveness

### Desktop (lg: ≥1024px)
- Card max-width: 780px, centered
- Notes column: 35% width
- Calendar grid: 65% width
- Hero section: 45% of card height

### Tablet (md: 768px–1023px)
- Notes column: 30% width
- Grid column: 70% width
- Hero section: 240px height

### Mobile (<md: <768px)
- Full-width stacked layout
- Tab bar: Calendar | Notes switcher
- Hero section: 200px height
- Single column, full-width at 100%

## Date Selection Flow

1. **Idle State** — No selection, user can click any current-month date
2. **Selecting Phase** — First date selected, shows as start (blue). User can hover to preview range.
3. **Done Phase** — Second date selected. Full range displayed with status bar showing "Apr 5 – Apr 12 · 8 days"
4. **Clear** — Click × on status bar to return to Idle

## Notes System

### Creating a Note
1. Select a date range (or single date)
2. Typed text appears in textarea below ruled lines
3. Optionally select a tag (Work, Personal, Travel, Holiday)
4. Press Save or Cmd/Ctrl+Enter
5. Note persists to localStorage

### Viewing Notes
- Saved notes appear as list below ruled lines
- Hover to see delete (×) button
- Notes are tied to the selected range

### Note Structure

```js
{
  id: "1712500000000",           // Timestamp ID
  startDate: "2025-04-05",        // 'YYYY-MM-DD'
  endDate: "2025-04-12",          // Same as startDate for single day
  text: "Team meeting today",     // Note content
  tag: "work",                    // 'work'|'personal'|'travel'|'holiday'|null
  createdAt: "2025-04-05T10:00:00Z"  // ISO time
}
```

## Accessibility

- **ARIA Labels** — All buttons and interactive elements have descriptive labels
- **Keyboard Navigation** — Tab through elements, Enter/Space to select
- **Focus Rings** — Blue focus-visible rings on all interactive elements
- **Semantic HTML** — Grid roles, button semantics, proper heading hierarchy
- **Color + Indicators** — Never rely on color alone; dots + borders accompany all state changes
- **Reduced Motion** — All animations disabled when `prefers-reduced-motion` is active

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- (All modern evergreen browsers with ES2020+ support)

## Performance Tips

### Optimization Strategies
1. **DayCell is React.memo'd** — Only re-renders when its own props change
2. **gridDays is useMemo'd** — Grid recalculated only when year/month change
3. **notesMap is useMemo'd** — Note lookups optimized with Map data structure
4. **Zustand dispatch** — Store batches updates when possible

### Expected Metrics
- Lighthouse Performance: **90+**
- First Contentful Paint: **<1s**
- Interaction to Paint: **<100ms**
- Layout Shift: **0 (stable)**

## Component Behavior Reference

### WallCalendar
- Root orchestrator
- Manages Zustand store subscriptions
- Renders desktop or mobile layout based on responsive hooks

### CalendarGrid
- Memoized grid generation
- Handles day cell mapping
- Tracks selection and hover states

### NotesColumn
- Conditional rendering: ruled lines (idle) or textarea (editing)
- Tag pills with toggle logic
- Save button with keyboard shortcut (Cmd+Enter)

### DayCell
- Completely memoized (no unnecessary re-renders)
- Shows today dot, holiday dot, or note dot
- Handles click and hover for range selection

### MobileView
- Tab bar (Calendar | Notes)
- Renders appropriate content based on active tab
- Maintains same components as desktop, just in tabs

## Known Limitations & Future Enhancements

### Current Limitations
- Single-user, local notes only (no sync to cloud)
- No recurring events
- No event colors or custom categories beyond 4 tags
- No print layout optimization
- Fixed 6-row grid (could add compact mode for months with 5 rows)

### Potential Enhancements
1. **Cloud Sync** — Add Firebase/Supabase for multi-device notes
2. **Recurring Events** — Repeat patterns (daily, weekly, monthly)
3. **Custom Tags** — Allow users to create & name custom tags
4. **Themes** — Light/dark mode toggle, custom brand colors
5. **Export** — PDF export for printing
6. **Sharing** — Generate shareable calendar links
7. **Integrations** — Google Calendar, Outlook sync

## Troubleshooting

### Notes Not Persisting?
- Check browser console for localStorage errors
- Verify localStorage is enabled (not private/incognito mode)
- Check Development Tools > Application > Storage > Local Storage

### Animations Jittery?
- Ensure hardware acceleration is enabled
- Check `prefers-reduced-motion` isn't enabled
- Test on stable network (Unsplash images sometimes load slow)

### Date Selection Not Working?
- Ensure clicking on current month dates (other month dates are disabled)
- Check if `isAnimating` flag is preventing clicks (wait for transition)
- Verify Zustand store is initialized (check React DevTools)

### Mobile Layout Not Showing?
- Check viewport meta tag in `index.html`
- Verify Tailwind breakpoints are configured (tailwind.config.js)
- Test in browser DevTools mobile mode (Ctrl+Shift+M on Chrome)

## Contributing

To extend this component:

1. **Add a Feature** — Create component in `src/components/`
2. **Add State** — Update `src/store/calendarStore.js`
3. **Add Utility** — Add pure function to `src/utils/dateUtils.js`
4. **Test Memoization** — Profile with React DevTools to ensure no regress

## License

MIT — Use freely in personal or commercial projects

---


Built By Ayush Gupta  — Premium wall calendar component for the modern web.
