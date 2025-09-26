// import "regenerator-runtime/runtime.js"; // polyfilling for async wait
import {API_URL} from "./config.js";
import {getJSON} from "./views/helpers.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
    },
};

export const getRecipeData = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        const {recipe} = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

        console.log(state.recipe);
    } catch (error) {
        throw error;
    }
};

// GET SEARCH RESULT DATA
export const getSearchResults = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);

        console.log(data);

        state.search.results = data.data.recipes.map((recipe) => {
            return {
                id: recipe.id,
                title: recipe.title,
                publishser: recipe.publisher,
                image: recipe.image_url,
            };
        });

        console.log(state.search.results);
        return data;
    } catch (error) {
        throw error;
    }
};

getSearchResults("pizza");
