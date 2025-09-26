// import "core-js/actual"; // polyfilling for everything else
// import "regenerator-runtime/runtime.js"; // polyfilling for async wait
const recipeContainerEl = document.querySelector(".recipe");

const timeOut = (second) => {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error(`Request time out. Please try again!`));
        }, second * 1000);
    });
};

const id = "664c8f193e7aa067e94e8297";
const renderSpinner = function (parentEl) {
    const html = `
    <div class="spinner">
        <svg>
            <use href="./img/icons.svg#icon-spinner3"></use>
        </svg>
    </div>
    `;
    parentEl.innerHTML = "";
    parentEl.insertAdjacentHTML("afterbegin", html);
};

const showRecipe = async () => {
    try {
        const id = window.location.hash.slice(1);
        if (!id) return;

        // LOADING SPINNER
        renderSpinner(recipeContainerEl);
        // FETCHING RECIPE
        const res = await fetch(
            `https://forkify-api.jonas.io/api/v2/recipes/${id}`,
        );
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);

        let {recipe} = data.data;
        recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };

        console.log(recipe);

        const markup = `
                    <figure class="recipe__figure">
                        <img
                            src="${recipe.image}"
                            alt="${recipe.title}"
                            class="recipe__img" />
                        <h1 class="recipe__title">
                            <span>${recipe.title}</span>
                        </h1>
                    </figure>

                    <div class="recipe__details">
                        <div class="recipe__info">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-clock"></use>
                            </svg>
                            <span class="recipe__info-num">${
                                recipe.cookingTime
                            }</span>
                            <span class="recipe__info-txt">minutes</span>
                        </div>

                        <div class="recipe__info">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-users"></use>
                            </svg>
                            <span class="recipe__info-num">${
                                recipe.servings
                            }</span>
                            <span class="recipe__info-txt"> servings </span>
                        </div>

                        <div class="recipe__info-btns">
                            <button class="btn-sm btn--adjust-servings">
                                <svg class="recipe--icon">
                                    <use
                                        href="./img/icons.svg#icon-minus-circle"></use>
                                </svg>
                            </button>
                            <button class="btn-sm btn--adjust-servings">
                                <svg class="recipe--icon">
                                    <use
                                        href="./img/icons.svg#icon-plus-circle"></use>
                                </svg>
                            </button>
                        </div>

                        <div class="recipe__user-icon">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-user"></use>
                            </svg>
                        </div>
                        <div class="recipe__bookmark-btn">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-bookmark"></use>
                            </svg>
                        </div>
                    </div>
                    <!--  INGREDIENTS -->
                    <div class="recipe__ingredients">
                        <h2 class="heading-2">Recipe ingredients</h2>

                        <ul class="recipe__ingredients-list">
                        ${recipe.ingredients
                            .map((ingred) => {
                                return `<li class="recipe__ingredients-itm">
                                <svg
                                    class="recipe__ingredients-icon recipe--icon">
                                    <use
                                        href="./img/icons.svg#icon-check"></use>
                                </svg>
                                <p class="recipe__quantity">${ingred.quantity}</p>
                                <p class="recipe__description">
                                    <span class="recipe__unit">${ingred.unit}</span>
                                    ${ingred.description}
                                </p>
                            </li>`;
                            })
                            .join("")}
                            
                            <li class="recipe__ingredients-itm">
                                <svg class="recipe--icon">
                                    <use
                                        href="./img/icons.svg#icon-check"></use>
                                </svg>
                                <p class="recipe__quantity">100</p>
                                <p class="recipe__description">
                                    <span class="recipe__unit">g</span>
                                    dry pasta
                                </p>
                            </li>
                        </ul>
                    </div>
                     <!-- RECIPE DIRECTION -->
                    <div class="recipe__directions">
                        <h2 class="heading-2">How to cook it</h2>
                        <p class="recipe__directions-txt">
                            This recipe was carefully designed and tested by
                            <span class="recipe__publisher">${
                                recipe.publisher
                            }</span>
                            . For full instructions and tips, please check out
                            directions at their official website.
                        </p>
                        <a
                            href="${recipe.sourceUrl}"
                            target="_blank"
                            class="recipe__btn">
                            <span>Directions</span>
                            <svg class="recipe__btn-icon">
                                <use
                                    href="./img/icons.svg#icon-arrow-right"></use>
                            </svg>
                        </a>
                    </div>`;
        recipeContainerEl.innerHTML = "";
        recipeContainerEl.insertAdjacentHTML("afterbegin", markup);
    } catch (error) {
        console.log(error);
    }
};

["hashchange", "load"].forEach((event) =>
    window.addEventListener(event, showRecipe),
);
