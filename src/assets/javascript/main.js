var mainNavigation;
var newNavigationClass;

document.addEventListener('DOMContentLoaded', function() {
    mainNavigation = document.getElementById('mainNavigation');
});

document.addEventListener('click', toggleMenu);

function toggleMenu(event) {
    var element = event.target;
    if (element.getAttribute('id') === 'openMenu') {
        newNavigationClass = mainNavigation.getAttribute('class').replace('hidden', 'block');
        mainNavigation.setAttribute('class', newNavigationClass);
    }
    
    if (element.getAttribute('id') === 'closeMenu') {
        newNavigationClass = mainNavigation.getAttribute('class').replace('block', 'hidden');
        mainNavigation.setAttribute('class', newNavigationClass);
    }
}
