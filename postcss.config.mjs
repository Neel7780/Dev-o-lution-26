/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        // Tailwind PostCSS plugin moved to a separate package in recent Tailwind versions
        '@tailwindcss/postcss': {},
    },
};

export default config;