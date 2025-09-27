import View from "./view.js";
class ResultView extends View {
    _parentEl = document.querySelector(".preview__itms");
     _errorMessage =
        "We could not find the recipe. Please try again with another one!";

    _generateMarkup() {
        return this._data.map(this._generateMarkupPreview).join("");
    }

    _generateMarkupPreview(result) {
        return `<li class="preview__itm">
                    <a href="#${result.id}" class="preview__link">
                         <figure class="preview__fig">
                              <img src="${result.image}" alt="${result.title}">

                         </figure>
                         <div class="preview__info">
                              <h3 class="preview__title">${result.title}</h3>
                              <p class="preview__publisher">${result.publisher}</p>
                         </div>
                    </a>
                </li>`;
    }
}

export default new ResultView();


// <div class="preview__user-icon">
                              // <svg>
                              //      <use href="./img/icons.svg#icon-user"></use>
                              // </svg>
                              // </div>