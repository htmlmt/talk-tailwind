module.exports = {
    theme: {
        extend: {}
    },
    variants: {},
    plugins: [
        function({ addUtilities }) {
            const newUtilities = {
                '.top-50': {
                    top: '50%'
                }
            }
            
            addUtilities(newUtilities);
        }
    ]
}
