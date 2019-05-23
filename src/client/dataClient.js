
import axios from "axios";


export async function getAllData(url, filter){
    if (!(filter.km)){
        filter.km = 50
    }
    if (!(filter.cuisine)){
        filter.cuisine = ["Chinese"]
    }
    if (!(filter.grade)){
        filter.grade = 30
    }
    const data = {
        filter
    }
    return await axios.post(url, data);
}

export async function getDataCuisine(url, currentCuisine){

    const data = {
        currentCuisine
    }
    return await axios.post(url, data);
}