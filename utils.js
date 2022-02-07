const debounce = (callback, delay) => {
    let timeoutId;
    return (...arguments) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, arguments)
        }, delay);
    }; 
} 
