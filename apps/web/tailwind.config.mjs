/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}", // Next.js App Router라면 필수
        "./app/**/*.tsx", // Next.js App Router라면 필수
        "./src/**/*.tsx",
    ],
    theme: {
        extend: {
            keyframes: {
                floatingLeft: {
                    '0%, 100%': { transform: 'translateX(0) translateY(0) scale(1)' },
                    '50%': { transform: 'translateX(30px) translateY(-100px) scale(1.05)' },
                },
                floatingRight: {
                    '0%, 100%': { transform: 'translateY(-100px) scale(1)' },
                    '50%': { transform: 'translateY(0px) scale(1.05)' },
                }
            },
            animation: {
                'floating-left': 'floatingLeft 6s ease-in-out infinite',
                'floating-right': 'floatingRight 6s ease-in-out infinite',
            }
        },
    },
}