module.exports = {
    theme: {
        extend: {}
    },
    variants: {},
    plugins: [
        function({ addUtilities }) {
            const newUtilities = {
                '.center-v': {
                    top: '50%',
                    transform: 'translate(0, -50%)'
                }
            }
            
            addUtilities(newUtilities);
        }
    ]
}
