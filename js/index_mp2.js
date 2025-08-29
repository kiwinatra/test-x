document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener('keydown', (e) => {

    if(e.key === 'F12') {
        e.preventDefault();
        return false;
    }

    if(e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }

    if(e.ctrlKey && e.key === 'U') {
        e.preventDefault();
        return false;
    }
});

document.addEventListener('selectstart', (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener('dragstart', (e) => {
    e.preventDefault();
    return false;
});

document.addEventListener('copy', (e) => {
    e.preventDefault();
    return false;
});

setInterval(() => {
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    }
    console.log('%c', devtools);
}, 1000);