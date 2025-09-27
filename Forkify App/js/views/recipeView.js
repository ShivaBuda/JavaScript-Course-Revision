// import { Fraction } from "fractional"
import View from "./view.js";

class RecipeView extends View {
    _parentEl = document.querySelector(".recipe");
    _errorMessage =
        "We could not find the recipe. Please try again with another one!";
    _message = "";

    addHandlerRender(handler) {
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handler),
        );
    }

    _generateMarkup() {
        return `
                    <figure class="recipe__figure">
                        <img
                            src="${this._data.image}"
                            alt="${this._data.title}"
                            class="recipe__img" />
                        <h1 class="recipe__title">
                            <span>${this._data.title}</span>
                        </h1>
                    </figure>

                    <div class="recipe__details">
                        <div class="recipe__info">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-clock"></use>
                            </svg>
                            <span class="recipe__info-num">${
                                this._data.cookingTime
                            }</span>
                            <span class="recipe__info-txt">minutes</span>
                        </div>

                        <div class="recipe__info">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-users"></use>
                            </svg>
                            <span class="recipe__info-num">${
                                this._data.servings
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
                        ${this._data.ingredients
                            .map(this._generateIngredientMarkup)
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
                                this._data.publisher
                            }</span>
                            . For full instructions and tips, please check out
                            directions at their official website.
                        </p>
                        <a
                            href="${this._data.sourceUrl}"
                            target="_blank"
                            class="recipe__btn">
                            <span>Directions</span>
                            <svg class="recipe__btn-icon">
                                <use
                                    href="./img/icons.svg#icon-arrow-right"></use>
                            </svg>
                        </a>
                    </div>`;
    }

    _generateIngredientMarkup(ingred) {
        return `<li class="recipe__ingredients-itm">
                    <svg
                         class="recipe__ingredients-icon recipe--icon">
                         <use
                         href="./img/icons.svg#icon-check"></use>
                    </svg>
                    <p class="recipe__quantity">${
                        ingred.quantity ? ingred.quantity : ""
                    }</p>
                    <p class="recipe__description">
                         <span class="recipe__unit">${ingred.unit}</span>
                         ${ingred.description}
                    </p>
                </li>`;
    }
}

export default new RecipeView();
