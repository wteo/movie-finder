const fetchData = async (searchTerm) => {
    const response = await axios.get("http://www.omdbapi.com/", {
        params: {
            apikey: "33c74cdf",
            s: searchTerm // axios allows you to include parameters in the second argument. instead of extension 
            // If using thefetch method, you'll need to include the direct URL via "?[keyObject]=[value]&". 
            // i.e http://www.omdbapi.com/?apikey=33c74cdf&s=avenger
            // At developer tool of Browser, find the URL by via Network > Fetch/XHR > fetched parameter > Header.
        }
    });

    console.log(response.data)
};

const input = document.querySelector("input");

/*
input.addEventListener("input", (event) => {
    fetchData(event.target.value); // this logs a new search every time a new key is pressed. 
    // Not sufficient way of handling search as API only limits user to conduct 1000 searches per day.
    // To overcome this issue, we set a timeout function.
})
*/


let timeoutId;
const onInput = (event) => {
    if (timeoutId) {
        clearTimeout(timeoutId);// first key press will skip this code. 
        //On second press, statement will stop the current timer and reset to a new one.
        // Process will happen over and over until a full second is called on the Timeout.
    } 
    timeoutId = setTimeout(() => {
        fetchData(event.target.value);
    }, 1000);
};

input.addEventListener("input", onInput);