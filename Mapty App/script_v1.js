"use strict";
// Select DOM elements
const formEl = document.querySelector(".form");
const inputDistanceEl = document.querySelector(".form__input--distance");
const inputTypeEl = document.querySelector(".form__input--type");
const inputDurationEl = document.querySelector(".form__input--duration");
const inputCadenceEl = document.querySelector(".form__input--cadence");
const inputElevationEl = document.querySelector(".form__input--elevation");

let map, mapEvent;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const {longitude} = position.coords;
            const {latitude} = position.coords;
            const coords = [latitude, longitude];
            map = L.map("map").setView(coords, 13);

            L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(map);

            // Handling click on map
            map.on("click", (mapE) => {
                mapEvent = mapE;
                formEl.classList.remove("hidden");
                inputDistanceEl.focus();
            });
        },
        function () {
            alert("Could not get your location!");
        },
    );
}

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    inputCadenceEl.value = inputDistanceEl.value = inputDurationEl.value = " ";
    const {lat, lng} = mapEvent.latlng;

    // To display marker on map
    L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: "running-popup",
            }),
        )
        .setPopupContent("Workout")
        .openPopup();
});

inputTypeEl.addEventListener("change", () => {
    inputElevationEl
        .closest(".form__row")
        .classList.toggle("form__row--hidden");
    inputCadenceEl.closest(".form__row").classList.toggle("form__row--hidden");
});
