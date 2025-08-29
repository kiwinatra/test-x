     
let devToolsOpened = false;

Object.defineProperty(window, 'devtools', {
    get: function() {
        if(!devToolsOpened) {
            devToolsOpened = true;
            alert('Использование инструментов разработчика запрещено!');
        }
        return true;
    }
});


let width = window.outerWidth - window.innerWidth;
let height = window.outerHeight - window.innerHeight;
setInterval(() => {
    if(width !== window.outerWidth - window.innerWidth || 
       height !== window.outerHeight - window.innerHeight) {
        
        alert('Пожалуйста, закройте инструменты разработчика');
    }
}, 1000);