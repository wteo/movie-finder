const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "33c74cdf",
            s: searchTerm
        }
    });

    return response.data.Search;
};


const input = document.querySelector("input");


const onInput = async (event) => { 
    const movies = await fetchData(event.target.value); 
    // Because fetchData is an async func, need to add 'await' keyword. 
    // If not, promise will remain pending.
    console.log(movies);
    };

input.addEventListener("input", debounce(onInput, 500));
