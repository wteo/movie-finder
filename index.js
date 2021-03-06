const autoCompleteConfig = {
    renderOption (movie) {
        const imgSrc = movie.Poster === "N/A" ? "" : movie.Poster;
        return `
            <img src="${imgSrc}" />
            ${movie.Title} (${movie.Year})
        `;
    },
    inputValue (movie) {
        return movie.Title;
    },
    async fetchData (searchTerm) {
        const response = await axios.get("https://www.omdbapi.com/", {
            params: {
                apikey: "33c74cdf",
                s: searchTerm
            }
        });
    
        if (response.data.Error) {
            return [];
        }
        return response.data.Search;
    }
};

createAutoComplete({
    ...autoCompleteConfig,
    root        : document.querySelector("#left-autocomplete"),
    onOptionSelect (movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#left-summary"), "left");
    },
});
createAutoComplete({
    ...autoCompleteConfig,
    root        : document.querySelector("#right-autocomplete"),
    onOptionSelect (movie) {
        document.querySelector(".tutorial").classList.add("is-hidden");
        onMovieSelect(movie, document.querySelector("#right-summary"), "right");
    },
});

let leftMovie; // acts as store of comparison for selected movie
let rightMovie; // acts as store of comparison for selected movie

const onMovieSelect = async (movie, summaryElement, side) => {
    const response = await axios.get("https://www.omdbapi.com/", {
        params: {
            apikey  : "33c74cdf",
            i       : movie.imdbID 
        }
    });
    summaryElement.innerHTML = movieTemplate(response.data);

    if (side==="left") {
        leftMovie = response.data;
    } else {
        rightMovie = response.data;
    }

    if (leftMovie && rightMovie) // this is to check if both leftMovie and rightMovie variables were defined 
    {
        runComparison();
    }
};

const runComparison = () => {
    const leftSideStats = document.querySelectorAll("#left-summary .notification");
    const rightSideStats = document.querySelectorAll("#right-summary .notification");

    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftSideValue = Number(leftStat.dataset.value);
        const rightSideValue = Number(rightStat.dataset.value);

        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove("is-primary");
            leftStat.classList.add("is-warning");
        } else {
            rightStat.classList.remove("is-primary");
            rightStat.classList.add("is-warning");
        }
    })
};

const movieTemplate = (movieDetail) => {
    const dollars = Number(movieDetail.BoxOffice.replace(/\$/g, "").replace(/,/g,""));
    const metascore = Number(movieDetail.Metascore);
    const imdbRating = Number(movieDetail.imdbRating).toFixed();
    const imdbVotes = Number(movieDetail.imdbVotes.replace(/,/g,""));
    
    
    let count = 0;
    const awards = movieDetail.Awards.split(" ").reduce((prev, word) => {
        const value = Number(word);

        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}" />
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        
        <article data-value=${awards} class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article data-value=${dollars} class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article data-value=${metascore} class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article data-value=${imdbRating} class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article data-value=${imdbVotes} class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;    
};
console.log("Hello World!");