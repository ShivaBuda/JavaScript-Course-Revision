// import "core-js/actual"; // polyfilling for everything else

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";
import paginationView from "./views/paginationView.js";


// if (module.hot) {
//     module.hot.accept();
// }

const controlShowRecipe = async () => {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;
        console.log(id);

        // LOADING SPINNER
        recipeView.renderSpinner();

        //FETCHING RECIPE DATA
        await model.getRecipeData(id);

        //RENDER RECIPE
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        //  RENDER SPINNER
        resultView.renderSpinner();

        // GET SEARCH QUERY
        const query = searchView.getQuery();
        if (!query) return;

        // LOAD SEARCH RESULTS
        await model.getSearchResults(query);

        // RENDER RESULTS
        // resultView.render(model.state.search.results);
        resultView.render(model.getSearchResultsPage(1));

        // RENDER INITIAL PAGINATION BUTTONS
      paginationView.render(model.state.search)
    } catch (error) {}
};

const controlPagination = function(goToPage){
    // RENDER NEW RESULTS
    resultView.render(model.getSearchResultsPage(goToPage))

    // RENDER NEW PAGINATION BUTTONS
    paginationView.render(model.state.search)
}

const controlServings = ()=>{
    // UPDATE THE RECIPE SERVINGS (IN STATE)
    model.updateServings(6)

    // Update the recipe view
}

const init = function () {
    recipeView.addHandlerRender(controlShowRecipe);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination)
};

init();
