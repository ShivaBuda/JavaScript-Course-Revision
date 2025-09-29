import View from "./view.js";

class paginationView extends View {
    _parentEl = document.querySelector(".pagination");

    addHandlerClick(handler) {
        this._parentEl.addEventListener("click", (e) => {
            const btn = e.target.closest(".btn--pagination");
            if(!btn) return

            const goToPage = +btn.dataset.goto

            handler(goToPage)
        });
    }
    _generateMarkup() {
        const currPage = this._data.page;
        const numOfPages = Math.ceil(
            this._data.results.length / this._data.resultsPerPage,
        );

        // if more than 1 page
        if (currPage === 1 && numOfPages > 1) {
            return `
                    <button data-goto= "${currPage + 1}" class="pagination__btn-next btn--pagination">
                            <span>Page ${currPage + 1}</span>
                            <svg>
                                <use
                                    href="./img/icons.svg#icon-arrow-right"></use>
                            </svg>
                        </button>`;
        }

        // If it is last page
        if (currPage === numOfPages && numOfPages > 1) {
            return `
                    <button data-goto= "${currPage - 1}"class="pagination__btn-prev                    btn--pagination">
                        <svg>
                            <use
                                href="./img/icons.svg#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currPage - 1}</span>
                    </button>`;
        }

        // For other pages
        if (currPage < numOfPages) {
            return `
            <button data-goto= "${currPage - 1}"class="pagination__btn-prev                    btn--pagination">
                        <svg>
                            <use
                                href="./img/icons.svg#icon-arrow-left"></use>
                        </svg>
                        <span>Page ${currPage - 1}</span>
                    </button>

             <button data-goto= "${currPage + 1}" class="pagination__btn-next btn--pagination">
                <span>Page ${currPage + 1}</span>
                <svg>
                    <use
                        href="./img/icons.svg#icon-arrow-right"></use>
                </svg>
            </button>`;
        }

        // if only one page;
        return "";
    }
}

export default new paginationView();
