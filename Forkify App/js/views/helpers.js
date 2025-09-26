import { TIMEOUT_SEC } from "../config.js";

// TIME OUT FUNCTION
const timeOut = function (second) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Request time out! Try again"));
        }, second * 1000);
    });
};

// GET RECIPE DATA
export const getJSON = async function (url) {
    try {
        const res = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);
        const data = await res.json();
        if (!res.ok) throw new Error(`${data.message} (${res.status})`);
        return data;
    } catch (error) {
        throw error;
    }
};
