const withMT = require('@material-tailwind/react/utils/withMT');
const aspectRatio = require('@tailwindcss/aspect-ratio');

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
        './node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            screens: { xs: '425px' },
            keyframes: {
                'bg-grow': {
                    '0%': { transform: 'scale(0.8)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
            },
            animation: {
                'bg-grow': 'bg-grow 0.3s ease-in-out',
            },
        },
    },
    plugins: [withMT, aspectRatio],
};
