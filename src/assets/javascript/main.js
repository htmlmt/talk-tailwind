var mainNavigation;
var navigationTop;
var newNavigationClass;

document.addEventListener('DOMContentLoaded', function() {
    mainNavigation = document.getElementById('mainNavigation');
    navigationTop = mainNavigation.offsetTop;
    
    stickyNavigation();
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

document.addEventListener('scroll', stickyNavigation);

function stickyNavigation() {
    if (window.innerWidth >= 768) {
        var scrollPosition = window.scrollY;
        
        if (scrollPosition > navigationTop) {
            if (mainNavigation.getAttribute('class').includes('md:static')) {
                newNavigationClass = mainNavigation.getAttribute('class').replace('md:static', 'md:fixed pt-12');
                
                mainNavigation.setAttribute('style', 'width: ' + mainNavigation.offsetWidth + 'px');
                
                mainNavigation.setAttribute('class', newNavigationClass);
            }
        } else {
            if (mainNavigation.getAttribute('class').includes('md:fixed')) {
                newNavigationClass = mainNavigation.getAttribute('class').replace('md:fixed pt-12', 'md:static');
                
                mainNavigation.setAttribute('style', 'width: 100%;');
                
                mainNavigation.setAttribute('class', newNavigationClass);
            }
        }
    }
}

window.onresize = resizeStickyNavigation;

function resizeStickyNavigation() {
    navigationTop = mainNavigation.offsetTop;
    
    if (mainNavigation.getAttribute('class').includes('md:fixed')) {
        mainNavigation.setAttribute('style', 'width: ' + mainNavigation.parentNode.offsetWidth + 'px');
    } else {
        mainNavigation.setAttribute('style', 'width: 100%;');
    }
}
