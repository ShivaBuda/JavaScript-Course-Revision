export default class View {
    _data;
    render(data) {
        if (!data || (Array.isArray(data) && data.length === 0))
            return this.renderError();
        this._data = data;
        const markup = this._generateMarkup();

        this._clearEl();
        this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    // TO UPDATE ONLY CHANGED CONTENTS WHILE CHANGING SERVINGS QUANTITY
    update(data) {
        // if (!data || (Array.isArray(data) && data.length === 0))
        //     return this.renderError();
        this._data = data;
        const newMarkup = this._generateMarkup();

        const newDOM = document
            .createRange()
            .createContextualFragment(newMarkup);
        const newElements = Array.from(newDOM.querySelectorAll("*"));
        const curElements = Array.from(this._parentEl.querySelectorAll("*"));

        newElements.forEach((newEl, i) => {
            const currEl = curElements[i];

            // Update changed TEXT
            if (
                !newEl.isEqualNode(currEl) &&
                newEl.firstChild?.nodeValue.trim() !== ""
            ) {
                currEl.textContent = newEl.textContent;
            }

            // Updates changed Attributes
            if (!newEl.isEqualNode(currEl))
                Array.from(newEl.attributes).forEach((attri) =>
                    currEl.setAttribute(attri.name, attri.value),
                );
        });
    }

    _clearEl() {
        this._parentEl.innerHTML = "";
    }

    renderSpinner() {
        const html = `
        <div class="spinner">
            <svg>
                <use href="./img/icons.svg#icon-spinner3"></use>
            </svg>
        </div>
        `;
        this._clearEl();
        this._parentEl.insertAdjacentHTML("afterbegin", html);
    }

    renderError(message = this._errorMessage) {
        const markup = `
     <div class="error">
            <div>
              <svg class="error__icon">
                <use href="./img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}!</p>
     </div>`;
        this._clearEl();
        this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }

    renderMessage(message = this._message) {
        const markup = `
     <div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
              </svg>
            </div>
            <p>${message}!</p>
     </div>`;
        this._clearEl();
        this._parentEl.insertAdjacentHTML("afterbegin", markup);
    }
}
