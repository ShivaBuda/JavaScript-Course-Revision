class SearchView {
    #parentEl = document.querySelector(".preview__itms");

    getQuery() {
        const query = this.#parentEl.querySelector(".search_input").value;
        this.#clearInput();
        return query;
    }
    #clearInput() {
        this.#parentEl.querySelector(".search__input").value = "";
    }

    addHandlerSearch(handler) {
        this.#parentEl.addEventListener("submit", (e) => {
            e.preventDefault();
            handler();
        });
    }
}

export default new SearchView();
