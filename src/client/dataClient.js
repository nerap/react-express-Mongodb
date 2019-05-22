import API from "../utils/API";


export async function getAllData(url){

    return await API.post(url);
}

export async function getDataCuisine(url, currentCuisine){

    const data = {
        currentCuisine
    }
    return await API.post(url, data);
}