"use strict";

const formEl = document.querySelector(".form");
const inputDistanceEl = document.querySelector(".form__input--distance");
const inputTypeEl = document.querySelector(".form__input--type");
const inputDurationEl = document.querySelector(".form__input--duration");
const inputCadenceEl = document.querySelector(".form__input--cadence");
const inputElevationEl = document.querySelector(".form__input--elevation");
const workoutContainerEl = document.querySelector(".workouts");

class Workout {
    date = new Date();
    id = (Date.now() + "").slice(-10); // Note-> will replace with library to generate unique ids
    constructor(coords, distance, duration) {
        this.coords = coords; // [lat, lng]
        this.distance = distance; // in km
        this.duration = duration; // in min
    }

    _getDescription() {
        // prettier-ignore
        const months = ["January", "February", "March", "April", "May", "Jun", "July", "August", "September", "October", "November", "December"]

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(
            1,
        )} on ${months[this.date.getMonth()]} ${this.date.getDate()}`;
    }
}

class Running extends Workout {
    type = "running";
    constructor(coords, distance, duration, cadence) {
        super(coords, distance, duration);
        this.cadence = cadence;

        this.calcPace();
        this._getDescription();
    }

    calcPace() {
        this.pace = this.duration / this.distance;
        return this.pace;
    }
}

class Cycling extends Workout {
    type = "cycling";
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration);
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._getDescription();
    }

    calcSpeed() {
        // min/km
        this.speed = this.duration / (this.distance * 60);
        return this.speed;
    }
}

class MaptyApp {
    #map;
    #mapEvent;
    #workouts = [];
    constructor() {
        this._getPosition();
        formEl.addEventListener("submit", this._newWorkout.bind(this));

        workoutContainerEl.addEventListener(
            "click",
            this._moveToPopup.bind(this),
        );
    }
    _getPosition() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                this._loadMap.bind(this),
                function () {
                    alert("Could not get your location!");
                },
            );
        }
    }
    _loadMap(position) {
        const {longitude} = position.coords;
        const {latitude} = position.coords;
        const coords = [latitude, longitude];
        this.#map = L.map("map").setView(coords, 13);

        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);

        // Handling click on map
        this.#map.on("click", this._showForm.bind(this));

        inputTypeEl.addEventListener(
            "change",
            this._toggleElevationField.bind(this),
        );
    }

    _showForm(mapE) {
        this.#mapEvent = mapE;
        formEl.classList.remove("hidden");
        inputDistanceEl.focus();
    }
    _toggleElevationField() {
        inputElevationEl
            .closest(".form__row")
            .classList.toggle("form__row--hidden");
        inputCadenceEl
            .closest(".form__row")
            .classList.toggle("form__row--hidden");
    }

    _hideForm() {
        // Clear input fields
        inputCadenceEl.value =
            inputDistanceEl.value =
            inputDurationEl.value =
            inputElevationEl.value =
                " ";

        formEl.classList.add("hidden");

        formEl.style.display = "none";

        setTimeout(() => (formEl.style.display = "grid"), 1000);
    }

    _newWorkout(e) {
        // Helper functions
        const validInputs = (...inputs) =>
            inputs.every((input) => Number.isFinite(input));

        const allPositive = (...inputs) => inputs.every((input) => input > 0);

        e.preventDefault();

        // Get input data
        const typeOfWorkout = inputTypeEl.value;
        const distance = +inputDistanceEl.value;
        const duration = +inputDurationEl.value;
        const {lat, lng} = this.#mapEvent.latlng;
        let workout;

        // Create workout object
        if (typeOfWorkout === "running") {
            const cadence = +inputCadenceEl.value;

            if (
                !validInputs(distance, duration, cadence) ||
                !allPositive(distance, duration, cadence)
            )
                return alert("Inputs have to be positive numbers!");

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        if (typeOfWorkout === "cycling") {
            const elevation = +inputElevationEl.value;

            if (
                !validInputs(distance, duration, elevation) ||
                !allPositive(distance, duration)
            )
                return alert("Inputs have to be positive numbers!");

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add new object (workout) to #workout array
        this.#workouts.push(workout);

        // To display marker on map
        this._renderWorkoutMarker(workout);

        // Render workout on list
        this._renderWorkout(workout);

        //Hide form + clear input fields
        this._hideForm();
    }

    // Function to display marker on map
    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)
            .addTo(this.#map)
            .bindPopup(
                L.popup({
                    maxWidth: 250,
                    minWidth: 100,
                    autoClose: false,
                    closeOnClick: false,
                    className: `${workout.type}-popup`,
                }),
            )
            .setPopupContent(
                `${workout.type === "running" ? "🏃" : "🚵"} ${
                    workout.description
                }`,
            )
            .openPopup();
    }

    // Function to render workout
    _renderWorkout(workout) {
        let html = `<li class="workouts__itm workouts--${
            workout.type
        }" data-id="${workout.id}">
            <h2 class="workouts__title">${workout.description}</h2>
            <div class="workouts__details">
                <span class="worksouts__icon">${
                    workout.type === "running" ? "🏃" : "🚵"
                }</span>
                <span class="workouts__value">${workout.distance}</span>
                <span class="workouts__unit">km</span>
            </div>
            <div class="workouts__details">
                <span class="worksouts__icon">🕛</span>
                <span class="workouts__value">${workout.duration}</span>
                <span class="workouts__unit">min</span>
            </div>
        `;

        if (workout.type === "running") {
            html += `
            <div class="workouts__details">
                    <span class="worksouts__icon">⚡️</span>
                    <span class="workouts__value">${workout.pace.toFixed(
                        1,
                    )}</span>
                    <span class="workouts__unit">min/km</span>
                </div>
                <div class="workouts__details">
                    <span class="worksouts__icon">🦶🏼</span>
                    <span class="workouts__value">${workout.cadence}</span>
                    <span class="workouts__unit">spm</span>
            </div>
            </li>`;
        }

        if (workout.type === "cycling") {
            html += `
            <div class="workouts__details">
                    <span class="worksouts__icon">⚡️</span>
                    <span class="workouts__value">${workout.speed.toFixed(
                        1,
                    )}</span>
                    <span class="workouts__unit">km/h</span>
                </div>
                <div class="workouts__details">
                    <span class="worksouts__icon">🦶🏼</span>
                    <span class="workouts__value">${workout.elevationGain}</span>
                    <span class="workouts__unit">m</span>
            </div>
            </li>`;
        }

        formEl.insertAdjacentHTML("afterend", html);
    }

    _moveToPopup(e) {
        const workoutEl = e.target.closest(".workouts__itm");
        if (!workoutEl) return;

        const workout = this.#workouts.find(
            (itm) => itm.id === workoutEl.dataset.id,
        );
        console.log(workoutEl);
        console.log(this.#workouts);
        console.log(workout);
        console.log(workoutEl);

        if (!workout) return;
        this.#map.setView(workout.coords, 13, {
            animate: true,
            pan: {
                duration: 1,
            },
        });
    }
}

const maptyWorkout = new MaptyApp();
