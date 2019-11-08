module.exports = {
    plugins: [
        function({ addUtilities }) {
            const newUtilities = {
                '.transition-background-color': {
                    transitionDuration: '0.25s',
                    transitionProperty: 'background-color'
                }
            }
            
            addUtilities(newUtilities);
        }
    ]
}
