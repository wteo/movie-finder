const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "33c74cdf",
            s: searchTerm
        }
    });

    console.log(response.data)
};


const input = document.querySelector("input");

const debounce = (callback, delay) => {
    let timeoutId;
    return (...arguments) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            callback.apply(null, arguments)}, 
            // "apply" calls function & takes all arguments & pass them as separate arguments to original function. 
            delay);
    }; // this acts as the shield. a.k.a wrapper that only allows the last input by user after the set time is up. 
} // Refactored the timeout function in the case we want to recall its use more than once.

const onInput = (event) => {
    fetchData(event.target.value);
    };

input.addEventListener("input", debounce(onInput, 500));