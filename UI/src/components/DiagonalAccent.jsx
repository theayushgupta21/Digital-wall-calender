export default function DiagonalAccent({ color = '#1B6CA8' }) {
    return (
        <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 500 300"
            preserveAspectRatio="none"
            style={{ zIndex: 1 }}
        >
            <polygon points="0,180 0,300 280,300 340,180" fill={color} opacity="0.88" />
        </svg>
    )
}
