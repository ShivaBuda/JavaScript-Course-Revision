"use strict";

// SELECT DOM ELEMENTS
// Header
const headerEl = document.querySelector(".header");

// Navigation
const navLinksEl = document.querySelector(".nav__links");
const btnScrollToEl = document.querySelector(".btn-more");
const navEl = document.querySelector(".nav");

// Features
const sectFeaturesEl = document.querySelector("#section-features");

// Operations
const operationTabsBoxEl = document.querySelector(".operations__tabs");
const operationsTabEls = document.querySelectorAll(".operations__tab");
const operationEls = document.querySelectorAll(".operation");

// #######################################################
// Sticky Navigation
const navHeight = navEl.getBoundingClientRect().height;
const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) navEl.classList.add("sticky");
    else navEl.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0,
    rootMargin: `${navHeight}px`,
});
headerObserver.observe(headerEl);

// Revealing sections
const allSecttions = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("section--hidden");
        observer.unobserve(entry.target);
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

allSecttions.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add("section--hidden");
});

// Lazy loading Image
const lazyImgTargets = document.querySelectorAll("img[data-src]");
const loading = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;

    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener("load", () => {
        entry.target.classList.remove("lazy-img");
    });
    observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loading, {
    root: null,
    threshold: 0,
    rootMargin: "200px",
});
lazyImgTargets.forEach((img) => imgObserver.observe(img));
// Navigation menu fading animation
const handleHoverOut = function (e) {
    if (e.target.classList.contains("nav__link")) {
        const linkEl = e.target;
        const siblingEls = linkEl
            .closest(".nav")
            .querySelectorAll(".nav__link");
        const logoEl = linkEl.closest(".nav").querySelector(".nav__logo");
        siblingEls.forEach((el) => {
            if (el !== linkEl) el.style.opacity = this;
        });
        logoEl.style.opacity = this;
    }
};

// Passing "argument" to event handler and only one parameter is passed.
navEl.addEventListener("mouseover", handleHoverOut.bind(0.5));
navEl.addEventListener("mouseout", handleHoverOut.bind(1));

// #######################################################
// Smooth Scrolling implementations
btnScrollToEl.addEventListener("click", (e) => {
    /*    const sectFeatCoords = sectFeaturesEl.getBoundingClientRect();
        window.scrollTo({
    // use scrollX and scrollY instead of pageXOffset and pageYOffset
             left: sectFeatCoords.left + window.scrollX,
             top: sectFeatCoords.top + window.scrollY,
         });*/

    sectFeaturesEl.scrollIntoView({
        behavior: "smooth",
    });
});

// Note -> Event Delegation technic
navLinksEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({behavior: "smooth"});
    }
});

// Tab component functions
operationTabsBoxEl.addEventListener("click", (e) => {
    e.preventDefault();
    const clickedEl = e.target.closest(".operations__tab");

    if (!clickedEl) return;
    operationsTabEls.forEach((tab) =>
        tab.classList.remove("operations__tab--active"),
    );
    operationEls.forEach((opEl) => opEl.classList.add("hidden"));

    //     Active tab
    clickedEl.classList.add("operations__tab--active");

    // Active operation
    document
        .querySelector(`.operation--${clickedEl.dataset.tab}`)
        .classList.remove("hidden");
});

// Slide
const slideEls = document.querySelectorAll(".slide");
const btnPrevEl = document.querySelector(".slide__prev");
const btnNextEl = document.querySelector(".slide__next");
const dotsBoxEl = document.querySelector(".dots");

let curSlide = 0;
const maxSlide = slideEls.length;
function createDots() {
    slideEls.forEach((_, i) => {
        dotsBoxEl.insertAdjacentHTML(
            "beforeend",
            `<button class="dots__btn" data-slide = "${i}"></button>`,
        );
    });
}

createDots();

function activeDot(slide) {
    document
        .querySelectorAll(".dots__btn")
        .forEach((dot) => dot.classList.remove("dots__btn--active"));

    document
        .querySelector(`.dots__btn[data-slide = "${slide}"]`)
        .classList.add("dots__btn--active");
}

function showSlide(curSlide) {
    slideEls.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
    });
}

// Initial slide show
showSlide(curSlide);
activeDot(0);

// Function Next Slide
function nextSlide() {
    if (curSlide === maxSlide - 1) {
        curSlide = 0;
    } else {
        curSlide++;
    }
    showSlide(curSlide);
    activeDot(curSlide);
}

// Function Previous Slide
function prevSlide() {
    if (curSlide === 0) {
        curSlide = maxSlide - 1;
    } else {
        curSlide--;
    }
    showSlide(curSlide);
    activeDot(curSlide);
}

btnNextEl.addEventListener("click", nextSlide);
btnPrevEl.addEventListener("click", prevSlide);

// Change slide with Arrow Key
document.addEventListener(
    "keydown",
    (e) => e.key === "ArrowLeft" && prevSlide(),
);

document.addEventListener(
    "keydown",
    (e) => e.key === "ArrowRight" && nextSlide(),
);

// Changing slide width dot button
dotsBoxEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("dots__btn")) {
        curSlide = Number(e.target.dataset.slide);
        showSlide(curSlide);
        activeDot(curSlide);
    }
});
