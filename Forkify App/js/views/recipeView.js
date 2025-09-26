// import { Fraction } from "fractional"

class RecipeView {
    #parentEl = document.querySelector(".recipe");
    #errorMessage =
        "We could not find the recipe. Please try again with another one!";
    #message = "";
    #data;
    render(data) {
        this.#data = data;
        const markup = this.#generateMarkup();

        this.#clearEl();
        this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    #clearEl() {
        this.#parentEl.innerHTML = "";
    }

    renderSpinner() {
        const html = `
        <div class="spinner">
            <svg>
                <use href="./img/icons.svg#icon-spinner3"></use>
            </svg>
        </div>
        `;
        this.#clearEl();
        this.#parentEl.insertAdjacentHTML("afterbegin", html);
    }

    renderError(message = this.#errorMessage) {
        const markup = `
     <div class="error">
            <div>
              <svg class="error__icon">
                <use href="./img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}!</p>
     </div>`;
        this.#clearEl();
        this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    renderMessage(message = this.#message) {
        const markup = `
     <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}!</p>
     </div>`;
        this.#clearEl();
        this.#parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    addHandlerRender(handler) {
        ["hashchange", "load"].forEach((event) =>
            window.addEventListener(event, handler),
        );
    }

    #generateMarkup() {
        return `
                    <figure class="recipe__figure">
                        <img
                            src="${this.#data.image}"
                            alt="${this.#data.title}"
                            class="recipe__img" />
                        <h1 class="recipe__title">
                            <span>${this.#data.title}</span>
                        </h1>
                    </figure>

                    <div class="recipe__details">
                        <div class="recipe__info">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-clock"></use>
                            </svg>
                            <span class="recipe__info-num">${
                                this.#data.cookingTime
                            }</span>
                            <span class="recipe__info-txt">minutes</span>
                        </div>

                        <div class="recipe__info">
                            <svg class="recipe--icon">
                                <use href="./img/icons.svg#icon-users"></use>
                            </svg>
                            <span class="recipe__info-num">${
                                this.#data.servings
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
                        ${this.#data.ingredients
                            .map(this.#generateIngredientMarkup)
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
                                this.#data.publisher
                            }</span>
                            . For full instructions and tips, please check out
                            directions at their official website.
                        </p>
                        <a
                            href="${this.#data.sourceUrl}"
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

    #generateIngredientMarkup(ingred) {
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
