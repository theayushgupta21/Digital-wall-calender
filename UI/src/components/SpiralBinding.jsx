import { useCalendarStore } from '../store/calendarStore'

export default function SpiralBinding() {
    const { darkMode } = useCalendarStore()
    const COIL_COUNT = 18

    return (
        <div
            className="relative flex items-center justify-around px-4 py-0 overflow-hidden transition-colors duration-300"
            style={{
                height: '32px',
                background: darkMode ? '#3A3A3A' : '#F0EDE8',
                borderBottom: `1px solid ${darkMode ? '#555555' : '#DDD8D0'}`,
            }}
        >
            {/* Horizontal bar behind coils */}
            <div
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[4px] transition-all duration-300"
                style={{
                    background: darkMode
                        ? 'linear-gradient(to bottom, #555555, #444444)'
                        : 'linear-gradient(to bottom, #C8C0B8, #A8A09A)',
                }}
            />

            {Array.from({ length: COIL_COUNT }).map((_, i) => (
                <div key={i} className="relative flex flex-col items-center justify-center z-10">
                    {/* Top half of ring */}
                    <div
                        style={{
                            width: '14px',
                            height: '10px',
                            borderRadius: '7px 7px 0 0',
                            border: `2px solid ${darkMode ? '#666666' : '#9A9288'}`,
                            borderBottom: 'none',
                            background: darkMode
                                ? 'linear-gradient(135deg, #555555 0%, #444444 100%)'
                                : 'linear-gradient(135deg, #D4CEC8 0%, #A8A29C 100%)',
                        }}
                    />
                    {/* Bottom half of ring */}
                    <div
                        style={{
                            width: '14px',
                            height: '10px',
                            borderRadius: '0 0 7px 7px',
                            border: `2px solid ${darkMode ? '#666666' : '#9A9288'}`,
                            borderTop: 'none',
                            background: darkMode
                                ? 'linear-gradient(135deg, #444444 0%, #333333 100%)'
                                : 'linear-gradient(135deg, #B8B2AC 0%, #8A8480 100%)',
                            marginTop: '-1px',
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
