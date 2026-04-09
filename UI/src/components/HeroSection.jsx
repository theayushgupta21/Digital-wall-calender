import DiagonalAccent from './DiagonalAccent'
import { MONTHS, MONTH_IMAGES } from '../utils/constants'

export default function HeroSection({ month, year }) {
    const monthImage = MONTH_IMAGES[month]
    const monthName = MONTHS[month]

    return (
        <section
            className="relative overflow-hidden"
            style={{ height: '45%', minHeight: '220px' }}
        >
            {/* Background photo */}
            <img
                src={monthImage}
                className="absolute inset-0 w-full h-full object-cover"
                alt={monthName}
            />

            {/* Subtle dark overlay for text readability */}
            <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45) 100%)' }}
            />

            {/* Diagonal blue accent shape */}
            <DiagonalAccent color="#1B6CA8" />

            {/* Month + Year text — bottom right, over diagonal */}
            <div className="absolute bottom-4 right-6 text-right z-10">
                <p className="text-white/80 text-sm font-inter tracking-[0.2em] uppercase">{year}</p>
                <h1 className="font-bebas text-6xl text-white leading-none tracking-wide">{monthName}</h1>
            </div>
        </section>
    )
}
