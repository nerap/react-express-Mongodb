import API from "../utils/API";


export async function getAllData(url){

    return await API.post(url);
}

export async function getDataCuisine(url, cuisine){

    const data = {
        cuisine,
    };

    return await API.post(url, data);
}