const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "33c74cdf",
            s: searchTerm // axios allows you to include parameters in the second argument. instead of extension 
            // If using the fetch method, you'll need to include the direct URL via "?[keyObject]=[value]&". 
            // i.e http://www.omdbapi.com/?apikey=33c74cdf&s=avenger
            // At developer tool of Browser, find the URL by via Network > Fetch/XHR > fetched parameter > Header.
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
            // apply, calls function & takes all arguments & pass them as separate arguments to original function. 
            delay);
    }; // this function will be acting as the shield. a.k.a wrapper
}

const onInput = (event) => {
    fetchData(event.target.value);
    };

input.addEventListener("input", debounce(onInput, 500));