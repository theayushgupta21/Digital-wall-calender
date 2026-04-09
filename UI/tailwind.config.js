const { fontFamily } = require('tailwindcss/defaultTheme')

module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                bebas: ['"Bebas Neue"', ...fontFamily.sans],
                inter: ['"Inter"', ...fontFamily.sans],
                script: ['"Dancing Script"', 'cursive'],
                sans: ['"Inter"', ...fontFamily.sans],
            },
            colors: {
                accent: {
                    DEFAULT: '#1B6CA8',
                    light: '#2E86C1',
                    dark: '#154E7A',
                    bg: '#D6EAF8',
                    xlight: '#EBF4FB',
                },
            },
            keyframes: {
                slideIn: {
                    from: { opacity: '0', transform: 'translateY(8px) rotateX(8deg)' },
                    to: { opacity: '1', transform: 'translateY(0) rotateX(0)' },
                },
                noteIn: {
                    from: { opacity: '0', transform: 'translateX(-8px)' },
                    to: { opacity: '1', transform: 'translateX(0)' },
                },
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
            },
            animation: {
                'slide-in': 'slideIn 0.35s ease-in-out',
                'note-in': 'noteIn 0.25s ease',
                'fade-in': 'fadeIn 0.2s ease',
            },
        },
    },
    plugins: [],
}
