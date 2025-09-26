// import "core-js/actual"; // polyfilling for everything else

import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

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
        recipeView.renderError()
    }
};

const init = function () {
    recipeView.addHandlerRender(controllShowRecipe);
};

init();
