// import "core-js/actual"; // polyfilling for everything else

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultView from "./views/resultView.js";

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
    } catch (error) {}
};

const init = function () {
    recipeView.addHandlerRender(controlShowRecipe);
    searchView.addHandlerSearch(controlSearchResults);
};

init();
