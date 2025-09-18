// Select DOM elements
const cardsEl = document.querySelector(".cards");

const renderCountry = function (data, className = "") {
    const html = `
    <div class="card ${className}">
    <div class="card__flag-box">
        <img
            src="${data.flags.png}"
            alt="${data.name} flag"
            class="card__flag" />
    </div>
    <div class="card__details">
        <h2 class="header-2">${data.name}</h2>
        <h4 class="header-4">${data.region}</h4>
        <div class="card__txt card__population">
            <span class="">🧑‍🤝‍🧑 </span>
            <span>${(data.population / 1000000).toFixed(1)}m people</span>
        </div>
        <div class="card__txt card__language">
            <span class="">🗣️ </span> <span>${data.languages[0].name}</span>
        </div>
        <div class="card__txt card__currency">
            <span class="">💰 </span><span>${data.currencies[0].name}</span>
        </div>
    </div>
</div>
`;
    cardsEl.insertAdjacentHTML("beforeend", html);
};

// // Fetch JSON helper function
// const getJSON = function (url, errorMsg = "Something went wrong") {
//     return fetch(url).then((response) => {
//         if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
//         return response.json();
//     });
// };

// // Render Error message
const renderError = function (msg) {
    cardsEl.insertAdjacentText("beforeend", msg);
};

//############### // Fetching country data ###########

// const getCountryData = function (country) {
//     getJSON(`https://restcountries.com/v2/name/${country}`, "Country not found")
//         .then((data) => {
//             // Render country
//             renderCountry(data[0]);

//             //   Get neighbour country (2nd request)
//             const neighbour = data[0].borders?.[0];

//             if (!neighbour) throw new Error("No neighbour found!");

//             return getJSON(
//                 `https://restcountries.com/v2/alpha/${neighbour}`,
//                 "Country not found",
//             );
//         })

//         .then((dataNeighbour) => {
//             renderCountry(dataNeighbour, "card--neighbour");
//         })
//         .catch((err) => {
//             renderError(`Something went wrong: ${err.message}. Try again!`);
//         })
//         .finally(() => {
//             cardsEl.style.opacity = 1;
//         });
// };

// getCountryData("nepal");
// // getCountryData("nepal");

const getPosition = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

const whichCountry = async function (country) {
    try {
        const position = await getPosition();
        console.log(position);
        const {latitude: lat, longitude: lng} = position.coords;

        const resGeo = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${lng}&localityLanguage=en`,
        );
        if (!resGeo.ok) throw new Error("Problem getting location data");
        const dataGeo = await resGeo.json();
        console.log(dataGeo);
        // This not working.

        // const res = await fetch(`https://restcountries.com/v2/name/${fataGeo.countryName}`);
        const res = await fetch(`https://restcountries.com/v2/name/${country}`);
        if (!res.ok) throw new Error("Problem getting country");
        const data = await res.json();

        renderCountry(data[0]);
        console.log(data[0]);
    } catch (err) {
        renderError(`Something went wrong! ${err.message}`);
        console.error(err);
    }

    cardsEl.style.opacity = 1;
};

whichCountry("china");
// whichCountry()
// // Section 16: CHALLENGE #1

const whereImIn = async function (lat, lng) {
    const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${lng}&localityLanguage=en`,
    );
    const data = await res.json();
    console.log(data);
};
whereImIn(40.42159, -122.0837);

// const wherImIn = function (lat, lng) {
//     fetch(
//         `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=-${lng}&localityLanguage=en`,
//     )
//         .then((response) => {
//             if (!response.ok)
//                 throw new Error(`Problem with data fetcing ${response.status}`);
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             console.log(`You are in ${data.city}, ${data.countryName}!`);
//         })
//         .catch((err) => console.error(`${err.message} ⛔`));
// };

// Challenge #2
const waitFunc = function (seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve, seconds * 1000;
        });
    });
};

const imgContainerEl = document.querySelector(".imgContainer");
const createImage = async function (imgPath) {
    return new Promise((resolve, reject) => {
        const img = document.createElement("img");
        img.src = imgPath;

        img.addEventListener("load", () => {
            //   imgContainerEl.append(img);
            resolve(img);
        });

        img.addEventListener("error", () => {
            reject(new Error("Image not found"));
        });
    });
};

let currentImg;
createImage("flower9.jpg")
    .then((img) => {
        currentImg = img;
        console.log(img);
        console.log("Image 1 loaded");
        return waitFunc(2);
    })
    .then(() => {
        imgContainerEl.style.display = "none";
        return createImage("flower10.jpg");
    })
    .then((img) => {
        currentImg = img;
        console.log("Image 2 loaded");
        return waitFunc(2);
    })
    .then(() => (imgContainerEl.style.display = "none"))
    .catch((err) => console.error(err));
