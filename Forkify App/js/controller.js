// import "core-js/actual"; // polyfilling for everything else

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

const controllShowRecipe = async () => {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        recipeView.renderSpinner();
        //FETCHING RECIPE DATA
        await model.getRecipeData(id);

        // LOADING SPINNER
        recipeView.renderSpinner();

        //RENDER RECIPE
        recipeView.render(model.state.recipe);
    } catch (error) {
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        //  RENDER SPINNER
        recipeView.renderSpinner();

        // GET SEARCH QUERY
        const query = searchView.getQuery()
        if(!query) return;

        // LOAD SEARCH RESULTS
        await model.getSearchResults(query);
        console.log(query);
    } catch (error) {}
};

const init = function () {
    recipeView.addHandlerRender(controllShowRecipe);
    searchView.addHandlerSearch(controlSearchResults)
};

init();
